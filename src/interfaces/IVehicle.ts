import * as zod from 'zod';

export const validationVehicle = zod.object({
  model: zod.string().min(3),
  year: zod.number().gte(1900).lte(2022),
  color: zod.string().min(3),
  status: zod.boolean().optional(),
  buyValue: zod.number().int(),
});

export type IVehicle = zod.infer<typeof validationVehicle>;
