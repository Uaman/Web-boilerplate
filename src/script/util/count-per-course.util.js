export const countPerCourse = (users, courses) => {
    return courses.map(course =>
        users.filter(u => u.course === course).length
    );
};
