import {
  getFormattedUsers,
  capitalize,
  filterUsers,
  searchUsers,
  validateUser,
  courses,
  daysToBirthday,
} from "./functions.js";

//CONSTANTS

const PAGE_SIZE = 10;
const LOAD_SIZE = 50;
const API_URL = "https://randomuser.me/api/";
const SERVER_URL = "http://localhost:3001/teachers";
const FAVORITES_VISIBLE = 5;
const USERS = [];
const FLAT_COLUMNS = [
  "Name",
  "Speciality",
  "Age",
  "Gender",
  "Country",
  "City",
  "Email",
  "Phone",
  "Birthday",
];

let currentList = USERS;
let currentTeacher = null;
let map = null;
let marker = null;
let statsChart = null;
let shownCount = PAGE_SIZE;
let favoritesStart = 0;
let pivot = null;

//ELEMENTS

const grid = document.querySelector(".top-teachers-list");
const moreButton = document.querySelector(".show-more-btn");
const favoritesList = document.querySelector(".favorites-list");
const prevArrow = document.querySelector(".carousel-arrow-prev");
const nextArrow = document.querySelector(".carousel-arrow-next");

const searchForm = document.querySelector(".header-search");
const searchInput = document.querySelector(".search-input");

const ageSelect = document.querySelector("#age-filter");
const countrySelect = document.querySelector("#country-filter");
const sexSelect = document.querySelector("#sex-filter");
const photoCheckbox = document.querySelector("#photo-filter");
const favoritesCheckbox = document.querySelector("#favorites-filter");

const addModal = document.querySelector("#add-teacher-modal");
const addForm = document.querySelector(".popup-form");
const addError = document.querySelector("#add-error");
const teacherCountry = document.querySelector("#teacher-country");
const teacherCourse = document.querySelector("#teacher-speciality");

const statsField = document.querySelector("#stats-field");
const statsCanvas = document.querySelector("#stats-chart");
const chartView = document.querySelector("#chart-view");
const pivotBox = document.querySelector("#stats-pivot");
const statsTabs = document.querySelectorAll(".stats-tab");

const mapBox = document.querySelector("#popup-map");
const mapToggle = document.querySelector(".popup-map-toggle");

//REQUESTS

async function fetchUsers(count) {
  const response = await fetch(`${API_URL}?results=${count}`);
  if (!response.ok) throw new Error(`HTTP ${response.status}`);
  const data = await response.json();
  return data.results;
}

async function loadValidUsers(count) {
  const valid = [];
  for (let attempt = 0; attempt < 5 && valid.length < count; attempt++) {
    const fetched = await fetchUsers(count - valid.length);
    valid.push(...getFormattedUsers(fetched).filter(validateUser));
  }
  return valid;
}

async function postTeacher(teacher) {
  const response = await fetch(SERVER_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(teacher),
  });
  if (!response.ok) throw new Error(`HTTP ${response.status}`);
}

//TEMPLATES

function photoHtml(teacher, className) {
  if (teacher.picture_large) {
    return `<img src="${teacher.picture_large}" alt="${teacher.full_name}" class="${className}" />`;
  }
  const words = teacher.full_name.split(" ");
  const initials =
    words[0][0] + (words.length > 1 ? "." + words[words.length - 1][0] : "");
  return `<div class="${className} teacher-initials">${initials}</div>`;
}

function cardHtml(teacher) {
  const words = teacher.full_name.split(" ");
  const star = teacher.favorite ? `<span class="teacher-star">★</span>` : "";
  return `
    <a href="#teacher-modal" class="teacher-card" data-id="${teacher.id}">
      <div class="teacher-photo-wrap">${photoHtml(teacher, "teacher-photo")}${star}</div>
      <div class="teacher-info">
        <p class="teacher-name"><span>${words[0]}</span><span>${words.slice(1).join(" ")}</span></p>
        <p class="teacher-subject">${teacher.course}</p>
        <p class="teacher-region">${teacher.country}</p>
      </div>
    </a>`;
}

