import express from 'express';
import routes from './routers/indexRoutes';

const app = express();
app.get('/', (_req, res) => res.json({ ok: true }));
app.use(routes);

export default app;
