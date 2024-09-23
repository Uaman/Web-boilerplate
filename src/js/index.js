"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("./types/FormattedUser");
var teachers = [
    {
        name: "Ihor Tkachuk",
        subject: "Chemistry",
        country: "Ukraine",
        city: "Kyiv",
        age: 33,
        gender: "male",
        nationality: "Ukrainian",
        img: "images/teacher1.webp",
        email: "someone@gmail.com",
        phone: "+380 99 999 99 99",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut purus eget sapien fermentum tincidun" +
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut purus eget sapien fermentum tincidunt",
    },
    {
        name: "Remus Lupin",
        subject: "Art",
        city: "London",
        country: "Enlgand",
        age: 43,
        gender: "male",
        nationality: "English",
        img: "images/teacher.webp",
        favourite: true,
        email: "someone@gmail.com",
        phone: "+44 20 7946 0958",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut purus eget sapien fermentum tincidun" +
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut purus eget sapien fermentum tincidunt",
    },
    {
        name: "Ihor Tkachuk",
        subject: "Chemistry",
        country: "Ukraine",
        city: "Kyiv",
        age: 33,
        gender: "male",
        nationality: "Ukrainian",
        img: "images/teacher1.webp",
        email: "someone@gmail.com",
        phone: "+380 99 999 99 99",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut purus eget sapien fermentum tincidun" +
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut purus eget sapien fermentum tincidunt",
    },
    {
        name: "Remus Lupin",
        subject: "Art",
        city: "London",
        country: "Enlgand",
        age: 43,
        gender: "male",
        nationality: "English",
        img: "images/teacher.webp",
        phone: "+44 20 7946 0958",
        email: "someone@gmail.com",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut purus eget sapien fermentum tincidun" +
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut purus eget sapien fermentum tincidunt",
    },
    {
        name: "Ihor Tkachuk",
        subject: "Chemistry",
        country: "Ukraine",
        city: "Kyiv",
        age: 33,
        gender: "male",
        nationality: "Ukrainian",
        img: "images/teacher1.webp",
        email: "someone@gmail.com",
        phone: "+380 99 999 99 99",
        favourite: true,
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut purus eget sapien fermentum tincidun" +
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut purus eget sapien fermentum tincidunt",
    },
    {
        name: "Remus Lupin",
        subject: "Art",
        city: "London",
        country: "Enlgand",
        age: 43,
        gender: "male",
        nationality: "English",
        img: "images/teacher.webp",
        phone: "+44 20 7946 0958",
        email: "someone@gmail.com",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut purus eget sapien fermentum tincidun" +
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut purus eget sapien fermentum tincidunt",
    },
    {
        name: "Ihor Tkachuk",
        subject: "Chemistry",
        country: "Ukraine",
        city: "Kyiv",
        age: 33,
        gender: "male",
        nationality: "Ukrainian",
        img: "images/teacher1.webp",
        email: "someone@gmail.com",
        phone: "+380 99 999 99 99",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut purus eget sapien fermentum tincidun" +
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut purus eget sapien fermentum tincidunt",
    },
    {
        name: "Remus Lupin",
        subject: "Art",
        city: "London",
        country: "Enlgand",
        age: 43,
        gender: "male",
        nationality: "English",
        img: "images/teacher.webp",
        email: "someone@gmail.com",
        phone: "+44 20 7946 0958",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut purus eget sapien fermentum tincidun" +
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut purus eget sapien fermentum tincidunt",
    },
];
document.addEventListener("DOMContentLoaded", function () {
    function createTeachersList(teachers) {
        var teachersContainers = document.querySelectorAll(".teachers-list-container");
        if (teachersContainers.length === 0)
            return;
        var teachersList = document.createElement("ul");
        teachersList.classList.add("teachers-list");
        teachersList.innerHTML = "<span class=\"arrow left\"></span>";
        teachers.slice(0, 5).forEach(function (teacher, index) {
            var listItem = document.createElement("li");
            listItem.classList.add("teacher-item");
            listItem.dataset.index = index.toString();
            listItem.innerHTML = "\n        <div class=\"teacher-image-container\">\n          <img src=\"".concat(teacher.img, "\" alt=\"").concat(teacher.name, "\" class=\"teacher-image\"/>\n          <span class=\"star-icon ").concat(teacher.favourite ? 'visible' : 'hidden', "\">\u2B50</span>\n        </div>\n        <div class=\"teacher-info-container\">\n          <h3 class=\"teacher-name\">").concat(teacher.name, "</h3>\n          <p class=\"teacher-subject\">").concat(teacher.subject, "</p>\n          <p class=\"teacher-country\">").concat(teacher.country, "</p>\n        </div>\n      ");
            teachersList.appendChild(listItem);
        });
        teachersList.innerHTML += "<span class=\"arrow right\"></span>";
        teachersContainers.forEach(function (teachersContainer) {
            teachersContainer.appendChild(teachersList.cloneNode(true));
        });
    }
    function addTeacherCartInfo(teachers) {
        var teacherListContainer = document.querySelector(".teachers-list");
        var teacherInfoCardContainer = document.querySelector(".teacher-info-card-container");
        var closeBtn = document.querySelector(".close-btn");
        var overlay = document.querySelector(".overlay");
        if (!teacherListContainer || !teacherInfoCardContainer || !overlay || !closeBtn)
            return;
        teacherListContainer.addEventListener("click", function (event) {
            var mouseEvent = event;
            var clickedItem = event.target.closest(".teacher-item");
            if (clickedItem) {
                var teacherIndex = clickedItem.dataset.index;
                var teacher = teachers[parseInt(teacherIndex)];
                teacherInfoCardContainer.classList.remove("hidden");
                overlay.classList.remove("hidden");
                overlay.style.display = "block";
                addTeacherInfoToCard(teacher);
            }
        });
        closeBtn.addEventListener("click", function () {
            teacherInfoCardContainer.classList.add("hidden");
            overlay.classList.add("hidden");
            overlay.style.display = "none";
        });
    }
    function addTeacherInfoToCard(teacher) {
        var teacherInfoCard = document.querySelector(".teacher-info-card-main-container");
        if (!teacherInfoCard)
            return;
        teacherInfoCard.innerHTML = "\n      <div class=\"teacher-info-card-main\">\n        <div class=\"teacher-info-card-image-container\">\n          <img src=\"".concat(teacher.img, "\" alt=\"").concat(teacher.name, "\" class=\"teacher-info-card-image\" />\n        </div>\n        <div class=\"teacher-info-card-details\">\n          <h2 class=\"teacher-name\">").concat(teacher.name, "</h2>\n          <h3 class=\"teacher-info-card-subject\">").concat(teacher.subject, "</h3>\n          <p>").concat(teacher.city, ", ").concat(teacher.country, "</p>\n          <p>").concat(teacher.age, ", ").concat(teacher.gender, "</p>\n          <a href=\"mailto:").concat(teacher.email, "\" class=\"link-teacher-info\">").concat(teacher.email, "</a>\n          <p>").concat(teacher.phone, "</p>\n        </div>\n      </div>\n\n      <div class=\"teacher-info-card-footer-container\">\n        <div class=\"description-container\">\n          <p>").concat(teacher.description, "</p>\n        </div>\n\n        <div class=\"teacher-info-card-map\">\n          <a href=\"https://www.google.com/maps?q=").concat(teacher.city, "\" target=\"_blank\" class=\"map-link link-teacher-info\">toggle map</a>\n        </div>\n      </div>\n    ");
    }
    function addFavouriteTeacher(teachers) {
        var favTeachersContainer = document.querySelector('.fav-teachers-list-container');
        if (!favTeachersContainer)
            return;
        var teachersList = document.createElement("ul");
        teachersList.classList.add("teachers-list");
        teachersList.innerHTML = "<span class=\"arrow left\"></span>";
        var favTeachers = teachers
            .filter(function (teacher) { return teacher.favourite; })
            .map(function (teacher) {
            var listItem = document.createElement("li");
            listItem.classList.add("teacher-item");
            listItem.innerHTML = "\n          <div class=\"teacher-image-container\">\n            <img src=\"".concat(teacher.img, "\" alt=\"").concat(teacher.name, "\" class=\"teacher-image\" />\n          </div>\n          <div class=\"teacher-info-container\">\n            <h3 class=\"teacher-name\">").concat(teacher.name, "</h3>\n            <p class=\"teacher-country\">").concat(teacher.country, "</p>\n          </div>\n        ");
            return listItem;
        });
        favTeachers.forEach(function (listItem) {
            teachersList.appendChild(listItem);
        });
        teachersList.innerHTML += "<span class=\"arrow right\"></span>";
        favTeachersContainer.appendChild(teachersList);
    }
    function dropdownOptions() {
        var dropdownButtons = document.querySelectorAll('.dropbtn');
        dropdownButtons.forEach(function (button) {
            button.addEventListener('click', function (event) {
                var mouseEvent = event;
                var dropdownContent = this.nextElementSibling;
                dropdownContent === null || dropdownContent === void 0 ? void 0 : dropdownContent.classList.toggle('show');
                dropdownButtons.forEach(function (btn) {
                    var otherDropdown = btn.nextElementSibling;
                    if (otherDropdown !== dropdownContent) {
                        otherDropdown === null || otherDropdown === void 0 ? void 0 : otherDropdown.classList.remove('show');
                    }
                });
                event.stopPropagation();
            });
        });
        var dropdownOptions = document.querySelectorAll('.dropdown-content li');
        dropdownOptions.forEach(function (option) {
            option.addEventListener('click', function () {
                var button = this.closest('.dropdown').querySelector('.dropbtn');
                button.innerHTML = this.innerText + ' <span class="arrow-down">&#9662;</span>';
                this.parentElement.parentElement.classList.remove('show');
            });
        });
        document.querySelectorAll('nav ul li').forEach(function (li) {
            li.addEventListener('click', function () {
                document.querySelectorAll('nav ul li.active').forEach(function (li) {
                    li.classList.remove('active');
                });
                this.classList.add('active');
            });
        });
    }
    function populateStatistics(teachers) {
        var table = document.querySelector('table');
        if (!table)
            return;
        var tbody = table.querySelector('tbody');
        teachers.forEach(function (teacher) {
            var tr = document.createElement('tr');
            tr.innerHTML = "\n        <td>".concat(teacher.name, "</td>\n        <td>").concat(teacher.subject, "</td>\n        <td>").concat(teacher.age, "</td>\n        <td>").concat(teacher.gender, "</td>\n        <td>").concat(teacher.nationality, "</td>\n      ");
            tbody === null || tbody === void 0 ? void 0 : tbody.appendChild(tr);
        });
    }
    function addTeacherForm() {
        var addTeacherButton = document.querySelector('#add-teacher-btn');
        var teacherForm = document.querySelector('.add-teacher-form-container');
        var overlay = document.querySelector(".overlay");
        var closeBtn = document.querySelector('.close-form-btn');
        if (!addTeacherButton || !teacherForm || !overlay || !closeBtn)
            return;
        addTeacherButton.addEventListener('click', function () {
            teacherForm.classList.remove('hidden');
            overlay.classList.remove('hidden');
            overlay.style.display = "block";
        });
        closeBtn.addEventListener("click", function () {
            teacherForm.classList.add("hidden");
            overlay.classList.add("hidden");
            overlay.style.display = "none";
        });
    }
    function toggleMenu() {
        var menu = document.querySelector(".menu-links");
        var icon = document.querySelector(".hamburger-icon");
        menu === null || menu === void 0 ? void 0 : menu.classList.toggle("open");
        icon === null || icon === void 0 ? void 0 : icon.classList.toggle("open");
    }
    addTeacherForm();
    createTeachersList(teachers);
    addTeacherCartInfo(teachers);
    addFavouriteTeacher(teachers);
    populateStatistics(teachers);
    dropdownOptions();
    window.addEventListener('click', function () {
        var dropdowns = document.querySelectorAll('.dropdown-content');
        dropdowns.forEach(function (dropdown) {
            dropdown.classList.remove('show');
        });
        var hamburgerIcon = document.querySelector('.hamburger-icon');
        hamburgerIcon === null || hamburgerIcon === void 0 ? void 0 : hamburgerIcon.addEventListener('click', toggleMenu);
    });
});
