//lab4
import { validateUser, sortUsers, COURSES } from "./lab2.js";

const $  = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));
const genId = () => crypto.randomUUID();

function ageFromDate(iso) {
    if (!iso) return undefined;
    const d = new Date(iso);
    if (Number.isNaN(+d)) return undefined;
    const now = new Date();
    let age = now.getFullYear() - d.getFullYear();
    const md = new Date(now.getFullYear(), d.getMonth(), d.getDate());
    if (md > now) age -= 1;
    return age;
}
function initialsOf(fullName = "") {
    const parts = fullName.trim().split(/\s+/).slice(0, 2);
    return parts.map(s => s[0]?.toUpperCase() || "").join(".") || "NA";
}
const randomCourse = (arr) => arr[Math.floor(Math.random() * arr.length)];
const randomHexColor = () =>
    "#"+[0,0,0].map(()=>Math.floor(Math.random()*256).toString(16).padStart(2,"0")).join("");
const makeFirstLetterCapital = (s) =>
    typeof s === "string" ? s.slice(0,1).toUpperCase()+s.slice(1) : s;

function mapRandomUser(u) {
    const full_name = [u?.name?.first, u?.name?.last].filter(Boolean).join(" ");
    const b_date = u?.dob?.date;
    return {
        id: u?.login?.uuid || genId(),
        favorite: false,
        course: randomCourse(COURSES),
        bg_color: randomHexColor(),
        note: "Empty note.",
        gender: makeFirstLetterCapital(u.gender),
        title: u?.name?.title,
        full_name,
        city: u?.location?.city,
        state: u?.location?.state,
        country: u?.location?.country,
        postcode: u?.location?.postcode,
        coordinates: u?.location?.coordinates
            ? { latitude: String(u.location.coordinates.latitude), longitude: String(u.location.coordinates.longitude) }
            : undefined,
        timezone: u?.location?.timezone
            ? { offset: u.location.timezone.offset, description: u.location.timezone.description }
            : undefined,
        email: u?.email,
        b_date,
        age: typeof u?.dob?.age === "number" ? u.dob.age : ageFromDate(b_date),
        phone: u?.phone,
        picture_large: u?.picture?.large || "",
        picture_thumbnail: u?.picture?.thumbnail || "",
    };
}

const state = {
    users: [],
    filtered: [],
    sort: { key: "full_name", order: "asc" },
    search: "",
    filters: { country: "", age: "", gender: "", favorite: false, withPhoto: false },
    api: { seed: "123", page: 1, perPage: 10, loading: false },
};

async function fetchUsersPage(page, perPage = 10, seed = "123") {
    const url = `https://randomuser.me/api/?seed=${(seed)}&page=${page}&results=${perPage}&inc=gender,name,location,email,dob,phone,picture,login&noinfo`;
    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const { results } = await res.json();
    return results.map(mapRandomUser);
}

const grid = $(".teachers-grid");
const favList = $(".fav-list");
const searchInput = $('.search input[type="search"]');
const searchBtn = $('.search .btn');
const statsTable = $(".stats table");
const statsHead = $("thead", statsTable);
const statsBody = $("tbody", statsTable);
const filtersBox = $(".filters");
const ageSel = $('select[name="age"]', filtersBox);
const regionSel = $('select[name="region"]', filtersBox);
const sexSel = $('select[name="sex"]', filtersBox);
const onlyPhotoCb = $$('.checkbox input', filtersBox)[0];
const onlyFavCb = $$('.checkbox input', filtersBox)[1];
const addOpenTop = $("#add-teacher-btn");
const addOpenBottom = $("#add-teacher-btn-bottom");
const addForm = $("#add-teacher form");
const nextBtn = $("#btn-next"); 

function injectCountrySelectFromUsers(users) {
    const label = document.createElement("label");
    label.innerHTML = 'Country <select name="country"></select>';
    label.style.marginLeft = "6px";
    label.style.background = "white";
    regionSel.closest("label").replaceWith(label);
    const countrySel = $('select[name="country"]', label);
    const countries = Array.from(new Set(users.map(u => u.country).filter(Boolean))).sort();
    countrySel.innerHTML = `<option value="">All</option>` + countries.map(c => `<option>${c}</option>`).join("");
}

