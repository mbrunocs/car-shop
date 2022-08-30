import { Router } from 'express';
import CarModel from '../models/carModel';
import CarService from '../services/carServices';
import CarController from '../controllers/carsCtrl';
import { 
  verifyCar,
  verifyCarId,
  verifyUpdateCar } from '../middlewares/verifyCars';

const router = Router();
const model = new CarModel();
const service = new CarService(model);
const ctrl = new CarController(service);

router.get('/:id', verifyCarId, ctrl.getCar);
router.post('/', verifyCar, ctrl.registerCar);
router.get('/', ctrl.showCars);
router.put('/:id', verifyCarId, verifyUpdateCar, ctrl.updateCar);
router.delete('/:id', verifyCarId, ctrl.deleteCar);

export default router;