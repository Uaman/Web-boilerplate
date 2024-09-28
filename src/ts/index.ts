type FormattedUser = {
  id: number,
  gender: string,
  title: string,
  full_name: string,
  course: string,
  note: string,
  city: string,
  state: string,
  country: string,
  postcode: number,
  coordinates: {
    latitude: string,
    longitude: string
  },
  timezone: {
    offset: string,
    description: string
  },
  email: string,
  b_date: string,
  age: number,
  phone: string,
  picture_large: string,
  picture_thumbnail: string,
  picture_medium: string,
  region: string,
  favorite: boolean,
  bg_color: string
};

 const courses: string[] = [
  "Mathematics", "Physics", "English", "Computer Science", "Dancing",
  "Chess", "Biology", "Chemistry", "Law", "Art", "Medicine", "Statistics"
];

const europeanCountries = [
  'Albania', 'Andorra', 'Armenia', 'Austria', 'Azerbaijan', 'Belarus', 'Belgium', 
  'Bosnia and Herzegovina', 'Bulgaria', 'Croatia', 'Cyprus', 'Czech Republic', 
  'Denmark', 'Estonia', 'Finland', 'France', 'Georgia', 'Germany', 'Greece', 
  'Hungary', 'Iceland', 'Ireland', 'Italy', 'Kazakhstan', 'Kosovo', 'Latvia', 
  'Liechtenstein', 'Lithuania', 'Luxembourg', 'Malta', 'Moldova', 'Monaco', 
  'Montenegro', 'Netherlands', 'North Macedonia', 'Norway', 'Poland', 'Portugal', 
  'Romania', 'Russia', 'San Marino', 'Serbia', 'Slovakia', 'Slovenia', 'Spain', 
  'Sweden', 'Switzerland', 'Turkey', 'Ukraine', 'United Kingdom', 'Vatican City',
  'Montenegro', 'Serbia', 'Kosovo', 'Bosnia and Herzegovina', 'Croatia', 'Slovenia',
  'Hungary', 'Slovakia', 'Czech Republic', 'Poland', 'Lithuania', 'Latvia', 'Estonia',
  'Finland', 'Sweden', 'Norway', 'Denmark', 'Iceland', 'Ireland', 'United Kingdom',
  'Netherlands', 'Belgium', 'Luxembourg', 'France', 'Spain', 'Portugal', 'Germany',
  'Switzerland', 'Austria', 'Italy', 'Slovenia', 'Croatia', 'Bosnia and Herzegovina',
];



function formatUser(users: any[]): FormattedUser[] {
  return users.map((user: any) => ({
      id: generateUUID(),
      gender: user.gender,
      title: user.name.title,
      full_name: `${user.name.first} ${user.name.last}`,
      city: user.location.city,
      state: user.location.state,
      country: user.location.country,
      postcode: user.location.postcode,
      coordinates: user.location.coordinates,
      timezone: user.location.timezone,
      email: user.email,
      b_date: user.dob.date,
      age: user.dob.age,
      phone: user.phone,

      //icture: Object
/*
large: "https://randomuser.me/api/portraits/men/73.jpg"

medium: "https://randomuser.me/api/portraits/med/men/73.jpg"

thumbnail: "https://randomuser.me/api/portraits/thumb/men/73.jpg"
*/
      picture_large: user.picture.large,
      picture_thumbnail: user.picture.thumbnail,
      picture_medium: user.picture.medium,
      course: getRandomCourse(),
      favorite: Math.random() > 0.5,
      img: user.picture.large,
      bg_color: '#FFFFFF',
      region: setRegion(user),
      note: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
  }));
}



function setRegion(user: any): string {

    const country = user.location.country;

    if (country === 'United States' || country === 'USA' ) {
      return 'USA';
    } else if (europeanCountries.includes(country)) {
      return 'Europe';
    } else {
      return 'Other';
    } 
  
}


function getRandomCourse(): string {
  return courses[Math.floor(Math.random() * courses.length)];
}

function generateUUID(): number {
  return Math.floor(Math.random() * 1000000);
}
function mergeUsers(users: FormattedUser[], additionalUsers): FormattedUser[] {
  const combinedUsers = [...users, ...additionalUsers];
  const seenNames = new Set<string>();

  const uniqueUsers = combinedUsers.filter(user => {
    if (!seenNames.has(user.full_name)) {
      seenNames.add(user.full_name);
      return true;
    }
    return false;
  });

  return uniqueUsers.map(user => ({
    ...user,
    course: getRandomCourse(),
    note: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
  }));
}

