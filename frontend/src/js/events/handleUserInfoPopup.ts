import { StoredUser } from '../types/FormattedUser';

export function setInfoPopupContent(user: StoredUser): void {
	const currentFavoriteStatus = user.favorite;
	const container = document.getElementById('info-popup-body');
	const teacherInfoPopup = document.getElementById('teacher-info-popup') as HTMLDialogElement;
	const closeTeacherInfoPopupBtn = document.getElementById('close-teacher-info-button') as HTMLButtonElement;

	function hideTeacherInfoPopup() {
		if (user.favorite !== currentFavoriteStatus) {
			const requestOptions = {
				method: 'PUT',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ userId: user._id, favorite: user.favorite }),
			};

			fetch('http://localhost:3030/api/user/favorite', requestOptions).then((response) => {
				if (response.ok) {
					console.log('User favorite status updated');
				} else {
					console.error('Failed to update user favorite status' + response);
				}
			});
		}

		closeTeacherInfoPopupBtn.removeEventListener('click', hideTeacherInfoPopup);
		teacherInfoPopup.close();
	}

	closeTeacherInfoPopupBtn.addEventListener('click', hideTeacherInfoPopup);

	if (!container) {
		console.error('Container not found');
		return;
	}

	container.innerHTML = '';

	const contactInfo = document.createElement('div');
	contactInfo.classList.add('teacher-info-contact-details');
	contactInfo.innerHTML = `
		<img src="${user.picture_large ?? './images/patrick.png'}" alt="Teacher photo" />
		<article>
			<div class="headline">
				<h2>${user.full_name}</h2>
				<img src="${
					user.favorite ? './images/star.png' : './images/star_outline.png'
				}" alt="Favorite" class="favorite-icon" id="favorite-button"/>
			</div>
			<h4>${user.course}</h4>
			<p>${user.city}, ${user.country}</p>
			<p>${user.age}, ${user.gender}</p>
			<a href="mailto:${user.email}">${user.email}</a>
			<p>${user.phone}</p>
		</article>
	`;

	const note = document.createElement('p');
	note.innerText = user.note;

	const mapLink = document.createElement('a');
	mapLink.classList.add('teacher-info-toggle-map');
	mapLink.href = user.coordinates
		? `https://www.google.com/maps/search/?api=1&query=${user.coordinates.latitude},${user.coordinates.longitude}`
		: '#';
	mapLink.innerText = 'Toggle map';

	container.appendChild(contactInfo);
	container.appendChild(note);
	container.appendChild(mapLink);

	const favoriteButton = document.getElementById('favorite-button') as HTMLImageElement;
	favoriteButton?.addEventListener('click', () => {
		console.log('Favorite button clicked');
		user.favorite = !user.favorite;
		const favoritesContainer = document.getElementById('favorites-slider-container');
		const userCardFavorite = document.getElementById(`favorite-${user._id}`);
		const userCard = document.getElementById(user._id.toString());

		if (user.favorite) {
			favoriteButton.src = './images/star.png';
			favoriteButton.alt = 'Favorite';
			const favoriteCard = userCard?.cloneNode(true) as HTMLDivElement;
			favoriteCard.id = `favorite-${user._id}`;
			favoritesContainer.appendChild(favoriteCard);
		} else {
			favoriteButton.src = './images/star_outline.png';
			favoriteButton.alt = 'Not Favorite';
			favoritesContainer.removeChild(userCardFavorite);
		}
		userCard?.classList.toggle('favorite');
	});
}

export function handleUserInfoPopup(users: StoredUser[]): void {
	const teachersGrid = document.getElementById('teachers-grid');
	const favoriteTeachersSlider = document.getElementById('favorites-slider-container');
	const teacherInfoPopup = document.getElementById('teacher-info-popup') as HTMLDialogElement;

	function showTeacherInfoPopup(id: string) {
		const teacher = users.find((user) => user._id.toString() === id);
		setInfoPopupContent(teacher);

		teacherInfoPopup.showModal();
	}

	teachersGrid.addEventListener('click', (event) => {
		const target = event.target as HTMLElement;

		const teacherCard = target.closest('.teacher-card');

		if (teacherCard) {
			const id = teacherCard.id;
			showTeacherInfoPopup(id);
		}
	});

	favoriteTeachersSlider.addEventListener('click', (event) => {
		const target = event.target as HTMLElement;

		const teacherCard = target.closest('.teacher-card');

		if (teacherCard) {
			const id = teacherCard.id.slice(9);
			showTeacherInfoPopup(id);
		}
	});
}
