import { formatUsers, calculateAge } from "./services/formatUsers.js";
import { validateUsers } from "./services/validateUsers.js";
import { sortUsers } from "./services/sortUsers.js";
import { validatePhone } from "./utils/phone.js";
import { capitalize } from "./utils/capitalize.js";
import { filterUsers } from "./services/filterUsers.js";
import { fetchRandomUsers } from "./services/api.js";

let users = []; // стартуємо з порожнього масиву
let favorites = new Set(JSON.parse(localStorage.getItem("favorites") || "[]"));
let filters = { country: "", age: "", gender: "", favorite: false, withPhoto: false };
let search  = { query: "" };
let sort    = { field: "", dir: "asc" };
let pagination = { page: 1, perPage: 10 };
let leafletMap = null;

let statsChart = null;

// Стан API-підвантаження
const api = {
  seed: "teachinder",
  page: 1, // яку сторінку вже завантажили (почнемо з 1)
  isLoading: false,
};

// ХЕЛПЕРИ ДЛЯ DOM

// Скорочений синтаксис для вибору елементів DOM
const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => root.querySelectorAll(sel);

function setApiStatus(text = "") {
  let holder = $("#apiStatus");
  if (!holder) {
    // створимо контейнер під списком викладачів
    const sec = $("#teachers .top-teachers") || $("#teachers"); // підстрахуємось
    holder = document.createElement("div");
    holder.id = "apiStatus";
    holder.style.margin = "16px 0";
    const teachersSection = $("#teachers"); // секція
    teachersSection?.appendChild(holder);
  }
  holder.textContent = text;
}

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

// фільтрація  сортування  пошук  валідація

// ОБЧИСЛЕННЯ СПИСКУ ДЛЯ ВІДОБРАЖЕННЯ
//----- Завдання 3.  Підключити до сторінки бібліотеку lodash. Використовуючи її  відрефакторити функції (мапинг, валідація, сортинг, фільтерінг та пошук).   
function getVisibleUsers() {
  // Фільтрація
  let res = filterUsers(users, filters);

  // тільки з фото
  if (filters.withPhoto)
    res = _.filter(res, u => u.picture_thumbnail || u.picture_large);

  // фільтр за віком
  if (filters.age === "lt30") res = _.filter(res, u => u.age < 30);
  if (filters.age === "30-40") res = _.filter(res, u => u.age >= 30 && u.age <= 40);
  if (filters.age === "gt40") res = _.filter(res, u => u.age > 40);

  // пошук
  if (search.query) {
    const q = _.toLower(search.query);
    res = _.filter(res, u =>
      _.includes(_.toLower(u.full_name || ""), q) ||
      _.includes(_.toLower(u.note || ""), q) ||
      _.includes(String(u.age || ""), q)
    );
  }

  // сортування
  if (sort.field)
    res = _.orderBy(res, [sort.field], [sort.dir]);

  return res;
}
/*
  // Старий варіант 
  function getVisibleUsers() {
    let res = filterUsers(users, filters);

    if (filters.withPhoto) res = res.filter(u => u.picture_thumbnail || u.picture_large);
    if (filters.age) {
      if (filters.age === "lt30") res = res.filter(u => u.age < 30);
      if (filters.age === "30-40") res = res.filter(u => u.age >= 30 && u.age <= 40);
      if (filters.age === "gt40") res = res.filter(u => u.age > 40);
    }

    if (search.query) {
      const q = search.query.toLowerCase();
      res = res.filter(u =>
        (u.full_name || "").toLowerCase().includes(q) ||
        (u.note || "").toLowerCase().includes(q) ||
        String(u.age || "").includes(q)
      );
    }

    if (sort.field) res = sortUsers(res, sort.field, sort.dir);
    return res;
  }
*/

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

  // Перевіряємо, чи є користувачі для відображення
  if (list.length === 0) {
    container.innerHTML = `<p class="empty-msg">No users found</p>`;
    return;
  }

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

  // КНОПКА LOAD MORE
  if (users.length > 0) {
    let controls = $("#apiControls");
    if (!controls) {
      controls = document.createElement("div");
      controls.id = "apiControls";
      controls.style.display = "flex";
      controls.style.justifyContent = "center";
      controls.style.margin = "16px 0";
      container.parentElement.appendChild(controls);
    }
    controls.innerHTML = `
      <button id="loadMoreBtn" class="btn-outline">Load more (10)</button>
    `;
    $("#loadMoreBtn").onclick = () => loadMoreFromApi();
  }
}

// оновлення статистики, empty state)

