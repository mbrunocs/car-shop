import { model as createModel, Schema } from 'mongoose';
import { ICar } from '../interfaces/ICar';
import MongoModel from './MongoModel';

const carSchema = new Schema<ICar>({
  model: String,
  year: Number,
  color: String,
  status: Boolean,
  buyValue: Number,
  doorsQty: Number,
  seatsQty: Number,
}, { versionKey: false });

class Cars extends MongoModel <ICar> {
  constructor(model = createModel('Cars', carSchema)) {
    super(model);
  }
}

export default Cars;