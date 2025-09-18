const cources = [
    'Mathematics',
    'Physics',
    'English',
    'Computer Science',
    'Dancing',
    'Chess',
    'Biology',
    'Chemistry',
    'Law',
    'Art',
    'Statistics',
    'Medicine'
];

export const getRandomCourseUtil = () => cources[Math.floor(Math.random() * cources.length)];
