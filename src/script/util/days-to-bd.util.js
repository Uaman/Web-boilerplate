import dayjs from 'dayjs';

export const daysToBD = (bdate) => {
    const today = dayjs();
    let next = dayjs(bdate).year(today.year());
    if (next.isBefore(today, "day")) next = next.add(1, "year");

    return next.diff(today, "day");
};