function renderGrid(list) {
    grid.innerHTML = "";
    list.forEach(u => {
        const a = document.createElement("a");
        a.href = "#ti-modal";
        const card = document.createElement("div");
        card.className = "teacher";
        card.tabIndex = 0;
        card.dataset.id = u.id;

        let avatarHTML;
        if (u.picture_large) {
            avatarHTML = `
        <div class="avatar-wrap">
          <div class="avatar-inset">
            <img class="avatar" src="${u.picture_large}" alt="${u.full_name}">
          </div>
        </div>`;
        } else {
            const bg = u.bg_color || "#ef7f74";
            avatarHTML = `
        <div class="initials" style="background:${bg}22;border-color:${bg};color:${bg}">
          ${initialsOf(u.full_name)}
        </div>`;
        }

        const starHTML = u.favorite
            ? `<div class="star" title="Favorite"><img class="star-image" src="star.png" alt="favorite"></div>`
            : "";

        card.innerHTML = `
      <div class="avatar-box">
        ${avatarHTML}
        ${starHTML}
      </div>
      <h3>${(u.full_name || "Unknown").split(" ")[0] || ""}<br>
          <strong>${(u.full_name || "").split(" ").slice(1).join(" ")}</strong>
      </h3>
      <div class="subtitle">${u.course || "—"}<br><small>${u.country || ""}</small></div>
    `;
        a.appendChild(card);
        grid.appendChild(a);
        a.addEventListener("click", () => openTeacherModal(u));
    });
}
function renderFavorites(list) {
    favList.innerHTML = "";
    list.filter(u => u.favorite).forEach(u => {
        const a = document.createElement("a");
        a.href = "#ti-modal";
        a.innerHTML = `
      <div class="fav-item" role="listitem">
        ${u.picture_large
            ? `<div class="avatar-wrap"><div class="avatar-inset"><img class="avatar" src="${u.picture_large}" alt=""></div></div>`
            : `<div class="initials" style="width:110px;height:110px;border-width:3px">${initialsOf(u.full_name)}</div>`}
        <h4>${(u.full_name||"").replace(" ", "<br>")}</h4>
        <div class="subtitle">${u.country || ""}</div>
      </div>`;
        a.addEventListener("click", () => openTeacherModal(u));
        favList.appendChild(a);
    });
}
function renderStats(list) {
    const columns = [
        { key: "full_name", label: "Name" },
        { key: "course", label: "Speciality" },
        { key: "age", label: "Age" },
        { key: "gender", label: "Gender" },
        { key: "country", label: "Nationality" },
    ];
    statsHead.innerHTML = `<tr>${columns.map(c => `<th data-key="${c.key}" tabindex="0">${c.label}</th>`).join("")}</tr>`;
    statsBody.innerHTML = list.map(u => `
    <tr>
      <td>${u.full_name || ""}</td>
      <td>${u.course || ""}</td>
      <td>${Number.isFinite(u.age) ? u.age : ""}</td>
      <td>${u.gender || ""}</td>
      <td>${u.country || ""}</td>
    </tr>
  `).join("");
    $$("th", statsHead).forEach(th => {
        th.addEventListener("click", () => toggleSort(th.dataset.key));
        th.addEventListener("keydown", (e) => { if (e.key === "Enter" || e.key === " ") toggleSort(th.dataset.key); });
    });
}

function openTeacherModal(u) {
    $(".ti-photo").src = u.picture_large || u.picture_thumbnail || "https://i.pravatar.cc/300?img=10";
    $(".ti-name").textContent = u.full_name || "Unknown";
    $(".ti-subject").innerHTML = `<strong>${u.course || "—"}</strong>`;
    const age = Number.isFinite(u.age) ? `${u.age}` : "—";
    const gender = u.gender || "—";
    const cityCountry = [u.city, u.country].filter(Boolean).join(", ");
    $(".ti-meta").textContent = `${cityCountry}\n${age}, ${gender}`;
    $(".ti-contact").innerHTML = `
    ${u.email ? `<a href="mailto:${u.email}">${u.email}</a><br>` : ""}
    ${u.phone ? `<a href="tel:${u.phone}">${u.phone}</a>` : ""}
  `;
    $(".ti-desc").textContent = u.note || "Empty note.";

    const btn = $(".ti-fav-btn");
    const setBtnState = (user) => {
        btn.textContent = user.favorite ? "В улюблених — прибрати" : "Додати до улюблених";
        btn.setAttribute("aria-pressed", user.favorite ? "true" : "false");
        btn.classList.toggle("is-active", !!user.favorite);
    };
    setBtnState(u);
    btn.onclick = (e) => {
        e.preventDefault();
        const idx = state.users.findIndex(x => x.id === u.id);
        if (idx === -1) return;
        state.users[idx].favorite = !state.users[idx].favorite;
        applyAll();
        const updated = state.users.find(x => x.id === u.id) || u;
        setBtnState(updated);
    };
}

