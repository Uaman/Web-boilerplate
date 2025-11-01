import { has, isDate, isNumber, isObject, isString } from 'lodash-es';

export class UserDataClass {
    constructor({
        gender,
        title,
        full_name,
        city,
        state,
        country,
        postcode,
        coordinates,
        timezone,
        email,
        b_date,
        age,
        phone,
        picture_large,
        picture_thumbnail,
        id,
        favorite,
        course,
        bg_color,
        note
    }) {
        this.gender = isString(gender) && gender !== '' ? gender : null;
        this.title = isString(title) && title !== '' ? title : null;
        this.full_name = isString(full_name) && full_name !== '' ? full_name : null;
        this.city = isString(city) && city !== '' ? city : null;
        this.state = isString(state) && state !== '' ? state : null;
        this.country = isString(country) && country !== '' ? country : null;
        this.postcode = postcode ?? null;
        this.coordinates = (isObject(coordinates) && has(coordinates, 'latitude') && has(coordinates, 'longitude')) ? coordinates : { latitude: null, longitude: null };
        this.timezone = (isObject(timezone) && has(timezone, 'offset') && has(timezone, 'description')) ? timezone : { offset: null, description: null };
        this.email = (isString(email) && email !== '') ? email : null;
        this.b_date = isDate(b_date) ? b_date : null;
        this.age = isNumber(age) ? age : null;
        this.phone = (isString(phone) && phone !== '') ? phone : null;
        this.picture_large = (isString(picture_large) && picture_large !== '') ? picture_large : null;
        this.picture_thumbnail = (isString(picture_thumbnail) && picture_thumbnail !== '') ? picture_thumbnail : null;
        this.id = (isString(id) && id !== '') ? id : null;
        this.favorite = Boolean(favorite);
        this.course = (isString(course) && course !== '') ? course : null;
        this.bg_color = (isString(bg_color) && bg_color !== '') ? bg_color : null;
        this.note = (isString(note) && note !== '') ? note : '';
    }
}