function optionsHtml(list, emptyLabel = "") {
  return (
    `<option value="">${emptyLabel}</option>` +
    list.map((item) => `<option>${item}</option>`).join("")
  );
}

//TOP TEACHERS

function renderTeachers(list) {
  grid.innerHTML = list.length
    ? list
        .slice(0, shownCount)
        .map((teacher) => cardHtml(teacher))
        .join("")
    : "<p>No teachers found</p>";
}

async function showMore() {
  if (shownCount >= currentList.length) {
    moreButton.disabled = true;
    moreButton.textContent = "Loading...";
    try {
      USERS.push(...(await loadValidUsers(PAGE_SIZE)));
      renderCountries();
      applyFilters();
      moreButton.textContent = "Show more";
    } catch (error) {
      console.error(error);
      moreButton.textContent = "Try again";
      return;
    } finally {
      moreButton.disabled = false;
    }
  }
  shownCount += PAGE_SIZE;
  renderTeachers(currentList);
}

//FILTER AND SEARCH
function renderCountries() {
  const countries = _.sortBy(_.uniq(_.compact(_.map(USERS, "country"))));
  const selected = countrySelect.value;
  countrySelect.innerHTML = optionsHtml(countries, "All");
  countrySelect.value = selected;
  teacherCountry.innerHTML = optionsHtml(countries);
}

function applyFilters() {
  const values = {};
  if (countrySelect.value) values.country = countrySelect.value;
  if (sexSelect.value) values.gender = sexSelect.value;
  if (favoritesCheckbox.checked) values.favorite = true;

  let result = filterUsers(USERS, values);

  if (ageSelect.value) {
    const [min, max] =
      ageSelect.value === "45+"
        ? [45, Infinity]
        : ageSelect.value.split("-").map(Number);
    result = _.filter(result, (u) => _.inRange(u.age, min, max + 1));
  }
  if (photoCheckbox.checked) {
    result = _.filter(result, "picture_large");
  }

  currentList = searchUsers(result, searchInput.value);
  renderTeachers(currentList);
  renderStats();
}

function refreshTeachers() {
  shownCount = PAGE_SIZE;
  applyFilters();
}

//TEACHER POPUP, FAVORITES

function openPopup(id) {
  const teacher = _.find(USERS, { id });
  if (!teacher) return;
  currentTeacher = teacher;

  const email = document.querySelector("#popup-email");
  email.textContent = teacher.email;
  email.href = `mailto:${teacher.email}`;

  document.querySelector("#popup-photo").innerHTML = photoHtml(
    teacher,
    "popup-photo",
  );
  document.querySelector("#popup-name").textContent = teacher.full_name;
  document.querySelector("#popup-subject").textContent = teacher.course;
  document.querySelector("#popup-location").textContent =
    `${teacher.city}, ${teacher.country}`;
  document.querySelector("#popup-age-gender").textContent =
    `${teacher.age}, ${capitalize(teacher.gender)}`;
  document.querySelector("#popup-phone").textContent = teacher.phone;
  document.querySelector("#popup-note").textContent = teacher.note;
  mapBox.hidden = true;
  mapToggle.hidden = !hasCoordinates(teacher);
  const days = daysToBirthday(teacher.b_date);
  const birthday = document.querySelector("#popup-birthday");
  birthday.hidden = days === null;
  birthday.textContent =
    days === 0
      ? "Happy birthday!"
      : `Birthday is in ${days} ${days === 1 ? "day" : "days"}`;
  zyrochkaPalay();
  document.querySelector("#teacher-modal").classList.add("open");
}

function zyrochkaPalay() {
  document.querySelector("#popup-star").textContent = currentTeacher.favorite
    ? "★"
    : "☆";
}

function toggleFavorite() {
  currentTeacher.favorite = !currentTeacher.favorite;
  zyrochkaPalay();
  renderFavorites();
  applyFilters();
}

