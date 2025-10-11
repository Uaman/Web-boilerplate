export const courses = [
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

export const getRandomCourseUtil = () => courses[Math.floor(Math.random() * courses.length)];
