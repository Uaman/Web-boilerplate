import fs from "node:fs";
import path from "node:path";
import { randomUUID } from "node:crypto";
import { UserDataClass } from '../../data/class/user-data.class.js';

const dataPath = path.resolve("src/data/users-validated.json");

export const registerAddTeacher = (server) => {
    server.middlewares.use("/api/add-teacher", async (req, res, next) => {
        if (req.method !== "POST") return next();

        try {
            let body = "";
            for await (const chunk of req) body += chunk;

            const data = JSON.parse(body || "{}");
            if (!data.full_name) {
                res.statusCode = 400;
                res.end(JSON.stringify({ ok: false, error: "Missing name" }));
                return;
            }

            const json = JSON.parse(fs.readFileSync(dataPath, "utf8"));
            const id = randomUUID();

            const newTeacher = new UserDataClass({
                id,
                full_name: data.full_name,
                course: data.course ?? "",
                country: data.country ?? "",
                city: data.city ?? "",
                email: data.email ?? "",
                phone: data.phone ?? "",
                gender: data.gender ?? "",
                note: data.note ?? "",
                favorite: false,
                picture_large: `https://singlecolorimage.com/get/${data.bg_color.replace("#", "")}/100x100`,
                age: data.age ?? "",
            });

            json.users.push(newTeacher);
            fs.writeFileSync(dataPath, JSON.stringify(json, null, 2), "utf8");

            console.log(`[mock] Added teacher: ${newTeacher.full_name} (${id})`);

            res.setHeader("Content-Type", "application/json");
            res.end(JSON.stringify({ ok: true, user: newTeacher }));
        } catch (err) {
            res.statusCode = 500;
            res.end(JSON.stringify({ ok: false, error: String(err.message) }));
        }
    });
};
