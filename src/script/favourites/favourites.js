import usersValidated from "../../data/users-validated.json" with { type: "json" };
import { renderFavourites } from './render-favourites.js';

document.addEventListener("components:loaded", () => {
    renderFavourites(usersValidated.users);
});
