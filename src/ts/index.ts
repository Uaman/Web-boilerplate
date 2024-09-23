import './types/FormattedUser';

const teachers: Array<{
  name: string;
  subject: string;
  country: string;
  city: string;
  age: number;
  gender: string;
  nationality: string;
  img: string  ;
  email: string;
  phone: string;
  description: string;
  favourite?: boolean;
}> = [
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

document.addEventListener("DOMContentLoaded", () => {

  function createTeachersList(teachers: Array<{
    name: string;
    subject: string;
    country: string;
    city: string;
    age: number;
    gender: string;
    nationality: string;
    img: string;
    email: string;
    phone: string;
    description: string;
    favourite?: boolean;
  }>): void {
    const teachersContainers: NodeListOf<Element> = document.querySelectorAll(".teachers-list-container");
    if (teachersContainers.length === 0) return;

    const teachersList: HTMLUListElement = document.createElement("ul");
    teachersList.classList.add("teachers-list");

    teachersList.innerHTML = `<span class="arrow left"></span>`;

    teachers.slice(0, 5).forEach((teacher, index) => { 
      const listItem: HTMLLIElement = document.createElement("li");
      listItem.classList.add("teacher-item");

      listItem.dataset.index = index.toString(); 

      listItem.innerHTML = `
        <div class="teacher-image-container">
          <img src="${teacher.img}" alt="${teacher.name}" class="teacher-image"/>
          <span class="star-icon ${teacher.favourite ? 'visible' : 'hidden'}">⭐</span>
        </div>
        <div class="teacher-info-container">
          <h3 class="teacher-name">${teacher.name}</h3>
          <p class="teacher-subject">${teacher.subject}</p>
          <p class="teacher-country">${teacher.country}</p>
        </div>
      `;
      teachersList.appendChild(listItem);
    });

    teachersList.innerHTML += `<span class="arrow right"></span>`;

    teachersContainers.forEach((teachersContainer) => {
      teachersContainer.appendChild(teachersList.cloneNode(true));
    });
  }

  function addTeacherCartInfo(teachers: Array<{
    name: string;
    subject: string;
    country: string;
    city: string;
    age: number;
    gender: string;
    nationality: string;
    img: string;
    email: string;
    phone: string;
    description: string;
    favourite?: boolean;
  }>): void {
    const teacherListContainer: Element | null = document.querySelector(".teachers-list");
    const teacherInfoCardContainer: Element | null = document.querySelector(".teacher-info-card-container");
    const closeBtn: Element | null = document.querySelector(".close-btn");
    const overlay: Element | null = document.querySelector(".overlay");

    if (!teacherListContainer || !teacherInfoCardContainer || !overlay || !closeBtn) return;

    teacherListContainer.addEventListener("click", function (event) {
      const mouseEvent = event as MouseEvent;
      const clickedItem: Element | null = (event.target as HTMLElement).closest(".teacher-item");
      if (clickedItem) {
        const teacherIndex: string = (clickedItem as HTMLElement).dataset.index!;
        const teacher = teachers[parseInt(teacherIndex)]; 

        teacherInfoCardContainer.classList.remove("hidden");
        overlay.classList.remove("hidden");
        (overlay as HTMLElement).style.display = "block";

        addTeacherInfoToCard(teacher);
      }
    });

    closeBtn.addEventListener("click", function () {
      teacherInfoCardContainer.classList.add("hidden");
      overlay.classList.add("hidden");
      (overlay as HTMLElement).style.display = "none";
    });
  }

  function addTeacherInfoToCard(teacher: {
    name: string;
    subject: string;
    city: string;
    country: string;
    age: number;
    gender: string;
    img: string;
    email: string;
    phone: string;
    description: string;
  }): void {
    const teacherInfoCard: Element | null = document.querySelector(".teacher-info-card-main-container");
    if (!teacherInfoCard) return;

    teacherInfoCard.innerHTML = `
      <div class="teacher-info-card-main">
        <div class="teacher-info-card-image-container">
          <img src="${teacher.img}" alt="${teacher.name}" class="teacher-info-card-image" />
        </div>
        <div class="teacher-info-card-details">
          <h2 class="teacher-name">${teacher.name}</h2>
          <h3 class="teacher-info-card-subject">${teacher.subject}</h3>
          <p>${teacher.city}, ${teacher.country}</p>
          <p>${teacher.age}, ${teacher.gender}</p>
          <a href="mailto:${teacher.email}" class="link-teacher-info">${teacher.email}</a>
          <p>${teacher.phone}</p>
        </div>
      </div>

      <div class="teacher-info-card-footer-container">
        <div class="description-container">
          <p>${teacher.description}</p>
        </div>

        <div class="teacher-info-card-map">
          <a href="https://www.google.com/maps?q=${teacher.city}" target="_blank" class="map-link link-teacher-info">toggle map</a>
        </div>
      </div>
    `;
  }

  function addFavouriteTeacher(teachers: Array<{
    name: string;
    subject: string;
    country: string;
    city: string;
    age: number;
    gender: string;
    nationality: string;
    img: string;
    email: string;
    phone: string;
    description: string;
    favourite?: boolean;
  }>): void {
    const favTeachersContainer: Element | null = document.querySelector('.fav-teachers-list-container');
    if (!favTeachersContainer) return; 

    const teachersList: HTMLUListElement = document.createElement("ul");
    teachersList.classList.add("teachers-list");

    teachersList.innerHTML = `<span class="arrow left"></span>`;

    const favTeachers: Array<HTMLLIElement> = teachers
      .filter(teacher => teacher.favourite)
      .map((teacher) => {
        const listItem: HTMLLIElement = document.createElement("li");
        listItem.classList.add("teacher-item");

        listItem.innerHTML = `
          <div class="teacher-image-container">
            <img src="${teacher.img}" alt="${teacher.name}" class="teacher-image" />
          </div>
          <div class="teacher-info-container">
            <h3 class="teacher-name">${teacher.name}</h3>
            <p class="teacher-country">${teacher.country}</p>
          </div>
        `;
        return listItem;
      });

    favTeachers.forEach((listItem) => {
      teachersList.appendChild(listItem);
    });

    teachersList.innerHTML += `<span class="arrow right"></span>`;

    favTeachersContainer.appendChild(teachersList);
  }

  function dropdownOptions(): void {
    const dropdownButtons: NodeListOf<Element> = document.querySelectorAll('.dropbtn');
    dropdownButtons.forEach(button => {
      button.addEventListener('click', function (event) {
        const mouseEvent = event as MouseEvent;
        const dropdownContent: Element | null = (this as HTMLElement).nextElementSibling;
        dropdownContent?.classList.toggle('show');

        dropdownButtons.forEach(btn => {
          const otherDropdown: Element | null = btn.nextElementSibling;
          if (otherDropdown !== dropdownContent) {
            otherDropdown?.classList.remove('show');
          }
        });

        event.stopPropagation();
      });
    });

    const dropdownOptions: NodeListOf<Element> = document.querySelectorAll('.dropdown-content li');
    dropdownOptions.forEach(option => {
      option.addEventListener('click', function () {
        const button: HTMLElement = this.closest('.dropdown')!.querySelector('.dropbtn') as HTMLElement;
        button.innerHTML = this.innerText + ' <span class="arrow-down">&#9662;</span>';
        this.parentElement!.parentElement!.classList.remove('show');
      });
    });

    document.querySelectorAll('nav ul li').forEach(li => {
      li.addEventListener('click', function () {
        document.querySelectorAll('nav ul li.active').forEach(li => {
          li.classList.remove('active');
        });
        this.classList.add('active');
      });
    });
  }

  function populateStatistics(teachers: Array<{
    name: string;
    subject: string;
    age: number;
    gender: string;
    nationality: string;
  }>): void {
    const table: HTMLTableElement | null = document.querySelector('table');
    if (!table) return;

    const tbody: HTMLTableSectionElement | null = table.querySelector('tbody');
    teachers.forEach(teacher => {
      const tr: HTMLTableRowElement = document.createElement('tr');
      tr.innerHTML = `
        <td>${teacher.name}</td>
        <td>${teacher.subject}</td>
        <td>${teacher.age}</td>
        <td>${teacher.gender}</td>
        <td>${teacher.nationality}</td>
      `;
      tbody?.appendChild(tr);
    });
  }

  function addTeacherForm(): void {
    const addTeacherButton: Element | null = document.querySelector('#add-teacher-btn'); 
    const teacherForm: Element | null = document.querySelector('.add-teacher-form-container'); 
    const overlay: Element | null = document.querySelector(".overlay"); 
    const closeBtn: Element | null = document.querySelector('.close-form-btn');  

    if (!addTeacherButton || !teacherForm || !overlay || !closeBtn) return;

    addTeacherButton.addEventListener('click', function () {
      teacherForm.classList.remove('hidden');
      overlay.classList.remove('hidden');
      (overlay as HTMLElement).style.display = "block";
    });

    closeBtn.addEventListener("click", function () {
      teacherForm.classList.add("hidden");
      overlay.classList.add("hidden");  
      (overlay as HTMLElement).style.display = "none";
    });
  }

  function toggleMenu(): void {
    const menu: Element | null = document.querySelector(".menu-links");
    const icon: Element | null = document.querySelector(".hamburger-icon");

    menu?.classList.toggle("open");
    icon?.classList.toggle("open");
  }

  addTeacherForm();
  createTeachersList(teachers);
  addTeacherCartInfo(teachers);
  addFavouriteTeacher(teachers);
  populateStatistics(teachers);
  dropdownOptions();

  window.addEventListener('click', function () {
    const dropdowns: NodeListOf<Element> = document.querySelectorAll('.dropdown-content');
    dropdowns.forEach(dropdown => {
      dropdown.classList.remove('show');
    });

    const hamburgerIcon: Element | null = document.querySelector('.hamburger-icon');
    hamburgerIcon?.addEventListener('click', toggleMenu);
  });
});