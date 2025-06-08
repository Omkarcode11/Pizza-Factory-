import { DeliveryCreateRequest, DeliveryDto, IDeliveryService } from "./types";
import Delivery from "../../models/delivery.modal";
import { OrderService } from "../order/orderService";

export class DeliveryService implements IDeliveryService {
  private deliveryRepo: typeof Delivery;
  private orderService: OrderService;

  constructor(deliverRepo: typeof Delivery, orderService: OrderService) {
    this.deliveryRepo = deliverRepo;
  }

  public async getAllDeliveries(): Promise<DeliveryDto[]> {
    const deliveries = await this.deliveryRepo.find();

    return deliveries.map((delivery) => ({
      id: delivery.id.toString(),
      delivery_agent_id: delivery.delivery_agent_id.toString(),
      order_id: delivery.order_id.toString(),
      delivery_at: delivery.delivery_at,
      createdAt: delivery.createdAt,
      updatedAt: delivery.updatedAt,
    }));
  }

  public async getDeliveryById(
    deliveryId: string
  ): Promise<DeliveryDto | null> {
    const delivery = await this.deliveryRepo.findById(deliveryId);
    if (!delivery) return null;

    return {
      id: delivery.id.toString(),
      delivery_agent_id: delivery.delivery_agent_id.toString(),
      order_id: delivery.order_id.toString(),
      delivery_at: delivery.delivery_at,
      createdAt: delivery.createdAt,
      updatedAt: delivery.updatedAt,
    };
  }

  public async getDeliveryByOrderId(
    orderId: string
  ): Promise<DeliveryDto | null> {
    const delivery = await this.deliveryRepo.findOne({
      where: { order_id: orderId },
    });

    if (!delivery) return null;

    return {
      id: delivery.id.toString(),
      delivery_agent_id: delivery.delivery_agent_id.toString(),
      order_id: delivery.order_id.toString(),
      delivery_at: delivery.delivery_at,
      createdAt: delivery.createdAt,
      updatedAt: delivery.updatedAt,
    };
  }

  public async getAllDeliveryByUserId(userId: string): Promise<DeliveryDto[]> {
    const orders = await this.orderService.getOrdersByUserId(userId);
    const deliveries = [];
    for (const order of orders) {
      const delivery = await this.getDeliveryByOrderId(order.id);
      if (delivery) deliveries.push(delivery);
    }
    return deliveries;
  }

  public async createDelivery(
    deliveryInstance: DeliveryCreateRequest
  ): Promise<DeliveryDto> {
    const delivery = await this.deliveryRepo.create({
      order_id: deliveryInstance.orderId,
    });
    if (!delivery) {
      throw new Error("Delivery not created");
    }
    return {
      id: delivery.id.toString(),
      delivery_agent_id: delivery.delivery_agent_id.toString(),
      order_id: delivery.order_id.toString(),
      delivery_at: delivery.delivery_at,
      createdAt: delivery.createdAt,
      updatedAt: delivery.updatedAt,
    };
  }
}
