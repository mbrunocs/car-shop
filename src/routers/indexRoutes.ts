import * as express from 'express';
import carsRouter from './cars';

const Routers = express.Router();
Routers.use('/cars', carsRouter);

export default Routers;