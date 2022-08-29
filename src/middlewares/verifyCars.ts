import { isValidObjectId } from 'mongoose';
import { NextFunction, Request, Response } from 'express';
import { validationCar } from '../interfaces/ICar';

const ERROR_INVALID_ID = 'Id must have 24 hexadecimal characters';

export const verifyCar = (req: Request, res: Response, next: NextFunction) => {
  const result = validationCar.safeParse(req.body);

  if (result.success) return next();
  return res.status(400).end();
};

export const
  verifyCarId = (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    if (isValidObjectId(id)) return next();
    return res
      .status(400)
      .json({ error: ERROR_INVALID_ID });
  };

export const
  verifyUpdateCar = (req: Request, res: Response, next: NextFunction) => {
    if (Object.keys(req.body).length > 0) return next();
    return res.status(400).end();
  };