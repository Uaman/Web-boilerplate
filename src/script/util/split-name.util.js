export const splitNameUtil = (str) => {
    if (str == null) {
        return [];
    }
    return str.trim().split(/\s+/);
};
