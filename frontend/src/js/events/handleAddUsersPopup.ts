import { StoredUser } from '../types/FormattedUser';
import { parsePhoneNumberFromString, CountryCode } from 'libphonenumber-js';
import countries from 'i18n-iso-countries';

countries.registerLocale(require('i18n-iso-countries/langs/en.json'));

export function handleAddUsersPopup(): void {
	const addTeacherBtns = document.querySelectorAll(
		'.btn[data-target="add-teacher-popup"]',
	) as NodeListOf<HTMLButtonElement>;
	const addTeacherPopup = document.getElementById('add-teacher-popup') as HTMLDialogElement;
	const closePopupButton = document.getElementById('close-add-teacher-button');
	const form = document.querySelector('.add-teacher-form') as HTMLFormElement;

	closePopupButton.addEventListener('click', () => {
		addTeacherPopup.close();
	});

	addTeacherBtns.forEach((button) => {
		button.addEventListener('click', () => {
			addTeacherPopup.showModal();
		});
	});

	form.addEventListener('submit', async (event) => {
		event.preventDefault();

		if (!form.checkValidity()) {
			form.reportValidity();
			return;
		}

		const formData = new FormData(form);

		const formObject = Object.fromEntries(formData.entries()) as Partial<StoredUser>;
		formObject.age = new Date().getFullYear() - new Date(formObject.b_day).getFullYear();
		formObject.favorite = false;

		console.log('Adding teacher:', formObject);
		try {
			const response = await fetch('http://localhost:3030/api/user/new', {
				method: 'POST',
				body: JSON.stringify(formObject),
				headers: {
					'Content-Type': 'application/json',
				},
			});

			if (response.ok) {
				console.log('Teacher added successfully');
				addTeacherPopup.close();
				form.reset();
				location.reload();
			} else {
				const errorData = await response.json();
				console.error('Failed to add teacher:', errorData);
			}
		} catch (error) {
			console.error('Error sending teacher data:', error);
		}
	});
}
