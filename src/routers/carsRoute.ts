import { Router } from 'express';
import { registerCar } from '../controllers/carsCtrl';
import verifyCar from '../middlewares/verifiryCars';

const router = Router();

router.post('/', verifyCar, registerCar);

export default router;