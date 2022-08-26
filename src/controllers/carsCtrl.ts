import { Request, Response } from 'express';

const t = async (_req: Request, res: Response) => {
  console.log();
  return res.status(200).json();
};

export default {
  t,
};