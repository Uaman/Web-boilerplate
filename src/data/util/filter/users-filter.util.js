import { isArray, isNil, keys } from 'lodash-es';

const filter_fields = ['countries', 'genders', 'favorites', 'ageRange'];

export const parseFilter = (filter = {}) => {
    if (!keys(filter).every(k => filter_fields.includes(k))) return null;

    const countries = isArray(filter.countries) ? filter.countries : [];
    const genders   = isArray(filter.genders)   ? filter.genders   : [];
    const favorites = isArray(filter.favorites) ? filter.favorites : [];

    const ar = filter.ageRange ?? {};
    const minNum = Number(ar.min);
    const maxNum = Number(ar.max);
    const ageRange = {
        min: isFinite(minNum) ? minNum : 0,
        max: isFinite(maxNum) ? maxNum : 999,
    };

    return { countries, genders, favorites, ageRange };
};

export const usersFilterUtil = (users, filter = {}) => {
    const parsedFilter = parseFilter(filter);
    if (isNil(parsedFilter)) return users;

    const { countries, genders, favorites, ageRange } = parsedFilter;

    return users.filter((user) => {
        const ageOk      = user.age >= ageRange.min && user.age <= ageRange.max;
        const genderOk   = genders.length   ? genders.includes(user.gender)   : true;
        const countryOk  = countries.length ? countries.includes(user.country) : true;
        const favoriteOk = favorites.length ? favorites.includes(user.favorite) : true;

        return ageOk && genderOk && countryOk && favoriteOk;
    });
};
