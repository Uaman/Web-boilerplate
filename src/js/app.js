import { formatUsers } from "./services/formatUsers.js";
import { validateUsers } from "./services/validateUsers.js";
import { sortUsers } from "./services/sortUsers.js";
import { validatePhone } from "./utils/phone.js";
import { capitalize } from "./utils/capitalize.js";
import { filterUsers } from "./services/filterUsers.js";
import { calculateAge } from "./services/formatUsers.js";

import { randomUserMock, additionalUsers } from "./data/FE4U-Lab2-mock.js";


// ГЛОБАЛЬНИЙ СТЕЙТ

// Отримуємо сирі дані, приводимо їх до єдиного формату і одразу валідуюємо
let users = validateUsers(formatUsers(randomUserMock, additionalUsers));

// Читаємо список обраних із localStorage (зберігаємо лише id)
let favorites = new Set(JSON.parse(localStorage.getItem("favorites") || "[]"));

// Пробігаємося по користувачах і позначаємо тих, чиї id є в обраних
users.forEach(u => { if (favorites.has(u.id)) u.favorite = true; });

// Стан фільтрації, де пусті значення означають нічого не фільтрувати
let filters = { country: "", age: "", gender: "", favorite: false, withPhoto: false };

// Пошук одночасно по кількох полях: імʼя, нотатка, вік
let search = { query: "" };

// Налаштування сортування для таблиці статистики (зростання,спадання)
let sort = { field: "", dir: "asc" };

// Параметри пагінації
let pagination = { page: 1, perPage: 10 };


// ХЕЛПЕРИ ДЛЯ DOM

// Скорочений синтаксис для вибору елементів DOM
const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => root.querySelectorAll(sel);

// Зберігає список обраних у локалсторедж
function saveFavorites() {
  localStorage.setItem("favorites", JSON.stringify([...favorites]));
}

// Форматує рядок, капіталізуючи перші літери кожного слова
function capitalizeWords(str) {
  return (str || "")
    .split(" ")
    .map(s => s.charAt(0).toUpperCase() + s.slice(1).toLowerCase())
    .join(" ");
}


// ОБЧИСЛЕННЯ СПИСКУ ДЛЯ ВІДОБРАЖЕННЯ

// Повертає відфільтрований і відсортований список користувачів
function getVisibleUsers() {
  // Використовуємо універсальну функцію фільтрації
  let res = filterUsers(users, filters);

  // Додаткові умови фільтрації
  if (filters.withPhoto) res = res.filter(u => u.picture_thumbnail || u.picture_large); // Якщо вибрано тільки з фото, фільтруємо користувачів, у яких є хоча б одне фото

  if (filters.age) {
    if (filters.age === "lt30") res = res.filter(u => u.age < 30); // менше 30 - залишаємо з віком до 30 років
    if (filters.age === "30-40") res = res.filter(u => u.age >= 30 && u.age <= 40); // Якщо 30–40 -залишаємо з віком від 30 до 40 років включно
    if (filters.age === "gt40") res = res.filter(u => u.age > 40); // Якщо більше 40 - залишаємо з віком понад 40 років
  }

  // Пошук
  if (search.query) {
    const q = search.query.toLowerCase();
    res = res.filter(u =>
      (u.full_name || "").toLowerCase().includes(q) ||
      (u.note || "").toLowerCase().includes(q) ||
      String(u.age || "").includes(q)
    );
  }

  // Сортування
  if (sort.field) res = sortUsers(res, sort.field, sort.dir);

  return res;
}


// РЕНДЕР УСІХ БЛОКІВ

// Викликає рендеринг усіх секцій сторінки
function render() {
  renderFilters();
  renderTeachers();
  renderStatistics();
  renderFavorites();
}


// РЕНДЕР ФІЛЬТРІВ

