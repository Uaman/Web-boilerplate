export const initials = (str) => {
    return str.trim()
        .split(/\s+/)
        .map(word => word[0].toLocaleUpperCase() + ".")
        .join(" ");
};