function applyAll() {
    let list = [...state.users];

    const q = state.search.trim().toLowerCase();
    if (q) {
        list = list.filter(u => {
            const byName = (u.full_name || "").toLowerCase().includes(q);
            const byNote = (u.note || "").toLowerCase().includes(q);
            const byAge  = String(u.age ?? "").includes(q);
            const byCountry = (u.country || "").toLowerCase().includes(q);
            return byName || byNote || byAge || byCountry;
        });
    }

    const { country, age, gender, favorite, withPhoto } = state.filters;
    if (country)  list = list.filter(u => (u.country || "").toLowerCase() === country.toLowerCase());
    if (gender)   list = list.filter(u => (u.gender || "").toLowerCase() === gender.toLowerCase());
    if (favorite) list = list.filter(u => !!u.favorite);
    if (withPhoto) list = list.filter(u => !!u.picture_large);

    if (age) {
        const m = String(age).match(/^(\d+)\s*-\s*(\d+)$/);
        if (m) {
            const [_, a, b] = m;
            const lo = +a, hi = +b;
            list = list.filter(u => Number.isFinite(+u.age) && +u.age >= lo && +u.age <= hi);
        } else if (!Number.isNaN(+age)) {
            list = list.filter(u => Number(u.age) === Number(age));
        }
    }

    list = sortUsers(list, state.sort.key, state.sort.order);

    state.filtered = list;
    renderGrid(list);
    renderFavorites(state.users);
    renderStats(list);
}
function toggleSort(key) {
    if (state.sort.key === key) {
        state.sort.order = state.sort.order === "asc" ? "desc" : "asc";
    } else {
        state.sort.key = key;
        state.sort.order = "asc";
    }
    applyAll();
}

searchBtn.addEventListener("click", () => { state.search = searchInput.value || ""; applyAll(); });
searchInput.addEventListener("keydown", (e) => { if (e.key === "Enter") { state.search = searchInput.value || ""; applyAll(); } });
function debounce(fn, delay = 300) {
    let timer;
    return function (...args) {
        clearTimeout(timer);
        timer = setTimeout(() => fn.apply(this, args), delay);
    };
}
const debouncedSearch = debounce(() => {
    state.search = searchInput.value || "";
    applyAll();
}, 300);
searchInput.addEventListener("input", debouncedSearch);
filtersBox.addEventListener("change", (e) => {
    const t = e.target;
    if (t.name === "country") state.filters.country = t.value || "";
    if (t.name === "age") state.filters.age = t.value || "";
    if (t.name === "sex") state.filters.gender = t.value || "";
    state.filters.withPhoto = onlyPhotoCb.checked;
    state.filters.favorite = onlyFavCb.checked;
    applyAll();
});

addOpenTop?.addEventListener("click", () => location.hash = "#add-teacher");
addOpenBottom?.addEventListener("click", () => location.hash = "#add-teacher");
addForm?.addEventListener("submit", (e) => {
    e.preventDefault();
    const fd = new FormData(addForm);
    const full_name = String(fd.get("name") || "").trim();
    const course = String(fd.get("speciality") || "").trim();
    const country = String(fd.get("country") || "").trim();
    const city = String(fd.get("city") || "").trim();
    const email = String(fd.get("email") || "").trim();
    const phone = String(fd.get("phone") || "").trim();
    const b_date = String(fd.get("dob") || "");
    const gender = (fd.get("sex") === "male" ? "Male" : fd.get("sex") === "female" ? "Female" : "");
    const bg_color = String(fd.get("color") || "#ef7f74");
    const note = String(fd.get("notes") || "").trim();

    const newUser = {
        id: genId(),
        favorite: false,
        course: course || COURSES[0],
        bg_color,
        note: note || "Empty note.",
        gender,
        title: "",
        full_name,
        city, country,
        state: "",
        postcode: "",
        coordinates: undefined,
        timezone: undefined,
        email,
        b_date,
        age: ageFromDate(b_date),
        phone,
        picture_large: "",
        picture_thumbnail: "",
    };
    const v = validateUser({ ...newUser });
    if (!v.valid) {
        alert("Потрібно заповнити обов’язкові поля коректно (Name з великої, email з '@', phone ↔ country і т.д.)\n" + v.errors.join("\n"));
        return;
    }
    state.users.unshift(newUser);
    location.hash = "";
    addForm.reset();
    applyAll();
});

$(".fav-arrow.prev")?.addEventListener("click", () => favList.scrollBy({ left: -300, behavior: "smooth" }));
$(".fav-arrow.next")?.addEventListener("click", () => favList.scrollBy({ left:  300, behavior: "smooth" }));

nextBtn?.addEventListener("click", async () => {
    if (state.api.loading) return;
    try {
        state.api.loading = true;
        const nextPage = state.api.page + 1;
        const more = await fetchUsersPage(nextPage, state.api.perPage, state.api.seed);
        state.users = state.users.concat(more);
        state.api.page = nextPage;
        injectCountrySelectFromUsers(state.users);
        applyAll();
    } catch (e) {
        console.error(e);
        alert("Не вдалося завантажити наступну сторінку.");
    } finally {
        state.api.loading = false;
    }
});

(async function init() {
    try {
        state.api.page = 1;
        state.api.loading = true;
        const first10 = await fetchUsersPage(state.api.page, state.api.perPage, state.api.seed);
        state.users = first10;
        state.filtered = first10;
        injectCountrySelectFromUsers(state.users);
        applyAll();
    } catch (e) {
        console.error(e);
        alert("Не вдалося завантажити користувачів.");
        injectCountrySelectFromUsers(state.users);
        applyAll();
    } finally {
        state.api.loading = false;
    }
})();
