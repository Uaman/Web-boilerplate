import path from "node:path";
import { randomUUID } from "node:crypto";
import { UserDataClass } from "../src/data/class/user-data.class.js";
import { userNormalizeDataUtil } from "../src/data/util/user-normalize-data.util.js";
import { userValidateDataUtil } from "../src/data/util/user-validate-data.util.js";
import { createRequire } from "node:module";
const require = createRequire(import.meta.url);
const jsonServer = require("json-server");

const dbFile = path.resolve("server/db.json");
const server = jsonServer.create();
const router = jsonServer.router(dbFile);
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(jsonServer.bodyParser);

server.post("/api/add-teacher", (req, res) => {
    const id = randomUUID();
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
        age: req.body?.age ?? null
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

server.use(router);
server.listen(3001);
