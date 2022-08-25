import { Router } from 'express';
import carsRouter from './cars';
import motorcyclesRouter from './motorcycles';

const Routers = Router();
Routers.use('/cars', carsRouter);
Routers.use('/motorcycles', motorcyclesRouter);

export default Routers;