function renderFavorites() {
  const favorites = _.filter(USERS, "favorite");
  const maxStart = Math.max(0, favorites.length - FAVORITES_VISIBLE);
  favoritesStart = Math.min(favoritesStart, maxStart);

  favoritesList.innerHTML = favorites
    .slice(favoritesStart, favoritesStart + FAVORITES_VISIBLE)
    .map((teacher) => cardHtml(teacher))
    .join("");

  const needsArrows = favorites.length > FAVORITES_VISIBLE;
  prevArrow.hidden = !needsArrows;
  nextArrow.hidden = !needsArrows;
  prevArrow.disabled = favoritesStart === 0;
  nextArrow.disabled = favoritesStart === maxStart;
}

function moveFavorites(step) {
  favoritesStart = Math.max(0, favoritesStart + step);
  renderFavorites();
}

//MAP

function hasCoordinates(teacher) {
  return (
    teacher.coordinates?.latitude != null &&
    teacher.coordinates?.longitude != null
  );
}

function renderMap({ latitude, longitude }) {
  const position = [Number(latitude), Number(longitude)];

  if (!map) {
    map = L.map(mapBox);
    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
      attribution: "&copy; OpenStreetMap contributors",
    }).addTo(map);
    marker = L.marker(position).addTo(map);
  }

  map.invalidateSize();
  map.setView(position, 5);
  marker.setLatLng(position);
}

function toggleMap() {
  mapBox.hidden = !mapBox.hidden;
  if (!mapBox.hidden) renderMap(currentTeacher.coordinates);
}

//STATS TABLE

function statsKey(teacher, field) {
  if (field === "age") {
    if (teacher.age <= 31) return "18-31";
    if (teacher.age <= 45) return "32-45";
    return "46+";
  }
  if (field === "gender") return capitalize(teacher.gender) ?? "Unknown";
  return teacher[field] ?? "Unknown";
}

function renderStats() {
  const counts = _.countBy(currentList, (teacher) =>
    statsKey(teacher, statsField.value),
  );
  const labels = Object.keys(counts);
  const colors = labels.map(
    (_, i) => `hsl(${(i * 360) / labels.length}, 65%, 60%)`,
  );

  if (!statsChart) {
    statsChart = new Chart(statsCanvas, {
      type: "pie",
      data: { labels: [], datasets: [{ data: [] }] },
      options: {
        maintainAspectRatio: false,
        plugins: { legend: { position: "right" } },
      },
    });
  }

  statsChart.data.labels = labels;
  statsChart.data.datasets[0].data = Object.values(counts);
  statsChart.data.datasets[0].backgroundColor = colors;
  statsChart.update();
}

//STATS REPORTS

function pivotData() {
  return _.map(USERS, (teacher) => ({
    Name: teacher.full_name,
    Speciality: teacher.course,
    Age: teacher.age,
    Gender: capitalize(teacher.gender),
    Country: teacher.country,
    City: teacher.city,
    Email: teacher.email,
    Phone: teacher.phone,
    Birthday: teacher.b_date ? teacher.b_date.slice(0, 10) : "",
  }));
}

function pivotReport(view) {
  const dataSource = { data: pivotData() };

  if (view === "flat") {
    return {
      dataSource,
      slice: {
        rows: _.map(FLAT_COLUMNS, (uniqueName) => ({ uniqueName })),
        flatOrder: FLAT_COLUMNS,
      },
      options: {
        grid: { type: "flat", showTotals: "off", showGrandTotals: "off" },
      },
    };
  }

  return {
    dataSource,
    slice: {
      rows: [{ uniqueName: "Country" }],
      columns: [{ uniqueName: "[Measures]" }],
      measures: [
        { uniqueName: "Name", caption: "Teachers", aggregation: "count" },
        {
          uniqueName: "Age",
          caption: "Average age",
          aggregation: "average",
          format: "age",
        },
      ],
    },
    formats: [{ name: "age", decimalPlaces: 1 }],
    options: { grid: { type: "classic" } },
  };
}

