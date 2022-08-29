import { ICar } from '../interfaces/ICar';
import { IModel } from '../interfaces/IModel';
// import { ErrorTypes } from '../errors/catalog';

class CarService implements IModel<ICar> {
  // quando fazemos IService<IFrame> acima 
  // estamos implementando a interface com o tipo IFrame com o parâmetro genérico
  private _car:IModel<ICar>;
  // o mesmo fazemos aqui com a interface do Model
  constructor(model:IModel<ICar>) {
    this._car = model;
  }

  public async create(obj:ICar):Promise<ICar> {
    // throw parsed.error; // vamos falar sobre como esse erro tratá-lo logo logo
    return this._car.create(obj);
  }

  public async read(): Promise<ICar[]> {
    const cars = await this._car.read();
    return cars;
  }

  public async readOne(_id:string):Promise<ICar> {
    const car = await this._car.readOne(_id);
    if (!car) throw new Error('Object not found'); // ErrorTypes.EntityNotFound
    return car;
  }

  public async update(_id:string, obj:ICar):Promise<ICar | null> {
    await this.readOne(_id);
    return this._car.update(_id, obj);
  }

  public async delete(_id:string):Promise<ICar> {
    await this.readOne(_id);
    const reponse = await this._car.delete(_id);
    if (!reponse) throw new Error('not found');
    return reponse;
  }
}

export default CarService;