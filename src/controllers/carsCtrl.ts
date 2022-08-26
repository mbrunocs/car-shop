import { Request, Response } from 'express';
import { ICar } from '../interfaces/ICar';
import CarService from '../services/carServices';
import Cars from '../models/carModel';

const cars = new Cars();
const carServices = new CarService(cars);

export const registerCar = async (req: Request, res: Response) => {
  const car = req.body as ICar;
  const newCar = await carServices.create(car);

  return res.status(201).json(newCar);
};

export const lint = {};