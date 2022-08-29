import { Router } from 'express';
import { getCar, registerCar, showCars } from '../controllers/carsCtrl';
import { verifyCar, verifyCarId } from '../middlewares/verifyCars';

const router = Router();

router.get('/:id', verifyCarId, getCar);
router.post('/', verifyCar, registerCar);
router.get('/', showCars);

export default router;