export const getCountriesUtil = async () => {
    const res = await fetch('/api/users');
    const data = await res.json();
    return Array.from(new Set(data.users.map(u => u.country)));
};