// ТАБЛИЦЯ СТАТИСТИКА
// Відображає таблицю статистики з пагінацією
function renderStatistics() {
  const tbody = $(".statistics tbody");
  if (!tbody) return;
  tbody.innerHTML = ""; // скидаємо вміст

  const allUsers = getVisibleUsers();

  // Перевіряємо, чи є дані для відображення
  if (allUsers.length === 0) {
    tbody.innerHTML = `<tr><td colspan="5" class="empty-msg">There is no data to display</td></tr>`;
    return;
  }

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

  renderPagination(allUsers.length);
}

// --------- Завдання 2. Підключити до сторінки бібліотеку chart.js. Замінити таблиці зі  статистикою на piechart.   
function renderChart() {
  const canvas = document.getElementById("statsChart");
  if (!canvas) return;

  // Безпечне очищення попереднього графіка
  const existing = Chart.getChart(canvas);
  if (existing) {
    existing.destroy();
  }

  const ctx = canvas.getContext("2d");

  // Групуємо користувачів за статтю
  const genderCounts = { Male: 0, Female: 0, Unknown: 0 };
  users.forEach(u => {
    if (u.gender === "Male") genderCounts.Male++;
    else if (u.gender === "Female") genderCounts.Female++;
    else genderCounts.Unknown++;
  });

  // Створюємо нову діаграму
  statsChart = new Chart(ctx, {
    type: "pie",
    data: {
      labels: ["Male", "Female", "Unknown"],
      datasets: [{
        data: Object.values(genderCounts),
        backgroundColor: ["#36A2EB", "#FF6384", "#CCCCCC"],
        borderColor: "#fff",
        borderWidth: 2,
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: "bottom",
          labels: {
            font: { size: 14 },
          },
        },
        title: {
          display: true,
          text: "Distribution of teachers by gender",
          font: { size: 16, weight: "bold" },
        },
      },
      layout: {
        padding: 10,
      },
    },
  });
}

// Кнопки для перемикання Таблиця / Діаграма / flat таблиця
function setupChartToggle() {
  const btnTable = document.getElementById("showTableBtn");
  const btnChart = document.getElementById("showChartBtn");
  const btnPivot = document.getElementById("showPivotBtn");
  const tableContainer = document.getElementById("tableContainer");
  const chartContainer = document.getElementById("chartContainer");
  const pivotContainer = document.getElementById("pivotContainer");

  if (!btnTable || !btnChart || !btnPivot) return;

  const hideAll = () => {
    [tableContainer, chartContainer, pivotContainer].forEach(c => (c.style.display = "none"));
    [btnTable, btnChart, btnPivot].forEach(b => b.classList.remove("active"));
  };

  btnTable.addEventListener("click", () => {
    hideAll();
    btnTable.classList.add("active");
    tableContainer.style.display = "block";
  });

  btnChart.addEventListener("click", () => {
    hideAll();
    btnChart.classList.add("active");
    chartContainer.style.display = "block";
    setTimeout(() => renderChart(), 50);
  });

  btnPivot.addEventListener("click", () => {
    hideAll();
    btnPivot.classList.add("active");
    pivotContainer.style.display = "block";
    setTimeout(() => renderPivot(), 50);
  });
}

// --------- Завдання 5. Підключити до сторінки бібліотеку WebDataRocks....
let pivot = null;

function renderPivot() {
  const container = document.getElementById("pivotContainer");
  if (!container) return;

  // Очистити контейнер перед створенням нового
  container.innerHTML = "";

  // Безпечне знищення попереднього екземпляра
  if (pivot && typeof pivot.dispose === "function") {
    try {
      // У деяких версіях WebDataRocks dispose викликає внутрішній null error —
      // тому обгортаємо у безшумний блок
      pivot.dispose();
    } catch (_) {
      // нічого не робимо, щоб не засмічувати консоль
    }
    pivot = null;
  }

  // Підготовка даних
  const flatData = users.map(u => ({
    "Name": u.full_name || "",
    "Course": u.course || "",
    "Age": u.age || "",
    "Gender": u.gender || "",
    "Country": u.country || "",
    "City": u.city || "",
    "Email": u.email || "",
  }));

  // Ініціалізація нового звіту
  pivot = new WebDataRocks({
    container: "#pivotContainer",
    toolbar: true,
    report: {
      dataSource: { data: flatData },
      slice: {
        rows: [{ uniqueName: "Country" }],
        columns: [{ uniqueName: "Gender" }],
        measures: [{ uniqueName: "Name", aggregation: "count" }],
      },
      options: {
        grid: {
          type: "flat",
          title: "All Teachers (Flat view)",
        },
      },
      localization: "https://cdn.webdatarocks.com/loc/en.json",
    },
  });
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

  // Перевіряємо, чи є обрані користувачі
  if (favUsers.length === 0) {
    list.innerHTML = `<p class="empty-msg">There are no selected users</p>`;
    return;
  }

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
    // Клік по фейворит-картці теж відкриває попап з деталями
    div.addEventListener("click", () => openDetails(u));
    list.appendChild(div);
  });
}

