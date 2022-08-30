import { Router } from 'express';
import carsRouter from './carsRoute';
import motorcyclesRouter from './motoRoute';

const Routers = Router();
Routers.use('/cars', carsRouter);
Routers.use('/motorcycles', motorcyclesRouter);

export default Routers;