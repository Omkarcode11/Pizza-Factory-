import { Request, Response } from "express";


export interface OrderControllerInterface {
  createOrder: (req: Request, res: Response) => Promise<void>;
  getOrders: (req: Request, res: Response) => Promise<void>;
  getOrderById: (req: Request, res: Response) => Promise<void>;
  updateOrder: (req: Request, res: Response) => Promise<void>;
  updateOrderStatus: (req: Request, res: Response) => Promise<void>;
}