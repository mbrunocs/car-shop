import { Request, Response } from 'express';
import { ICar } from '../interfaces/ICar';
// import CarService from '../services/carServices';
// import Cars from '../models/carModel';
import { IService } from '../interfaces/IServices';

class CarController {
  constructor(private carService: IService<ICar>) { }

  public registerCar = async (req:Request, res:Response) => {
    const newCar = await this.carService.create(req.body);
    return res.status(201).json(newCar);
  };

  public showCars = async (_req:Request, res:Response) => {
    const listCars = await this.carService.read();
    return res.status(200).json(listCars);
  };

  public getCar = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      const car = await this.carService.readOne(id);
      return res.status(200).json(car);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(404)
          .json({ error: error.message });
      }
      // next(error);
    }
  };

  public updateCar = async (req:Request, res:Response) => {
    const carId = req.params.id as string;
    const newDataCar = req.body as ICar;
    try {
      const car = await this.carService.update(carId, newDataCar);
      return res.status(200).json(car);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(404)
          .json({ error: error.message });
      }
      // next(error);
    }
  };

  public deleteCar = async (req:Request, res:Response) => {
    const carId = req.params.id as string;
    try {
      await this.carService.delete(carId);
      return res.status(204).end(); 
    } catch (error) {
      if (error instanceof Error) {
        return res.status(404)
          .json({ error: error.message });
      }
      // next(error);
    }
  };
}

export default CarController; 