import { isValidObjectId } from 'mongoose';
import { NextFunction, Request, Response } from 'express';
import { validationMotorC } from '../interfaces/IMotorcycle';

const ERROR_INVALID_ID = 'Id must have 24 hexadecimal characters';

export const
  verifyMotorC = (req: Request, res: Response, next: NextFunction) => {
    const result = validationMotorC.safeParse(req.body);

    if (result.success) return next();
    return res.status(400).end();
  };

export const
  verifyMotorCId = (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    if (isValidObjectId(id)) return next();
    return res
      .status(400)
      .json({ error: ERROR_INVALID_ID });
  };

export const
  verifyUpdateMotorCId = (req: Request, res: Response, next: NextFunction) => {
    if (Object.keys(req.body).length > 0) return next();
    return res.status(400).end();
  };