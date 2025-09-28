import { FormattedUser } from '../types/FormattedUser';
import { CountryCode, parsePhoneNumberFromString } from 'libphonenumber-js';
import validator from 'validator';
import countries from 'i18n-iso-countries';

countries.registerLocale(require('i18n-iso-countries/langs/en.json'));

export function isValidUser(user: FormattedUser): boolean {
	const stringFields = ['full_name', 'gender', 'note', 'state', 'city', 'country'] as const;
	for (const field of stringFields) {
		const value = user[field];
		if (!value || typeof value !== 'string' || !/^[A-Z]/.test(value.trim())) {
			return false;
		}
	}

	if (typeof user.age !== 'number' || isNaN(user.age)) {
		return false;
	}

	if (!user.email || typeof user.email !== 'string' || !validator.isEmail(user.email)) {
		return false;
	}

	if (!user.phone || !user.country || typeof user.phone !== 'string' || typeof user.country !== 'string') {
		return false;
	}

	const countryCode = countries.getAlpha2Code(user.country.trim(), 'en');

	if (!countryCode) {
		console.warn(`Country "${user.country}" not recognized for phone validation.`);
		return false;
	}

	const phoneNumber = parsePhoneNumberFromString(user.phone, countryCode as CountryCode);
	if (!phoneNumber || !phoneNumber.isValid()) {
		return false;
	}

	return true;
}
