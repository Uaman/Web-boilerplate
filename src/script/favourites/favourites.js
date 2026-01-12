import { renderFavourites } from './render-favourites.js';
import { CustomEvents } from '../events.js';
import { fetchUsers } from '../util/fetch-users.util.js';

document.addEventListener(CustomEvents['components:loaded'], async () => {
    renderFavourites(await fetchUsers());
});

document.addEventListener(CustomEvents['favourites:changed'], async () => {
    await renderFavourites(await fetchUsers());
});
