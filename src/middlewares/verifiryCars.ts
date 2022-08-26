import { NextFunction, Request, Response } from 'express';
import { validationCar } from '../interfaces/ICar';

// const isCar = (data: Request) => {
//   const car: ICar = data;
//   return car;
// };

const verifyCar = (req: Request, res: Response, next: NextFunction) => {
  if (validationCar.safeParse(req.body).success) next();
  return res.status(400).end();
};

export default verifyCar;