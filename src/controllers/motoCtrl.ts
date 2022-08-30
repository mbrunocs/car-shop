import { Request, Response } from 'express';
import { IMotorcycle } from '../interfaces/IMotorcycle';
import { IService } from '../interfaces/IServices';

class MotorcController {
  constructor(private motorcService: IService<IMotorcycle>) { }

  public registerMotorC = async (req:Request, res:Response) => {
    const newMotorc = await this.motorcService.create(req.body);
    return res.status(201).json(newMotorc);
  };

  public showMotorC = async (_req:Request, res:Response) => {
    const listMotorcs = await this.motorcService.read();
    return res.status(200).json(listMotorcs);
  };

  public getMotorC = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      const motorc = await this.motorcService.readOne(id);
      return res.status(200).json(motorc);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(404)
          .json({ error: error.message });
      }
      // next(error);
    }
  };

  public updateMotorC = async (req:Request, res:Response) => {
    const motorcId = req.params.id as string;
    const newDataMotorc = req.body as IMotorcycle;
    try {
      const motorc = await this.motorcService.update(motorcId, newDataMotorc);
      return res.status(200).json(motorc);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(404)
          .json({ error: error.message });
      }
      // next(error);
    }
  };

  public deleteMotorC = async (req:Request, res:Response) => {
    const motorcId = req.params.id as string;
    try {
      await this.motorcService.delete(motorcId);
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

export default MotorcController; 