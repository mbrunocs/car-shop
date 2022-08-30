import { Router } from 'express';
import MotorcycleModel from '../models/motoModel';
import MotorCService from '../services/motoServices';
import MotorcController from '../controllers/motoCtrl';
import {
  verifyMotorC,
  verifyMotorCId,
  verifyUpdateMotorCId } from '../middlewares/verifyMoto';

const router = Router();

const model = new MotorcycleModel();
const service = new MotorCService(model);
const ctrl = new MotorcController(service);

router.post('/', verifyMotorC, ctrl.registerMotorC);
router.get('/', ctrl.showMotorC);
router.get('/:id', verifyMotorCId, ctrl.getMotorC);
router.put('/:id', verifyMotorCId, verifyUpdateMotorCId, ctrl.updateMotorC);
router.delete('/:id', verifyMotorCId, ctrl.deleteMotorC);

export default router;