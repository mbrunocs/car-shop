import * as zod from 'zod';
import { validationVehicle } from './IVehicle';

export const validationCar = validationVehicle.extend({
  doorsQty: zod.number().gte(2).lte(4),
  seatsQty: zod.number().gte(2).lte(7),
});

export type ICar = zod.infer<typeof validationCar>;