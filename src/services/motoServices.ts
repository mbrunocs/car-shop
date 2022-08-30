import { IModel } from '../interfaces/IModel';
import { IMotorcycle } from '../interfaces/IMotorcycle';

class MotorCService implements IModel<IMotorcycle> {
  private _motorc:IModel<IMotorcycle>;
  constructor(model:IModel<IMotorcycle>) {
    this._motorc = model;
  }

  public async create(obj:IMotorcycle):Promise<IMotorcycle> {
    return this._motorc.create(obj);
  }

  public async read(): Promise<IMotorcycle[]> {
    const cars = await this._motorc.read();
    return cars;
  }

  public async readOne(_id:string):Promise<IMotorcycle> {
    const car = await this._motorc.readOne(_id);
    if (!car) throw new Error('Object not found');
    return car;
  }

  public async update(_id:string, obj:IMotorcycle):Promise<IMotorcycle | null> {
    await this.readOne(_id);
    return this._motorc.update(_id, obj);
  }

  public async delete(_id:string):Promise<IMotorcycle> {
    await this.readOne(_id);
    const reponse = await this._motorc.delete(_id);
    if (!reponse) throw new Error('not found');
    return reponse;
  }
}

export default MotorCService;