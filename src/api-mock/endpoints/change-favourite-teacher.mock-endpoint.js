import fs from 'node:fs';
import path from 'node:path';

export const registerChangeFavouriteTeacher = (server, dataFile = 'src/data/users-validated.json') => {
    const dataPath = path.resolve(process.cwd(), dataFile);

    server.middlewares.use('/api/change-favourite', async (req, res, next) => {
        if (req.method !== 'POST') return next();
        try {
            let body = '';
            for await (const chunk of req) body += chunk;

            const { id, value } = JSON.parse(body || '{}');
            const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));

            const user = data.users.find(u => String(u.id) === String(id));
            if (!user) {
                res.statusCode = 404;
                res.setHeader('Content-Type','application/json');
                res.end(JSON.stringify({ ok:false, error:'User not found' }));
                return;
            }

            user.favorite = !!value;
            fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));

            res.setHeader('Content-Type','application/json');
            res.end(JSON.stringify({ ok:true, id, value: user.favorite }));
        } catch (err) {
            res.statusCode = 500;
            res.setHeader('Content-Type','application/json');
            res.end(JSON.stringify({ ok:false, error:String(err?.message || err) }));
        }
    });
};
