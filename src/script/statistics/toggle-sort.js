export const toggleSort = (sort, sortByValue) => {
    if (sort.sortBy !== sortByValue) {
        return { sortBy: sortByValue, order: "asc" };
    } else if (sort.order === "asc") {
        return { sortBy: sortByValue, order: "desc" };
    } else {
        return { sortBy: null, order: null };
    }
};