// Відображає блок фільтрів із випадаючими списками та чекбоксами
function renderFilters() {
  const container = $("#filters");
  if (!container) return;

  const countries = [...new Set(users.map(u => u.country).filter(Boolean))].sort();
  const genders = [...new Set(users.map(u => u.gender).filter(Boolean))].sort();

  container.innerHTML = `
    <div class="filter-item">
      <span>Country</span>
      <select id="filterCountry">
        <option value="" ${filters.country === "" ? "selected" : ""}>All</option>
        ${countries.map(c => `
          <option value="${c}" ${filters.country === c ? "selected" : ""}>${c}</option>
        `).join("")}
      </select>
    </div>
    <div class="filter-item">
      <span>Gender</span>
      <select id="filterGender">
        <option value="" ${filters.gender === "" ? "selected" : ""}>All</option>
        ${genders.map(g => `
          <option value="${g}" ${filters.gender === g ? "selected" : ""}>${g}</option>
        `).join("")}
      </select>
    </div>
    <div class="filter-item">
      <span>Age</span>
      <select id="filterAge">
        <option value="" ${filters.age === "" ? "selected" : ""}>Any</option>
        <option value="lt30" ${filters.age === "lt30" ? "selected" : ""}>Less than 30</option>
        <option value="30-40" ${filters.age === "30-40" ? "selected" : ""}>30–40</option>
        <option value="gt40" ${filters.age === "gt40" ? "selected" : ""}>More than 40</option>
      </select>
    </div>
    <div class="filter-item">
      <label>
        <input id="filterPhoto" type="checkbox" ${filters.withPhoto ? "checked" : ""}>
        Only with photo
      </label>
    </div>
    <div class="filter-item">
      <label>
        <input id="filterFav" type="checkbox" ${filters.favorite ? "checked" : ""}>
        Only favorites
      </label>
    </div>
  `;

  // Обробники подій для оновлення фільтрів і перемальовки сторінки
  $("#filterCountry").onchange = e => { filters.country = e.target.value; render(); };
  $("#filterGender").onchange = e => { filters.gender = e.target.value; render(); };
  $("#filterAge").onchange    = e => { filters.age = e.target.value; render(); };
  $("#filterPhoto").onchange  = e => { filters.withPhoto = e.target.checked; render(); };
  $("#filterFav").onchange    = e => { filters.favorite = e.target.checked; render(); };
}


// РЕНДЕР КАРТОК ВЧИТЕЛІВ

// Відображає список карток вчителів
function renderTeachers() {
  const container = $(".teachers-list");
  if (!container) return;
  container.innerHTML = ""; // чистимо контейнер

  // Беремо вже відсортований масив
  const list = getVisibleUsers();

  // Створюємо картку для кожного користувача
  list.forEach(u => {
    const card = document.createElement("div");
    // Якщо немає фото то додаємо клас circle і малюємо ініціали
    card.className = "teacher" + (!u.picture_thumbnail ? " circle" : "");

    // Розраховуємо ініціали з повного імені (якщо немає фото)
    const initials = (u.full_name || "?")
      .split(" ")
      .map(p => p[0]?.toUpperCase())
      .join("");

    // Розмітка картки: фото/ініціали, імʼя, курс, країна і зірочка (якщо в обраних)
    card.innerHTML = `
    ${u.picture_thumbnail ? `
        <div class="avatar">
        <img src="${u.picture_thumbnail}" alt="${u.full_name}">
        ${u.favorite ? '<span class="star">★</span>' : ""}
        </div>
    ` : `
        <div class="initials" style="background-color:${u.bg_color || "#ccc"}">${initials}</div>
        ${u.favorite ? '<span class="star">★</span>' : ""}
    `}
    <h3>${u.full_name}</h3>
    <p>${u.course || ""}<br>${u.country || ""}</p>
    `;

    // По кліку на картку відкриваємо попап з деталями
    card.addEventListener("click", () => openDetails(u));

    // Додаємо картку в DOM
    container.appendChild(card);
  });
}


// РЕНДЕР ТАБЛИЦІ (СТАТИСТИКА)