function showStatsView(view) {
  statsTabs.forEach((tab) =>
    tab.classList.toggle("active", tab.dataset.view === view),
  );
  chartView.hidden = view !== "chart";
  pivotBox.hidden = view === "chart";

  if (view === "chart") {
    renderStats();
    return;
  }

  const report = pivotReport(view);
  if (pivot) {
    pivot.setReport(report);
  } else {
    pivot = new WebDataRocks({
      container: "#stats-pivot",
      width: "100%",
      height: 450,
      report,
    });
  }
}

//ADD TEACHER FORM

function readNewTeacher() {
  const dob = document.querySelector("#teacher-dob").value;
  const sex = addForm.querySelector('input[name="sex"]:checked');

  return {
    id: `teach-${Date.now()}`,
    gender: sex ? sex.value : null,
    title: null,
    full_name: document.querySelector("#teacher-name").value.trim(),
    city: document.querySelector("#teacher-city").value.trim(),
    state: null,
    country: teacherCountry.value,
    postcode: null,
    coordinates: null,
    timezone: null,
    email: document.querySelector("#teacher-email").value.trim(),
    b_date: dob || null,
    age: dob ? new Date().getFullYear() - new Date(dob).getFullYear() : null,
    phone: document.querySelector("#teacher-phone").value.trim(),
    picture_large: null,
    picture_thumbnail: null,
    favorite: null,
    course: teacherCourse.value,
    bg_color: document.querySelector("#teacher-bg-color").value,
    note: document.querySelector("#teacher-notes").value.trim(),
  };
}

async function addTeacher() {
  const teacher = readNewTeacher();

  if (!teacher.course || !validateUser(teacher)) {
    addError.hidden = false;
    return;
  }

  addError.hidden = true;
  try {
    await postTeacher(teacher);
  } catch (error) {
    console.error(error);
  }

  USERS.unshift(teacher);
  applyFilters();
  addForm.reset();
  addModal.classList.remove("open");
}

//EVENTS

function handleClick(event) {
  const target = event.target;

  const card = target.closest(".teacher-card");
  if (card) {
    event.preventDefault();
    openPopup(card.dataset.id);
    return;
  }

  const closeButton = target.closest(".popup-close");
  if (closeButton) {
    event.preventDefault();
    closeButton.closest(".popup-overlay").classList.remove("open");
    return;
  }

  if (target.closest(".nav-add")) {
    event.preventDefault();
    addModal.classList.add("open");
    return;
  }

  if (target.closest("#popup-star")) {
    toggleFavorite();
    return;
  }

  if (target.closest(".show-more-btn")) {
    showMore();
    return;
  }

  if (target.closest(".carousel-arrow-prev")) {
    moveFavorites(-1);
    return;
  }

  if (target.closest(".carousel-arrow-next")) {
    moveFavorites(1);
    return;
  }

  if (target.closest(".popup-map-toggle")) {
    event.preventDefault();
    toggleMap();
    return;
  }

  const statsTab = target.closest(".stats-tab");
  if (statsTab) {
    showStatsView(statsTab.dataset.view);
    return;
  }
}

function handleChange(event) {
  if (event.target.closest(".filters")) {
    refreshTeachers();
  } else if (event.target === statsField) {
    renderStats();
  }
}

function handleSubmit(event) {
  event.preventDefault();

  if (event.target === searchForm) {
    refreshTeachers();
  } else if (event.target === addForm) {
    addTeacher();
  }
}

//INIT
async function init() {
  try {
    USERS.push(...(await loadValidUsers(LOAD_SIZE)));
  } catch (error) {
    console.error(error);
    grid.innerHTML = "<p>Could not load teachers</p>";
    return;
  }

  renderCountries();
  applyFilters();
  renderFavorites();
}

teacherCourse.innerHTML = optionsHtml(courses);
document.addEventListener("click", handleClick);
document.addEventListener("change", handleChange);
document.addEventListener("submit", handleSubmit);

init();