// ПОПАП ДЕТАЛІ ВЧИТЕЛЯ

// Відкриває попап з детальною інформацією про вчителя
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

  //------ Завдання 4. Підключити до сторінки бібліотеку day.js. Додати до сторінки  користувача, поле, яке буде показувати, скільки днів залишилось до наступного  дня народження. 
  if (u.b_date) {
    const bday = dayjs(u.b_date); // день народження
    const today = dayjs(); // сьогоднішня дата

    // Наступний день народження у поточному або наступному році
    let nextBday = bday.year(today.year());
    if (nextBday.isBefore(today, "day")) {
      nextBday = nextBday.add(1, "year");
    }

    const daysLeft = nextBday.diff(today, "day");

    // Створюємо або оновлюємо елемент із цією інформацією
    let birthdayInfo = document.getElementById("birthdayInfo");
    if (!birthdayInfo) {
      birthdayInfo = document.createElement("p");
      birthdayInfo.id = "birthdayInfo";
      $("#teacherExtra").insertAdjacentElement("afterend", birthdayInfo);
    }

    birthdayInfo.innerHTML = `<strong>${daysLeft}</strong> days left until the next birthday.`;
  }

  // ------------- Завдання 1. Підключити до сторінки бібліотеку leaflet. Додати до картки  викладача розташування, використовуючи координати надані в данних.
  // Карта Leaflet
  const mapContainer = document.getElementById("mapContainer");
  const mapLink = document.querySelector(".map-link");

  // очищаємо перед показом
  mapContainer.style.display = "none";
  mapContainer.innerHTML = "";
  mapLink.style.display = "inline";

  if (
    u.coordinates &&
    typeof u.coordinates.latitude === "number" &&
    typeof u.coordinates.longitude === "number" &&
    Math.abs(u.coordinates.latitude) <= 90 &&
    Math.abs(u.coordinates.longitude) <= 180
  ) {
    const lat = parseFloat(u.coordinates.latitude);
    const lon = parseFloat(u.coordinates.longitude);

    mapLink.onclick = (e) => {
      e.preventDefault();

      if (mapContainer.style.display === "none") {
        mapContainer.style.display = "block";

        // якщо карта вже існує — повністю закриваємо стару
        if (leafletMap) {
          leafletMap.remove();
          leafletMap = null;
        }

        // створюємо нову карту і зберігаємо глобально
        leafletMap = L.map(mapContainer).setView([lat, lon], 6);

        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
          attribution: "&copy; OpenStreetMap contributors",
        }).addTo(leafletMap);

        L.marker([lat, lon])
          .addTo(leafletMap)
          .bindPopup(`${u.full_name}<br>${u.city}, ${u.country}`)
          .openPopup();

        setTimeout(() => leafletMap.invalidateSize(), 250);
      } else {
        mapContainer.style.display = "none";
      }
    };
  } else {
    mapLink.style.display = "none";
  }

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

// Налаштовує поведінку попапів
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

// json-server + POST при сабміті форми

// ФОРМА ДОДАВАННЯ ВЧИТЕЛЯ 
// Налаштовує форму для додавання нового вчителя
// ФОРМА ДОДАВАННЯ ВЧИТЕЛЯ
function setupAddForm() {
  const form = $("#teach_add_popup");
  if (!form) return;

  // Прибираємо попередній слухач (щоб не дублювався при повторному відкритті)
  form.replaceWith(form.cloneNode(true));
  const newForm = $("#teach_add_popup");

  newForm.addEventListener("submit", async e => {
    e.preventDefault();

    const fd = new FormData(newForm);
    const country = capitalize(fd.get("country") || "");
    const rawPhone = fd.get("phone")?.trim() || "";

    if (!rawPhone) {
      alert("Please enter a phone number before submitting.");
      return;
    }

    const phoneCheck = validatePhone(rawPhone, country);
    if (!phoneCheck.valid) {
      alert("Invalid phone: " + phoneCheck.error);
      return;
    }

    const bDay = fd.get("b_day") ? new Date(fd.get("b_day")) : null;
    const age = bDay ? calculateAge(bDay.toISOString()) : null;
    const gender = fd.get("gender") || "";

    const u = {
      id: crypto.randomUUID(),
      full_name: capitalizeWords(fd.get("full_name")),
      gender: capitalize(gender),
      b_date: bDay ? bDay.toISOString() : null,
      age,
      country,
      city: capitalizeWords(fd.get("city")),
      email: fd.get("email"),
      phone: phoneCheck.normalized,
      course: fd.get("course"),
      note: fd.get("note"),
      favorite: false,
      bg_color: fd.get("bg_color") || "#ccc",
      picture_thumbnail: null,
      picture_large: null,
    };

    const [validated] = validateUsers([u]);
    if (!validated.isValid) {
      alert("Validation failed:\n" + validated.errors.join("\n"));
      return;
    }

    users.unshift(validated);
    render();

    try {
      const res = await fetch("http://localhost:3000/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(validated),
      });
      if (!res.ok) throw new Error("Failed to save on server");
      console.log("User saved on fake API:", await res.json());
    } catch (err) {
      console.error("json-server error:", err);
    }

    newForm.reset();
    $("#addTeacherModal").style.display = "none";
  });
}

