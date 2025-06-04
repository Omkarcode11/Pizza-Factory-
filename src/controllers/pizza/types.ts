import { Request, Response } from "express";
import { PizzaDto, PizzaInstance } from "../../service/pizza/types";

interface PizzaPriceDto {
  pizzaId: string;
  basePrice: number;
  stuffingPrice: number;
  totalPrice: number;
}

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
