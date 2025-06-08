import { Request, Response } from "express";


export interface IStuffController {
  getAllStuffs(req: Request, res: Response): Promise<void>;
  getStuffById(req: Request, res: Response): Promise<void>;
  createStuff(req: Request, res: Response): Promise<void>;
  increaseQuantity(req: Request, res: Response): Promise<void>;
  decreaseQuantity(req: Request, res: Response): Promise<void>;
  updateStuff(req: Request, res: Response): Promise<void>;
}