// Пошук у хедері 
//----- Завдання 3.  Підключити до сторінки бібліотеку lodash. Використовуючи її  відрефакторити функції (мапинг, валідація, сортинг, фільтерінг та пошук).   
function setupSearch() {
  const onSearch = _.debounce(e => {
    search.query = e.target.value.trim();
    render();
  }, 300); // затримка 0.3 сек для зменшення кількості ререндерів

  $("#searchName")?.addEventListener("input", onSearch);
}
/*
  //Старий варіант
  function setupSearch() {
    $("#searchName")?.addEventListener("input", e => {
      search.query = e.target.value.trim();
      render();
    });
  }
*/

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
          sort.dir = "desc"; // другий клік - спадання
        } else if (sort.dir === "desc") {
          sort.field = ""; // третій клік - скидаємо сортування й повертаємо таблицю у початковий стан
          sort.dir = "asc"; // напрямок повертаємо в дефолт
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

// отримання 50 користувачів із API
async function loadInitialData() {
  try {
    api.isLoading = true;
    setApiStatus("Loading users…");

    // 1) Підвантажуємо сирих користувачів з RandomUser
    const raw = await fetchRandomUsers({ results: 50, page: api.page, seed: api.seed });
    const formattedRemote = await formatUsers(raw, []);

    // 2) Підвантажуємо локальних користувачів з json-server
    let localUsers = [];
    try {
      const res = await fetch("http://localhost:3000/users");
      if (res.ok) localUsers = await res.json();
    } catch (e) {
      console.warn("json-server not available");
    }

    // 3) Об’єднуємо відформатованих remote + готових local
    const merged = [...formattedRemote, ...localUsers];

    // 4) Валідовуємо
    const validated = validateUsers(merged);
    users = validated.filter(u => u.isValid);

    // 5) Відновлюємо фаворити
    users.forEach(u => { if (favorites.has(u.id)) u.favorite = true; });

    setApiStatus("");
    render();
  } catch (err) {
    console.error(err);
    setApiStatus("Failed to load from API. Check internet or try again.");
  } finally {
    api.isLoading = false;
  }
}

// кнопка  +10 користувачів
async function loadMoreFromApi() {
  if (api.isLoading) return;
  api.isLoading = true;
  try {
    setApiStatus("Loading more…");
    api.page += 1;

    const raw = await fetchRandomUsers({ results: 10, page: api.page, seed: api.seed });
    const formatted = await formatUsers(raw, []);
    const validated = validateUsers(formatted).filter(u => u.isValid);

    const have = new Set(users.map(u => u.id));
    const unique = validated.filter(u => !have.has(u.id));

    users.push(...unique);
    users.forEach(u => { if (favorites.has(u.id)) u.favorite = true; });

    setApiStatus("");
    render();
  } catch (e) {
    console.error(e);
    setApiStatus("Failed to load more.");
    api.page -= 1;
  } finally {
    api.isLoading = false;
  }
}

// ІНІЦІАЛІЗАЦІЯ ПРОГРАМИ 

// Виконується після завантаження сторінки
document.addEventListener("DOMContentLoaded", () => {
  // Налаштовуємо попапи форму пошук сортування
  setupModals();
  setupAddForm();
  setupSearch();
  setupSort();
  setupChartToggle(); // Added as requested

  loadInitialData();

  // Кнопки скролу для блоку обраних вліво або вправо 
  $(".scroll-btn.left")?.addEventListener("click", () => {
    $(".favorites-list").scrollBy({ left: -200, behavior: "smooth" });
  });
  $(".scroll-btn.right")?.addEventListener("click", () => {
    $(".favorites-list").scrollBy({ left: 200, behavior: "smooth" });
  });
});