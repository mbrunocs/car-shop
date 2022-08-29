import { Router } from 'express';
import { 
  deleteCar,
  getCar,
  registerCar,
  showCars,
  updateCar } from '../controllers/carsCtrl';
import { 
  verifyCar,
  verifyCarId,
  verifyUpdateCar } from '../middlewares/verifyCars';

const router = Router();

router.get('/:id', verifyCarId, getCar);
router.post('/', verifyCar, registerCar);
router.get('/', showCars);
router.put('/:id', verifyCarId, verifyUpdateCar, updateCar);
router.delete('/:id', verifyCarId, deleteCar);

export default router;