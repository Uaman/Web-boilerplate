# Lab 6 – React weather dashboard

```bash
cd lab6
npm install
npm run dev     # http://localhost:5173
```

Login and password: `roman3` (name + course number, see `src/auth.js`).

- `/login` – sign-in form with field validation and an error for wrong credentials.
- `/dashboard` – 5-day forecast from [Open-Meteo](https://open-meteo.com/) (MetaWeather is shut down) for the browser geolocation, or Kyiv if geolocation is denied.
- The session is stored in the `auth_user` cookie; opening `/dashboard` without it redirects to `/login`.
