import path from "node:path";
import { randomUUID } from "node:crypto";
import { UserDataClass } from "../src/data/class/user-data.class.js";
import { userNormalizeDataUtil } from "../src/data/util/user-normalize-data.util.js";
import { userValidateDataUtil } from "../src/data/util/user-validate-data.util.js";
import { createRequire } from "node:module";
const require = createRequire(import.meta.url);
const jsonServer = require("json-server");
import { getCountryGeoJSONByAlpha2 } from "geojson-places";
import countries from "i18n-iso-countries";
import enLocale from "i18n-iso-countries/langs/en.json" with { type: "json" };
import centroid from '@turf/centroid';

const dbFile = path.resolve("server/db.json");
const server = jsonServer.create();
const router = jsonServer.router(dbFile);
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(jsonServer.bodyParser);

countries.registerLocale(enLocale);

server.post("/api/add-teacher", (req, res) => {
    const id = randomUUID();
    console.log(req.body.b_date);
    const u = new UserDataClass({
        id,
        full_name: req.body?.full_name ?? "",
        course: req.body?.course ?? "",
        country: req.body?.country ?? "",
        city: req.body?.city ?? "",
        email: req.body?.email ?? "",
        phone: req.body?.phone ?? "",
        gender: req.body?.gender ?? "",
        note: req.body?.note ?? "",
        favorite: false,
        picture_large: req.body?.bg_color
            ? `https://singlecolorimage.com/get/${String(req.body.bg_color).replace("#","")}/100x100`
            : null,
        age: req.body?.age ?? null,
        b_date: new Date(req.body.b_date),
    });
    router.db.get("users").push(u).write();
    res.json({ ok: true, user: u });
});

server.post("/api/change-favourite", (req, res) => {
    const id = String(req.body?.id ?? "");
    const val = !!req.body?.value;
    const found = router.db.get("users").find({ id }).value();
    if (!found) return res.status(404).json({ ok: false, error: "User not found" });
    router.db.get("users").find({ id }).assign({ favorite: val }).write();
    res.json({ ok: true, id, value: val });
});

server.post("/api/teachers/random", async (req, res) => {
    const amount = Number(req.body?.amount ?? 10);
    const raw = await (await fetch(`https://randomuser.me/api?results=${amount}`)).json();
    const normalized = userNormalizeDataUtil(raw.results);
    const validated = userValidateDataUtil(normalized);
    router.db.get("users").push(...validated.users).write();
    router.db.get("changedIds").push(...validated.changedIds).write();
    res.json({ ok: true, added: validated.users.length });
});

server.get("/api/users", (req, res) => {
    const users = router.db.get("users").value();
    res.json({ users });
});

server.get("/api/get-country-coords", (req, res) => {
    try {
        const raw = String(req.query.country || "").trim();
        if (!raw) return res.status(400).json({ ok: false, error: "Missing country name" });

        const aliases = { UK: "United Kingdom", USA: "United States" };
        const name = aliases[raw] || raw;

        const alpha2 = /^[A-Za-z]{2}$/.test(name) ? name.toUpperCase() : countries.getAlpha2Code(name, "en");
        if (!alpha2) return res.status(404).json({ ok: false, error: "Country not found" });

        const geo = getCountryGeoJSONByAlpha2(alpha2);
        const feature =
            geo?.type === "Feature" ? geo :
                geo?.type === "FeatureCollection" ? geo.features?.[0] : null;

        if (!feature) return res.status(404).json({ ok: false, error: "GeoJSON not found" });

        const center = centroid(feature);
        const [lon, lat] = center.geometry.coordinates;

        res.json({ ok: true, country: name, alpha2, coords: [lat, lon] });
    } catch (err) {
        console.error("Country geocode error:", err);
        res.status(500).json({ ok: false, error: "Internal server error" });
    }
});

server.use(router);
server.listen(3001);
