import { Request, Response } from "express";

export interface ChefControllerInterface {
  getChefs(req: Request, res: Response): Promise<void>;
  getChefById(req: Request, res: Response): Promise<void>;
  createChef(req: Request, res: Response): Promise<void>;
  updateChef(req: Request, res: Response): Promise<void>;
  deleteChef(req: Request, res: Response): Promise<void>;
  getFreeChefs(req: Request, res: Response): Promise<void>; // Get chefs who are not busy
}
