import { Request, Response } from "express";
import Order from "../../models/order.model";
import { OrderService } from "../../service/order/orderService";
import { OrderCreateRequest } from "../../service/order/types";
import PizzaFactoryService from "../../service/pizza/pizzaFactoryService";
import { OrderControllerInterface } from "./types";

export class OrderController implements OrderControllerInterface {
  private orderService: OrderService;
  private productService: PizzaFactoryService;

  constructor(
    orderService?: OrderService,
    productService?: PizzaFactoryService
  ) {
    this.orderService = orderService || new OrderService(Order);
    this.productService = productService || new PizzaFactoryService();
  }

  public async createOrder(req: Request, res: Response): Promise<void> {
    try {
      const { userId, products } = req.body;

      const amount = products.reduce(
        async (total: number, productId: string) => {
          const productDetails = await this.productService.getPizzaPrice(
            productId
          );
          return total + (productDetails?.totalPrice || 0);
        },
        0
      );

      const orderData: OrderCreateRequest = {
        userId,
        products,
        amount: await amount, // Ensure this resolves to a number
      };
      const order = await this.orderService.createOrder(orderData);

      res.status(201).json(order);
    } catch (error) {
      res.status(500).json({ error: "Failed to create order" });
    }
  }

  public async getOrders(req: Request, res: Response): Promise<void> {
    try {
      const orders = await this.orderService.getOrders();
      res.status(200).json(orders);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch orders" });
    }
  }

  public async getOrderById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const order = await this.orderService.getOrderById(id);
      if (!order) {
        res.status(404).json({ error: "Order not found" });
        return;
      }
      res.status(200).json(order);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch order" });
    }
  }

  public async updateOrder(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const { productIds } = req.body;

      if (!productIds || !Array.isArray(productIds)) {
        res.status(400).json({ error: "Invalid products array" });
        return;
      }

      const totalPrice = await productIds.reduce(
        async (total: number, productId: string) => {
          const productDetails = await this.productService.getPizzaPrice(
            productId
          );
          return total + (productDetails?.totalPrice || 0);
        },
        0
      );

      const orderData = {
        addProducts: productIds,
        amount: totalPrice,
      };
      
      if (totalPrice <= 0) {
        res
          .status(400)
          .json({ error: "Total price must be greater than zero" });
        return;
      }
      
      const updatedOrder = await this.orderService.updateOrder(id, orderData);
      if (!updatedOrder) {
        res.status(404).json({ error: "Order not found" });
        return;
      }
      res.status(200).json(updatedOrder);
    } catch (error) {
      res.status(500).json({ error: "Failed to update order" });
    }
  }
  public async updateOrderStatus(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const { status } = req.body;
      const updatedOrder = await this.orderService.updateOrderStatus(
        id,
        status
      );
      if (!updatedOrder) {
        res.status(404).json({ error: "Order not found" });
        return;
      }
      res.status(200).json(updatedOrder);
    } catch (error) {
      res.status(500).json({ error: "Failed to update order status" });
    }
  }
}
