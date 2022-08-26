import { NextFunction, Request, Response } from 'express';
import { validationCar } from '../interfaces/ICar';

const verifyCar = (req: Request, res: Response, next: NextFunction) => {
  const result = validationCar.safeParse(req.body);

  if (result.success) return next();
  return res.status(400).end();
};

export default verifyCar;