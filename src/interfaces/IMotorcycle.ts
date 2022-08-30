import * as zod from 'zod';
import { validationVehicle } from './IVehicle';

export const validationMotorC = validationVehicle.extend({
  category: zod.enum(['Street', 'Custom', 'Trail']),
  engineCapacity: zod.number().gte(0).lte(2500).int(),
});

export type IMotorcycle = zod.infer<typeof validationMotorC>;