function validateData(user: FormattedUser): boolean {
  console.log(`Validating user ${user.full_name}, ID: ${user.id}`);
  
  const startsWithUpperCase = (str: string): boolean => /^[A-Z]/.test(str);
  const validatePhoneNumber = (phone: string): boolean => /^\d{10}$/.test(phone); // Adjust regex if needed

  // Check phone number
  if (!validatePhoneNumber(user.phone)) {
      console.log('Invalid phone number');
      return false;
  }


  const stringFields: (keyof FormattedUser)[] = ['full_name', 'gender', 'note', 'state', 'city', 'country'];
  for (const field of stringFields) {
      if (typeof user[field] !== 'string' || !startsWithUpperCase(user[field] as string)) {
          console.log(`Invalid ${field}`);
          return false;
      }
  }


  if (typeof user.age !== 'number' || user.age < 0) {
      console.log('Invalid age');
      return false;
  }


  if (typeof user.email !== 'string' || !user.email.includes('@')) {
      console.log('Invalid email');
      return false;
  }

  return true;
}
function sortUsers(
users: FormattedUser[],
sortBy: 'full_name' | 'age' | 'b_date' | 'country' | 'gender' | 'course' | undefined,
direction: 'asc' | 'desc' = 'asc'
): FormattedUser[] {

if (sortBy === undefined) return users;

return users.sort((a, b) => {
  let comparison = 0;

  // Ensure properties exist before comparing
  if (a[sortBy] !== undefined && b[sortBy] !== undefined) {
    if (sortBy === 'full_name' || sortBy === 'country' || sortBy === 'gender' || sortBy==='course') {
      comparison = a[sortBy].toLowerCase().localeCompare(b[sortBy].toLowerCase());
    } else if (sortBy === 'age') {
      comparison = a.age - b.age;
    } else if (sortBy === 'b_date') {
      comparison = new Date(a.b_date).getTime() - new Date(b.b_date).getTime();
    }
  }

  return direction === 'asc' ? comparison : -comparison;
});
}

function filterUsers(users: FormattedUser[], filters: {
  course?: string,
  age?: number | string,
  gender?: string,
  favorite?: boolean,
  region?: string,
  hasPhoto?: boolean
}): FormattedUser[] {
  return users.filter(user => {
    const ageString = filters.age?.toString();
    const [ageStart, ageEnd] = ageString && ageString.includes("-")
      ? ageString.split("-").map(Number)
      : [ageString ? Number(ageString) : undefined, ageString ? Number(ageString) : undefined];

    if (filters.course && user.course !== filters.course) return false;
    if (filters.age !== undefined && user.age !== undefined && !(user.age >= ageStart! && user.age <= ageEnd!)) return false;
    if (filters.gender && user.gender.toLowerCase() !== filters.gender.toLowerCase()) return false;
    if (filters.favorite !== undefined && user.favorite !== filters.favorite) return false;
    if (filters.region && user.region !== filters.region) return false;

    if (filters.hasPhoto !== undefined) {
      const userHasPhoto = user.picture_large !== undefined;
      if (filters.hasPhoto && !userHasPhoto) return false;
      if (!filters.hasPhoto && userHasPhoto) return false;
    }

    return true;
  });
}



function searchForUser(users: FormattedUser[], searchBy: { age?: number | string, name?: string, note?: string }): FormattedUser[] {
  return users.filter(user => {
      let ageMatch = true;
      const ageString = searchBy.age?.toString().trim();

      if (ageString !== undefined) {
          const userAge = user.age;
          if (ageString.startsWith(">=")) {
              const ageValue = parseInt(ageString.slice(2).trim());
              ageMatch = userAge >= ageValue;
          } else if (ageString.startsWith("<=")) {
              const ageValue = parseInt(ageString.slice(2).trim());
              ageMatch = userAge <= ageValue;
          } else {
              ageMatch = userAge === parseInt(ageString);
          }
      }

      const nameMatch = searchBy.name ? user.full_name.toLowerCase().trim().includes(searchBy.name.toLowerCase().trim()) : true;
      const noteMatch = searchBy.note ? user.note.toLowerCase().trim().includes(searchBy.note.toLowerCase().trim()) : true;

      return ageMatch && nameMatch && noteMatch;
  });
}



