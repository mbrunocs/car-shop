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

export const showCars = async (req: Request, res: Response) => {
  const listCars = await carServices.read();
  
  return res.status(200).json(listCars);
};

export const getCar = async (req: Request, res: Response) => {
  const carId = req.params.id as string;
  try {
    const car = await carServices.readOne(carId);
    
    return res.status(200).json(car);
  } catch (error) {
    if (error instanceof Error) {
      return res.status(404)
        .json({ error: error.message });
    }
  }
};

export const updateCar = async (req: Request, res: Response) => {
  const carId = req.params.id as string;
  const newDataCar = req.body as ICar;
  try {
    const car = await carServices.update(carId, newDataCar);
    return res.status(200).json(car);
  } catch (error) {
    if (error instanceof Error) {
      return res.status(404)
        .json({ error: error.message });
    }
  }
};

export const lint = {};