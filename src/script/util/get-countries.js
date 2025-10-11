import usersValidated from "../../data/users-validated.json" with { type: "json" };

export const getCountries = () => {
    return Array.from(new Set(usersValidated.users.map(u => u.country)));
};