// Відображає таблицю статистики з пагінацією
function renderStatistics() {
  const tbody = $(".statistics tbody");
  if (!tbody) return;
  tbody.innerHTML = ""; // скидаємо вміст

  const allUsers = getVisibleUsers();
  const start = (pagination.page - 1) * pagination.perPage;
  const end = start + pagination.perPage;
  const pageUsers = allUsers.slice(start, end);

  // Рендеримо рядки таблиці лише для користувачів поточної сторінки
  pageUsers.forEach(u => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${u.full_name || ""}</td>
      <td>${u.course || ""}</td>
      <td>${u.age || ""}</td>
      <td>${u.gender || ""}</td>
      <td>${u.country || ""}</td>
    `;
    tbody.appendChild(tr);
  });

  // Викликаємо рендеринг пагінації
  renderPagination(allUsers.length);
}


// РЕНДЕР ПАГІНАЦІЇ

// Створює кнопки пагінації для таблиці статистики
function renderPagination(total) {
  const container = $(".pagination");
  if (!container) return;

  const totalPages = Math.ceil(total / pagination.perPage);
  container.innerHTML = "";

  // Генеруємо кнопки для кожної сторінки
  for (let i = 1; i <= totalPages; i++) {
    const btn = document.createElement("button");
    btn.innerText = i;
    btn.className = (i === pagination.page) ? "active" : "";
    btn.addEventListener("click", () => {
      pagination.page = i;
      renderStatistics();
    });
    container.appendChild(btn);
  }
}


// РЕНДЕР БЛОКУ ОБРАНИХ

// Відображає список обраних вчителів
function renderFavorites() {
  const list = $(".favorites-list");
  if (!list) return;
  list.innerHTML = ""; // очищаємо

  // Збираємо лише користувачів, які є в Set favorites
  const favUsers = users.filter(u => favorites.has(u.id));

  // Створюємо маленькі картки (схожі на основні)
  favUsers.forEach(u => {
    const div = document.createElement("div");
    div.className = "teacher" + (!u.picture_thumbnail ? " circle" : "");
    div.innerHTML = `
      ${
        u.picture_thumbnail
          ? `<img src="${u.picture_thumbnail}" alt="${u.full_name}" style="background-color:${u.bg_color || "#ccc"}">`
          : `<div class="initials" style="background-color:${u.bg_color || "#ccc"}">${u.full_name?.[0] || "?"}</div>`
      }
      <h3>${u.full_name}</h3>
      <p>${u.country || ""}</p>
    `;
    // Клік по фаворит-картці теж відкриває попап з деталями
    div.addEventListener("click", () => openDetails(u));
    list.appendChild(div);
  });
}


// ПОПАП ДЕТАЛЕЙ ВЧИТЕЛЯ

// Відкриває модальне вікно з детальною інформацією про вчителя
function openDetails(u) {
  const modal = $("#teacherDetailsModal");
  if (!modal) return;

  // Підставляємо дані в поля попапа
  $("#teacherPhoto").src = u.picture_large || "images/default.png";
  $("#teacherName").innerText = u.full_name;
  $("#teacherSpeciality").innerText = u.course || "Unknown";
  $("#teacherLocation").innerText = `${u.city || ""}, ${u.country || ""}`;
  $("#teacherExtra").innerText = `${u.age || "?"}, ${u.gender || ""}`;
  $("#teacherEmail").innerText = u.email || "";
  $("#teacherEmail").href = "mailto:" + (u.email || "");
  $("#teacherPhone").innerText = u.phone || "";
  $("#teacherNotes").innerText = u.note || "";

  // Зірочка у попапі. Активний клас лише якщо в обраних
  const starEl = $("#teacherStar");
  starEl.style.display = "inline";
  starEl.classList.toggle("active", favorites.has(u.id));

  // Клік по зірці у попапі перемикає статус обраного
  starEl.onclick = () => {
    toggleFavorite(u);
    // Одразу оновлюємо вигляд зірочки після зміни
    starEl.classList.toggle("active", favorites.has(u.id));
  };

  modal.style.display = "flex";
}


// ІНІТ ПОПАПІВ (відкрити/закрити) 

// Налаштовує поведінку модальних вікон
function setupModals() {
  const addTeacherModal = $("#addTeacherModal");
  const openBtns = $$(".btn-outline.big"); // кнопки Add teacher (хедер і футер)
  const addTeacherClose = addTeacherModal?.querySelector(".close");

  // Відкриття попапу додавання вчителя
  openBtns.forEach(btn =>
    btn.addEventListener("click", () => {
      addTeacherModal.style.display = "flex";
    })
  );

  // Закрити попап додавання коли натискаєш хрестик
  addTeacherClose?.addEventListener("click", () => {
    addTeacherModal.style.display = "none";
  });

  // Закриття попапів кліком за попапом типу по фону
  window.addEventListener("click", e => {
    if (e.target === addTeacherModal) addTeacherModal.style.display = "none";
    if (e.target === $("#teacherDetailsModal")) $("#teacherDetailsModal").style.display = "none";
  });

  // Закрити попап деталей хрестиком
  $("#teacherDetailsModal .close")?.addEventListener("click", () => {
    $("#teacherDetailsModal").style.display = "none";
  });
}


// ДОДАТИ/ПРИБРАТИ З ОБРАНИХ

// Перемикає статус обраного для вчителя
function toggleFavorite(u) {
  // Якщо вже в обраних знімаємо, і навпаки
  if (favorites.has(u.id)) {
    favorites.delete(u.id);
    u.favorite = false;
  } else {
    favorites.add(u.id);
    u.favorite = true;
  }
  // Зберігаємо і перемальовуємо все (картки, олюблені, таблицю)
  saveFavorites();
  render();
}


// ФОРМА ДОДАВАННЯ ВЧИТЕЛЯ 

// Налаштовує форму для додавання нового вчителя
function setupAddForm() {
  const form = $("#teach_add_popup");
  if (!form) return;

  form.addEventListener("submit", e => {
    e.preventDefault(); // не перезавантажуємо сторінку

    // Забираємо дані форми
    const fd = new FormData(form);

    // Валідація телефону залежно від країни
    const country = capitalize(fd.get("country"));
    const phoneCheck = validatePhone(fd.get("phone"), country);
    if (!phoneCheck.valid) {
      alert("Invalid phone: " + phoneCheck.error);
      return;
    }

    // Рахуємо вік із дати народження (якщо вказана)
    const bDay = fd.get("b_day") ? new Date(fd.get("b_day")) : null;
    const age = bDay ? calculateAge(bDay.toISOString()) : null;

    // Стать (Male/Female або порожньо)
    const gender = fd.get("gender") || "";

    // Формуємо новий обʼєкт користувача
    const u = {
      id: crypto.randomUUID(), // унікальний id
      full_name: capitalizeWords(fd.get("full_name")),
      gender: capitalize(gender),
      b_date: bDay ? bDay.toISOString() : null, // зберігаємо ISO-дату
      age,
      country,
      city: capitalizeWords(fd.get("city")),
      email: fd.get("email"),
      phone: phoneCheck.normalized, // нормалізований телефон
      course: fd.get("course"),
      note: fd.get("note"),
      favorite: false, // новий але не у олюблених
      bg_color: fd.get("bg_color") || "#ccc",
      picture_thumbnail: null, // якщо без фото то будуть ініціали
      picture_large: null,
    };

    // Перевіряємо через validateUsers
    const [validated] = validateUsers([u]);
    if (!validated.isValid) {
      alert("Validation failed:\n" + validated.errors.join("\n"));
      return;
    }

    // Додаємо на початок списку, скидаємо форму, перемальовуємо і ховаємо попап
    users.unshift(validated);
    form.reset();
    render();
    $("#addTeacherModal").style.display = "none";
  });
}


// Пошук у хедері 

// Налаштовує пошук за ім'ям, нотаткою або віком
function setupSearch() {
  // При кожному вводі символу оновлюємо результат
  $("#searchName")?.addEventListener("input", e => {
    search.query = e.target.value.trim();
    render();
  });
}

// Сортування у таблиці 

// Налаштовує сортування при кліку на заголовки таблиці
function setupSort() {
  // Беремо всі th у таблиці статистики
  $$(".statistics th").forEach(th => {
    // Для кожного заголовка вішаємо подію кліку
    th.addEventListener("click", () => {

      // Дізнаємось назву поля за текстом заголовка
      const field = th.innerText.toLowerCase();
      const map = {
        name: "full_name",
        speciality: "course",
        age: "age",
        gender: "gender",
        nationality: "country",
      };
      const selectedField = map[field]; // яке поле сортуємо зараз

      // перемикання напрямку сортування
      if (sort.field === selectedField) {
        // якщо вже сортуємо по цьому полі
        if (sort.dir === "asc") {
          sort.dir = "desc";   // другий клік - спадання
        } else if (sort.dir === "desc") {
          sort.field = "";     // третій клік - скидаємо сортування й повертаємо таблицю у початковий стан
          sort.dir = "asc";    // напрямок повертаємо в дефолт
        }
      } else {
        // якщо це новий стовпець - ставимо за зростанням
        sort.field = selectedField;
        sort.dir = "asc";
      }

      // оновлюємо стилі таблиці
      // Прибираємо виділення у всіх th
      $$(".statistics th").forEach(el => el.classList.remove("sorted", "asc", "desc"));

      // Якщо є активне поле сортування - додаємо класи
      if (sort.field) {
        th.classList.add("sorted", sort.dir);
      }

      render();
    });
  });
}


// ІНІЦІАЛІЗАЦІЯ ПРОГРАМИ 

// Виконується після завантаження сторінки
document.addEventListener("DOMContentLoaded", () => {
  // Налаштовуємо попапи форму пошук сортування
  setupModals();
  setupAddForm();
  setupSearch();
  setupSort();

  // Початковий рендер сторінки
  render();

  // Кнопки скролу для блоку обраних вліво або вправо 
  $(".scroll-btn.left")?.addEventListener("click", () => {
    $(".favorites-list").scrollBy({ left: -200, behavior: "smooth" });
  });
  $(".scroll-btn.right")?.addEventListener("click", () => {
    $(".favorites-list").scrollBy({ left: 200, behavior: "smooth" });
  });
});