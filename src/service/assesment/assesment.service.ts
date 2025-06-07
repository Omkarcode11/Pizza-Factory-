import serviceBus from "../../utils/event";
import { ChefService } from "../chef/chefService";
import { ChefAssessmentStrategy } from "../chef/strategies/ChefAssessmentStrategy";
import { OrderService } from "../order/orderService";
import { OrderStatus, OrderStatusDto } from "../order/types";
import { IChefAssessmentService } from "./types";

export class ChefAssessmentService implements IChefAssessmentService {
  private chefService: ChefService; // Replace with actual ChefService type
  private orderService: OrderService;
  private chefStrategy: ChefAssessmentStrategy; // Replace with actual AssessmentStrategy type

  constructor(
    chefService: ChefService,
    orderService: OrderService,
    chefAssessmentStrategy: ChefAssessmentStrategy
  ) {
    this.chefService = chefService; // Initialize with a default service
    this.orderService = orderService; // Initialize with a default service
    this.chefStrategy = chefAssessmentStrategy; // Initialize with a default strategy

    serviceBus.on("order.created", (data: OrderStatusDto) => {
      this.assignedChefToOrder(data.id);
    });

    serviceBus.on("chef.order.completed", () =>
      this.assignPendingChefToOrder()
    );
  }

  public async assignedChefToOrder(orderId: string): Promise<void> {
    try {
      const order = await this.orderService.getOrderById(orderId);
      if (!order) {
        throw new Error("Order not found");
      }

      const freeChefs = await this.chefService.getFreeChefs();

      const chef = this.chefStrategy.selectChef(freeChefs);
      await this.chefService.assignOrderToChef(chef.id, orderId);
      await this.orderService.assignChefToOrder(orderId, chef.id);

      console.log(`Chef ${chef.name} assigned to order ${orderId}`);
    } catch (error) {
      console.error("Error assigning chef to order:", error);
    }
  }

  public async assignPendingChefToOrder(): Promise<void> {
    try {
      const orders = await this.orderService.getOrdersByStatus(
        OrderStatus.PENDING
      );
      const freeChefs = await this.chefService.getFreeChefs();
      for (const order of orders) {
        if (freeChefs.length > 0) {
          const chef = this.chefStrategy.selectChef(freeChefs); // Assign the first free chef
          await this.chefService.assignOrderToChef(chef.id, order.id);
          await this.orderService.assignChefToOrder(order.id, chef.id);
          console.log(
            `Chef ${chef.name} assigned to pending order ${order.id}`
          );
        } else {
          console.log("No free chefs available to assign to pending orders.");
          break; // Exit if no free chefs are available
        }
      }
    } catch (error) {
      console.error("Error assigning pending chefs to orders:", error);
    }
  }
}