function calculataeMatchPercentage(users: FormattedUser[], matchedUsers: FormattedUser[]): number {
  return Math.round((matchedUsers.length / users.length) * 100);
}

let teachers: FormattedUser[] = []; 
let totalFetched = 0; 
const maxUsers = 50; 

async function fetchUsers(): Promise<any[]> {
    try {
        const response = await fetch('https://randomuser.me/api/?results=50');
        const data = await response.json();
        return data.results;
    } catch (error) {
        console.error('Error fetching users:', error);
        return [];
    }
}


document.addEventListener("DOMContentLoaded", async () => {
  async function loadInitialTeachers() {
    try {

        teachers = await fetchUsers();
        totalFetched = teachers.length;


        const formattedTeachers: FormattedUser[] = formatUser(teachers);
        const sortedUsers = sortUsers(formattedTeachers, 'full_name', 'asc');
    
     
        dropdownOptions(sortedUsers);
    
        filterTeachersByDropdown(sortedUsers);
        createTeachersList(sortedUsers);
        addFavouriteTeacher(sortedUsers);
        sortUsersByAttribute(sortedUsers);
        addTeacherCartInfo(sortedUsers);
        searchForTeacher(sortedUsers);
        addTeacherForm(sortedUsers);

    } catch (error) {
        console.error('Error fetching users:', error);
    }
}

function createTeachersList(teachers: Array<FormattedUser>): void {
  const teachersContainers = document.querySelectorAll(".teachers-list-container");
  if (teachersContainers.length === 0) return;

  // Clear previous content
  teachersContainers.forEach(container => {
      container.innerHTML = '';
  });

  const teachersWrapper = document.createElement("div");
  teachersWrapper.classList.add("teachers-wrapper");

  const teachersList = document.createElement("ul");
  teachersList.classList.add("teachers-list");

  const leftArrow = document.createElement("span");
  leftArrow.classList.add("material-icons");
  leftArrow.textContent = "arrow_back";

  const rightArrow = document.createElement("span");
  rightArrow.classList.add("material-icons");
  rightArrow.textContent = "arrow_forward";

  // Create and append teacher list items
  teachers.forEach((teacher, index) => {
      const listItem = document.createElement("li");
      listItem.classList.add("teacher-item");
      listItem.dataset.index = index.toString();
      listItem.innerHTML = `
          <div class="teacher-image-container">
              <img src="${teacher.picture_large}" alt="${teacher.full_name}" class="teacher-image"/>
              <span class="star-icon ${teacher.favorite ? 'visible' : 'hidden'}">⭐</span>
          </div>
          <div class="teacher-info-container">
              <h3 class="teacher-name">${teacher.full_name}</h3>
              <p class="teacher-subject">${teacher.course}</p>
              <p class="teacher-country">${teacher.country}</p>
          </div>
      `;
      teachersList.appendChild(listItem);
  });

  teachersWrapper.appendChild(leftArrow);
  teachersWrapper.appendChild(teachersList);
  teachersWrapper.appendChild(rightArrow);

  teachersContainers.forEach((teachersContainer) => {
      teachersContainer.appendChild(teachersWrapper);
  });

  // Add scrolling functionality
  const scrollAmount = 500;

  rightArrow.addEventListener('click', async () => {
      teachersList.scrollBy({ left: scrollAmount, behavior: 'smooth' });
  });

  leftArrow.addEventListener('click', () => {
      teachersList.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
  });

  // Star icon functionality
  teachersList.addEventListener('click', (e) => {
      if ((e.target as HTMLElement).classList.contains('star-icon')) {
          const listItem = (e.target as HTMLElement).closest('.teacher-item');
          const teacherIndex = parseInt((listItem as HTMLElement).dataset.index!, 10);
          teachers[teacherIndex].favorite = !teachers[teacherIndex].favorite;
          (e.target as HTMLElement).classList.toggle('visible', teachers[teacherIndex].favorite);
          (e.target as HTMLElement).classList.toggle('hidden', !teachers[teacherIndex].favorite);
      }
  });
}




  function addTeacherCartInfo(teachers: Array<FormattedUser>): void {
    const teacherListContainers: NodeListOf<Element> = document.querySelectorAll(".teachers-list");
    const teacherInfoCardContainer: Element | null = document.querySelector(".teacher-info-card-container");
     const closeBtn: Element | null = document.querySelector(".close-btn");
    const overlay: Element | null = document.querySelector(".overlay");
  
    if (!teacherListContainers.length || !teacherInfoCardContainer || !overlay || !closeBtn) return;
  
    teacherListContainers.forEach(teacherListContainer => {
      teacherListContainer.addEventListener("click", function (event) {
          const mouseEvent = event as MouseEvent;
          const clickedItem: Element | null = (mouseEvent.target as HTMLElement).closest(".teacher-item");
  
          if (clickedItem) {
              const teacherIndex: string = (clickedItem as HTMLElement).dataset.index!;
              console.log(`Clicked index: ${teacherIndex}`); // Log the index to debug
              const teacher = teachers[parseInt(teacherIndex)];
  
              console.log(`Selected Teacher: ${teacher.full_name}`); // Debug output for selected teacher
  
              // Now proceed to show the info card
              teacherInfoCardContainer.classList.remove("hidden");
              overlay.classList.remove("hidden");
              (overlay as HTMLElement).style.display = "block";
  
              addTeacherInfoToCard(teacher, teachers);
          }
      });
  });
  
  
    closeBtn.addEventListener("click", function () {
      teacherInfoCardContainer.classList.add("hidden");
      overlay.classList.add("hidden");
      (overlay as HTMLElement).style.display = "none";
    });
  }
  
  
  function addTeacherInfoToCard(teacher: FormattedUser, teachers: Array<FormattedUser>): void {
    const teacherInfoCard: Element | null = document.querySelector(".teacher-info-card-main-container");
    if (!teacherInfoCard) return;
  
    teacherInfoCard.innerHTML = `
      <div class="teacher-info-card-main">

        <div class="teacher-info-card-image-container" data-id="${teacher.id}">
          <img src='${teacher.picture_large}' alt="${teacher.full_name}" class="teacher-info-card-image" />
        </div>
        <div class="teacher-info-card-details">
        <div class="with-star">
          <h2 class="teacher-name">${teacher.full_name}</h2>
             <div class="add-fav-button-container">
          <p class="add-to-fav">${teacher.favorite ? '⭐️' : '⚝'}</p>
          </div>
        </div>
          <h3 class="teacher-info-card-subject">${teacher.course}</h3>
          <p>${teacher.city}, ${teacher.country}</p>
          <p>${teacher.age}, ${teacher.gender}</p>
          <a href="mailto:${teacher.email}" class="link-teacher-info">${teacher.email}</a>
          <p>${teacher.phone}</p>
        </div>
      </div>
  
      <div class="teacher-info-card-footer-container">
        <div class="description-container">
          <p>${teacher.note}</p>
        </div>
  
        <div class="teacher-info-card-map">
          <a href="https://www.google.com/maps?q=${teacher.city}" target="_blank" class="map-link link-teacher-info">toggle map</a>
        </div>
        
     
     
      </div>
    `;
  
    const addToFavButton = document.querySelector(".add-to-fav") as HTMLButtonElement | null;
    if (addToFavButton) {
      addToFavButton.addEventListener("click", function () {
        teacher.favorite = !teacher.favorite; 
        addToFavButton.textContent = teacher.favorite ? '⭐️' : '⚝';
     
        //Star
        const teacherItem = document.querySelector(`.teacher-item[data-index="${teachers.indexOf(teacher)}"]`);
        const starIcon = teacherItem?.querySelector('.star-icon');
        if (starIcon) {
          starIcon.classList.toggle('visible', teacher.favorite);
          starIcon.classList.toggle('hidden', !teacher.favorite);
        }
  
        addFavouriteTeacher(teachers);
      });
    }
  }
  
  
  
  function addFavouriteTeacher(teachers: Array<FormattedUser>): void {
    const favTeachersContainer: Element | null = document.querySelector('.fav-teachers-list-container');
    if (!favTeachersContainer) return;

    // Clear previous favorite teachers list
    favTeachersContainer.innerHTML = '';

    const teachersWrapper = document.createElement("div");
    teachersWrapper.classList.add("teachers-wrapper");

    const teachersList = document.createElement("ul");
    teachersList.classList.add("teachers-list");

    // Create the left arrow
    const leftArrow = document.createElement("span");
    leftArrow.classList.add("material-icons");
    leftArrow.textContent = "arrow_back";

    // Create the right arrow
    const rightArrow = document.createElement("span");
    rightArrow.classList.add("material-icons");
    rightArrow.textContent = "arrow_forward";

    // Create a list of favorite teachers
    const favTeachers: Array<HTMLLIElement> = teachers
        .filter(teacher => teacher.favorite)
        .map((teacher) => {
            const listItem: HTMLLIElement = document.createElement("li");
            listItem.classList.add("teacher-item");

            listItem.innerHTML = `
                <div class="teacher-image-container">
                    <img src='${teacher.picture_large}' alt="${teacher.full_name}" class="teacher-image" />
                </div>
                <div class="teacher-info-container">
                    <h3 class="teacher-name">${teacher.full_name}</h3>
                    <p class="teacher-country">${teacher.country}</p>
                </div>
            `;
            return listItem;
        });

    // Append favorite teachers to the list
    favTeachers.forEach((listItem) => {
        teachersList.appendChild(listItem);
    });

    // Append the list and arrows to the wrapper
    teachersWrapper.appendChild(leftArrow);
    teachersWrapper.appendChild(teachersList);
    teachersWrapper.appendChild(rightArrow);

    // Append the wrapper to the favorites container
    favTeachersContainer.appendChild(teachersWrapper);

    // Add scrolling functionality
    const scrollAmount = 300; // Adjust the amount to scroll
    leftArrow.addEventListener('click', () => {
        teachersList.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    });

    rightArrow.addEventListener('click', () => {
        teachersList.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    });

    // Show star icons for favorites
    document.querySelectorAll('.star-icon').forEach(icon => {
        icon.classList.add('visible');
    });
}

  
  function dropdownOptions(teachers: FormattedUser[]): void {
    populateDropDowns(teachers);
    const dropdownButtons: NodeListOf<Element> = document.querySelectorAll('.dropbtn');

    dropdownButtons.forEach(button => {
        // Set default text
        button.innerHTML = 'Select an option';

        button.addEventListener('click', function (this: HTMLElement, event: Event) {
            const dropdownContent: Element | null = this.nextElementSibling;
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
        option.addEventListener('click', function (this: HTMLElement) {
            const button: HTMLElement = this.closest('.dropdown')!.querySelector('.dropbtn') as HTMLElement;

            // Update the selected option without resetting others
            button.innerHTML = this.innerText ;
            this.parentElement!.parentElement!.classList.remove('show');
            filterTeachersByDropdown(teachers);
        });
    });

    document.querySelectorAll('nav ul li').forEach(li => {
        li.addEventListener('click', function (this: HTMLElement) {
            document.querySelectorAll('nav ul li.active').forEach(li => {
                li.classList.remove('active');
            });
            this.classList.add('active');
        });
    });
}

function populateDropDowns(teachers: FormattedUser[]): void {
 countriesToPopulate(teachers);
  specialityToPopulate(teachers);

}
async function countriesToPopulate(teachers: FormattedUser[]): Promise<void> {
  const countriesDropdownULs: NodeListOf<HTMLUListElement> = document.querySelectorAll('.countries-dropdown-to-populate');
  const uniqueCountries = new Set<string>();

  // Collect unique countries from the teachers array
  teachers.forEach(teacher => {
    if (teacher.country) {
      uniqueCountries.add(teacher.country);
    }
  });

  // Sort the unique countries
  const sortedCountries = Array.from(uniqueCountries).sort();

  // Fetch country data
  try {
    const response = await fetch('https://restcountries.com/v3.1/all');
    const countriesData = await response.json();

    // Create a mapping of country names to country codes (or other attributes)
    const countryMap = new Set<string>();
    countriesData.forEach((country: any) => {
      if (country.name && country.name.common) {
        // Add country name and any other attribute you want, e.g., alpha2Code
        countryMap.add(country.name.common); // Using common name and alpha-2 code
      }
    });

    const sortedCountries = Array.from(countryMap).sort();
    countriesDropdownULs.forEach(dropdown => {
      dropdown.innerHTML = '';

      sortedCountries.forEach(country => {
        const li = document.createElement('li');
        li.classList.add('region-option');
        li.textContent = country;

        dropdown.appendChild(li);
      });
    });
  } catch (error) {
    console.error('Error fetching country data:', error);
  }
}


function specialityToPopulate(teachers: FormattedUser[]): void {  
  const specialityDropdownULs: NodeListOf<HTMLUListElement> = document.querySelectorAll('.speciality-dropdown-to-populate');



  const uniqueSpecialities = new Set<string>();
  teachers.forEach(teacher => {
    if (teacher.course) {
      uniqueSpecialities.add(teacher.course);
    }
  });

  const sortedSpeciality = Array.from(uniqueSpecialities).sort();
  specialityDropdownULs.forEach(dropdown => {
    dropdown.innerHTML = '';

    sortedSpeciality.forEach(course => {
      const li = document.createElement('li');
      li.classList.add('region-option');
      li.textContent = course; 
      dropdown.appendChild(li); 
    });
  });
}
function filterTeachersByDropdown(teachers: FormattedUser[]): void {

  const ageFilter = document.querySelector('#age-params-btn') as HTMLElement | null;
  const regionParams = document.querySelector('#region-params-btn') as HTMLElement | null;
  const sexParams = document.querySelector('#sex-params-btn') as HTMLElement | null;
  const favCheck = document.querySelector('#favCheck') as HTMLInputElement | null;
  const photoCheck = document.querySelector('#photoCheck') as HTMLInputElement | null;

  if (!ageFilter || !regionParams || !sexParams) return;

  const selectedRegion = regionParams.textContent?.trim();
  const selectedGender = sexParams.textContent?.trim().toLowerCase();
  const selectedAge = ageFilter.textContent?.trim().toLowerCase();

  // Log for debugging
  console.log('Region:', selectedRegion); 
  console.log('Gender:', selectedGender); 
  console.log('Age Filter:', selectedAge);

  const filteredUsers: FormattedUser[] = filterUsers(teachers, {
    age: selectedAge,
    gender: selectedGender,
    region: selectedRegion,
    favorite: favCheck?.checked || false,
    hasPhoto: photoCheck?.checked || false
  });

 
  console.log('Filtered Users:', filteredUsers); 

  // Remove existing list
  const teachersContainers: NodeListOf<Element> = document.querySelectorAll(".teachers-list-container");
  teachersContainers.forEach(container => {
      const existingList = container.querySelector('.teachers-list');
      if (existingList) {
          existingList.remove(); 
      }
  });

 
  createTeachersList(filteredUsers);
  addTeacherCartInfo(filteredUsers);
}






  function sortUsersByAttribute(users: FormattedUser[]): void {
    const data_sort_elements: NodeListOf<HTMLElement> = document.querySelectorAll('th[data-sort]');
  
    populateStatistics(sortUsers(users, 'full_name', 'asc'));
    
    const sortDirections: Record<string, 'asc' | 'desc'> = {};
  

    
    data_sort_elements.forEach((element) => {
      element.addEventListener('click', function () {
        const data_sort_value = element.getAttribute('data-sort');
        const arrow: HTMLElement | null = element.querySelector('.arrow');
        
        if (data_sort_value) {
          const currentDirection = sortDirections[data_sort_value] || 'asc';
          const newDirection = currentDirection === 'asc' ? 'desc' : 'asc';
          sortDirections[data_sort_value] = newDirection;
          if (arrow) {
            arrow.textContent = newDirection === 'asc' ? '↑' : '↓'; 
          }
          const sortedUsers: FormattedUser[] = sortUsers(users, data_sort_value as 'full_name' | 'age' | 'b_date' | 'country' | 'gender' | 'course', newDirection);
          populateStatistics(sortedUsers);
        }
      });
    });
  }
  
  
  function populateStatistics(teachers: Array<FormattedUser>): void {
    const table: HTMLTableElement | null = document.querySelector('table');
    if (!table) return;
  
    const tbody: HTMLTableSectionElement | null = table.querySelector('tbody');
    const paginationContainer: HTMLElement | null = document.querySelector('.pagination');
    const teachersPerPage = 10;
    let currentPage = 1;
  
    // Розбити викладачів на сторінки
    function getPaginatedTeachers(page: number): FormattedUser[] {
      const startIndex = (page - 1) * teachersPerPage;
      return teachers.slice(startIndex, startIndex + teachersPerPage);
    }
  
    // Оновити відображення таблиці викладачів
    function renderTable(page: number) {
      if (tbody) {
        tbody.innerHTML = ''; // Очищення попереднього вмісту таблиці
      }
  
      const paginatedTeachers = getPaginatedTeachers(page);
  
      // Заповнити таблицю відсортованими даними
      paginatedTeachers.forEach((teacher) => {
        const tr: HTMLTableRowElement = document.createElement('tr');
        tr.innerHTML = `
          <td>${teacher.full_name}</td>
          <td>${teacher.course}</td>
          <td>${teacher.age}</td>
          <td>${teacher.gender}</td>
          <td>${teacher.country}</td>
          <td>${teacher.b_date}</td>
        `;
        tbody?.appendChild(tr);
      });
    }
  

    function createPagination() {
      if (paginationContainer) {
        paginationContainer.innerHTML = '';
  
        const totalPages = Math.ceil(teachers.length / teachersPerPage);
  
        const leftArrow = document.createElement('button');
        leftArrow.textContent = '←';
        leftArrow.disabled = currentPage === 1;
        leftArrow.addEventListener('click', () => {
          if (currentPage > 1) {
            currentPage--;
            renderTable(currentPage);
            updatePagination();
          }
        });
        paginationContainer.appendChild(leftArrow);

        for (let i = 1; i <= totalPages; i++) {
          const pageButton = document.createElement('button');
          pageButton.textContent = i.toString();
          pageButton.classList.add('page-button');
          if (i === currentPage) {
            pageButton.classList.add('active');
          }
  
          pageButton.addEventListener('click', () => {
            currentPage = i;
            renderTable(currentPage);
            updatePagination();
          });
  
          paginationContainer.appendChild(pageButton);

        }

        const rightArrow = document.createElement('button');
        rightArrow.textContent = '→';
        rightArrow.disabled = currentPage === totalPages;
        rightArrow.addEventListener('click', () => {
          if (currentPage < totalPages) {
            currentPage++;
            renderTable(currentPage);
            updatePagination();
          }
        });
        paginationContainer.appendChild(rightArrow);
      }
    }

    function updatePagination() {
      const buttons = document.querySelectorAll('.page-button');
      buttons.forEach((button, index) => {
        button.classList.toggle('active', index + 1 === currentPage);
      });
    }

    renderTable(currentPage);
    createPagination();
  }
  
  
  function addTeacherForm(teachers: FormattedUser[]): void {
    const addTeacherButton: Element | null = document.querySelector('#add-teacher-btn'); 
    const teacherForm: Element | null = document.querySelector('.add-teacher-form-container'); 
    const overlay: Element | null = document.querySelector('.overlay'); 
    const closeBtn: Element | null = document.querySelector('.close-form-btn');  
    const addBtn: Element | null = document.querySelector('.add-teacher-form-button');
    const notification: HTMLElement | null = document.querySelector('#notification');

    const counryButton: Element | null = document.querySelector('#country');
    const specialityButton: Element | null = document.querySelector('#speciality');
    const dateInput: Element | null = document.querySelector('#date');
    const color: Element | null = document.querySelector('#favcolor');

    if (!addTeacherButton || !teacherForm || !overlay || !closeBtn || !notification) return;

    addTeacherButton.addEventListener('click', function () {
        teacherForm.classList.remove('hidden');
        overlay.classList.remove('hidden');
        (overlay as HTMLElement).style.display = "block";
    });

    overlay.addEventListener("click", function () {
        teacherForm.classList.add('hidden');
        overlay.classList.add('hidden');
        (overlay as HTMLElement).style.display = "none";
    });

    closeBtn.addEventListener("click", function () {
        teacherForm.classList.add('hidden');
        overlay.classList.add('hidden');
        (overlay as HTMLElement).style.display = "none";
    });

    addBtn.addEventListener('click', function () {
        const form = teacherForm.querySelector('form') as HTMLFormElement | null;
        if (form) {
            form.addEventListener('submit', function (event) {
                event.preventDefault(); // Prevent the default form submission

                // Collecting data from the form fields
                const formData = new FormData(form);
                const newTeacher: FormattedUser = {
                  full_name: formData.get('full_name') as string,
                  course: specialityButton.textContent as string,
                  age: parseInt((dateInput as HTMLInputElement).value),
                  gender: formData.get('gender') as string,
                  country: counryButton.textContent as string,
                  city: formData.get('city') as string,
                  email: formData.get('email') as string,
                  phone: formData.get('phone') as string,
                  note: formData.get('#note') as string || ' Hi, I am using this platform!',
                  favorite: false, 
                  b_date: dateInput.textContent as string,
                  id: 0,
                  title: "",
                  state: "",
                  postcode: 0,
                  coordinates: {
                    latitude: "",
                    longitude: ""
                  },
                  timezone: {
                    offset: "",
                    description: ""
                  },
                  picture_large: null,
                  picture_thumbnail: null,
                  picture_medium: null,
                  region: "",
                  bg_color: (color as HTMLInputElement).value,
                
                };

            
                teachers.unshift(newTeacher);
                createTeachersList(teachers); 
                addTeacherCartInfo(teachers);
                // Show notification
                showNotification('Викладача додано!');

                
                form.reset();
                teacherForm.classList.add('hidden');
                overlay.classList.add('hidden');
                (overlay as HTMLElement).style.display = "none";

                console.log(newTeacher);

   
                //POST request
                fetch('http://localhost:3000/teachers', {
                  method: 'POST',
                  headers: {
                      'Content-Type': 'application/json'
                  },
                  body: JSON.stringify(newTeacher)
                })
                .then(response => response.json())
                .then(data => {
                    console.log('Success:', data);
                })
            });
        }
    });
}
// Function to show notification
function showNotification(message: string): void {
    const notification: HTMLElement | null = document.querySelector('#notification');
    if (notification) {
        notification.textContent = message;
        notification.classList.remove('hidden');
        notification.style.display = 'block';

        // Hide the notification after 3 seconds
        setTimeout(() => {
            notification.classList.add('hidden');
            notification.style.display = 'none';
        }, 3000);
    }
}

  function toggleMenu(): void {
    const menu: Element | null = document.querySelector(".menu-links");
    const icon: Element | null = document.querySelector(".hamburger-icon");

    menu?.classList.toggle("open");
    icon?.classList.toggle("open");
  }
  function searchForTeacher(teachers: FormattedUser[]): void {
    const searchButton: Element | null = document.querySelector('.search-btn');
    const searchInput: HTMLInputElement | null = document.querySelector('.input-look-for-teacher');

    if (!searchButton || !searchInput) return;

    const handleSearch = () => {
        const searchQuery = searchInput.value.trim();

        // Create a regex pattern to match names starting with the search query (case insensitive)
        const searchRegex = new RegExp(`^${searchQuery}`, 'i');

        let searchResults: FormattedUser[] = (!searchQuery || searchQuery === '*') 
            ? teachers 
            : teachers.filter(teacher => {
                // Check if the teacher's full name matches the regex
                return searchRegex.test(teacher.full_name);
            });

        // Clear previous search results
        const teachersContainers: NodeListOf<Element> = document.querySelectorAll(".teachers-list-container");
        teachersContainers.forEach(container => {
            const existingList = container.querySelector('.teachers-list');
            if (existingList) {
                existingList.remove();
            }
        });

        // Create the new list based on search results
        createTeachersList(searchResults);
        addTeacherCartInfo(teachers);
        
        // Hide arrows if less than 10 results found
        const arrows = document.querySelectorAll('.material-icons');
        if (searchResults.length < 10) {
            arrows.forEach(arrow => {
                arrow.classList.add('hidden');
            });
        } else {
            arrows.forEach(arrow => {
                arrow.classList.remove('hidden');
            });
        }

        console.log(searchResults);
    };

    searchInput.addEventListener('keypress', function (event) {
        if (event.key === 'Enter') {
            handleSearch();
        }
    });

    searchButton.addEventListener('click', handleSearch);
}






let teachers: any[] = [];

loadInitialTeachers();

  window.addEventListener('click', function () {
    const dropdowns: NodeListOf<Element> = document.querySelectorAll('.dropdown-content');
    dropdowns.forEach(dropdown => {
      dropdown.classList.remove('show');
    });

    const hamburgerIcon: Element | null = document.querySelector('.hamburger-icon');
    hamburgerIcon?.addEventListener('click', toggleMenu);
  });
});