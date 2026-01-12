import { isNil, isObject } from 'lodash-es';
import { yearsPassedUtil } from './helper/years-passed.util.js';
import { getRandomCourseUtil } from './helper/get-random-course.util.js';
import { UserDataClass } from '../class/user-data.class.js';
import { capitalizeFirstCharUtil } from "./helper/capitalize-first-char.util.js";
import { phoneNormalizeUtil } from "./normalize/phone-normalization.util.js";

const normalizeName = (user) => {
    if(!isNil(user?.name)) {
        return {
            title: capitalizeFirstCharUtil(user.name.title),
            full_name: capitalizeFirstCharUtil(user.name.first) + ' ' + capitalizeFirstCharUtil(user.name.last),
        };
    }
    return {
        title: capitalizeFirstCharUtil(user.title) ?? null,
        full_name: capitalizeFirstCharUtil(user.full_name) ?? null,
    };
};

const normalizeLocation = (user) => {
    if(!isNil(user?.location)) {
        return {
            city: capitalizeFirstCharUtil(user.location.city),
            state: capitalizeFirstCharUtil(user.location.state),
            country: capitalizeFirstCharUtil(user.location.country),
            coordinates: user.location.coordinates,
            timezone: user.location.timezone,
            postcode: user.location.postcode,
        };
    }
    return {
        city: capitalizeFirstCharUtil(user?.city) ?? null,
        state: capitalizeFirstCharUtil(user?.state) ?? null,
        country: capitalizeFirstCharUtil(user?.country) ?? null,
        coordinates: user?.coordinates ?? null,
        timezone: user?.timezone ?? null,
        postcode: user?.postcode ?? null,
    };
};

const normalizeBDateAndAge = (user) => {
   if(!isNil(user?.dob)) {
       return {
           b_date: new Date(user.dob.date),
           age: user.dob.age
       };
   }
   if(!isNil(user?.b_day)) {
       const bDate = new Date(user.b_day);
       return {
           b_date: bDate,
           age: yearsPassedUtil(bDate)
       };
   }
   return {b_date: null, age: null};
};

const normalizePicture = (user) => {
   if(!isNil(user?.picture)) {
       return {
           picture_large: user.picture.large,
           picture_thumbnail: user.picture.thumbnail
       };
   }
   return {
       picture_large: user?.picture_large ?? null,
       picture_thumbnail: user?.picture_thumbnail ?? null
   };
};

const normalizeId = (user) => {
    if(!isNil(user?.id) && isObject(user.id)) {
        return {
            id: user.id.name + user.id.value,
        };
    }
    return {
        id: user?.id ?? null,
    };
};

const normalizePhone = (user) => {
    if(!isNil(user?.location)) {
        return {
            phone: phoneNormalizeUtil(user.phone, user.location?.country)
        };
    }
    return {
        phone: phoneNormalizeUtil(user?.phone, user?.country) ?? null,
    };
};

export const userNormalizeDataUtil = (data) => {
    const users = [];
    data.forEach((user) => {
        const normalized = new UserDataClass({
            gender: capitalizeFirstCharUtil(user?.gender) ?? null,
            email: user?.email ?? null,
            ...normalizePhone(user),
            ...normalizeName(user),
            ...normalizeLocation(user),
            ...normalizeBDateAndAge(user),
            ...normalizePicture(user),
            ...normalizeId(user),
            course: getRandomCourseUtil(),
            favorite: user?.favorite ?? false,
            bg_color: user?.bg_color ?? null,
            note: capitalizeFirstCharUtil(user?.note) ?? null,
        });
        users.push(normalized);
    });
    return users;
};
