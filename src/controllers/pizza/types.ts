import { Request, Response } from "express";

export interface PizzaControllerInterface {
  createPizza: (req: Request, res: Response) => Promise<void>;
  getPizzas: (req: Request, res: Response) => Promise<void>;
  updatePizza: (req: Request, res: Response) => Promise<void>;
  getPizzaById: (req: Request, res: Response) => Promise<void>;
  addStuffingToPizza: (req: Request, res: Response) => Promise<void>;
  removeStuffingFromPizza: (
    req: Request,
    res: Response
  ) => Promise<void>;
  getPizzaPrice: (req:Request, res:Response) => Promise<void>;
}
