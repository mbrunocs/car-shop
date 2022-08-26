import { Router } from 'express';
import verifyCar from '../middlewares/verifiryCars';

const router = Router();

router.post('/', verifyCar);

export default router;