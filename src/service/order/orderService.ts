import {
  OrderCreateRequest,
  OrderServiceInterface,
  OrderStatus,
  OrderStatusDto,
  OrderUpdateRequest,
} from "./types";
import Order from "../../models/order.model";

export class OrderService implements OrderServiceInterface {
  private orderRepository: typeof Order;

  constructor(orderRepository: typeof Order) {
    this.orderRepository = orderRepository;
  }

  public async createOrder(order: OrderCreateRequest): Promise<OrderStatusDto> {
    const newOrder = await this.orderRepository.create({
      amount: order.amount,
      userId: order.userId,
      products: order.products,
    });

    return {
      id: newOrder._id.toString(),
      status: newOrder.status as OrderStatus,
      amount: newOrder.amount,
      userId: newOrder.user_id.toString(),
      products: newOrder.products.map((product) =>
        product.product_id.toString()
      ),
      chefId: null,
      deliveryAgentId: null,
      createdAt: newOrder.createdAt,
      updatedAt: newOrder.updatedAt,
    };
  }

  public async getOrders(): Promise<OrderStatusDto[]> {
    const orders = await this.orderRepository.find();

    return orders.map((order) => ({
      id: order._id.toString(),
      status: order.status as OrderStatus,
      amount: order.amount,
      userId: order.user_id ? order.user_id.toString() : null,
      chefId: order.chef ? order.chef._id.toString() : null,
      products: order.products.map((product) => product.product_id.toString()),
      deliveryAgentId: order.delivery_agent_id
        ? order.delivery_agent_id.toString()
        : null,
      createdAt: order.createdAt,
      updatedAt: order.updatedAt,
    }));
  }

  public async getOrderById(id: string): Promise<any | null> {
    const order = await this.orderRepository
      .findById(id)
      .populate("userId")
      .populate("chefId")
      .populate("deliveryAgentId")
      .populate("products.product_id");
    if (!order) return null;

    return {
      id: order._id.toString(),
      status: order.status as OrderStatus,
      amount: order.amount,
      user: order.user_id,
      chef: order.chef ? order.chef._id.toString() : null,
      deliveryAgent: order.delivery_agent_id,
      createdAt: order.createdAt,
      updatedAt: order.updatedAt,
    };
  }

  public async updateOrder(
    id: string,
    orderData: OrderUpdateRequest
  ): Promise<OrderStatusDto> {
    const order = await this.orderRepository.findById(id);

    if (!order) return null;
    if (order.status !== "PENDING") {
      throw new Error("Order can only be updated if it is in PENDING status");
    }

    const updatedOrder = await this.orderRepository.updateOne(
      { _id: id },
      {
        $addToSet: {
          products: { $each: orderData.addProducts || [] },
        },

        $inc: {
          amount: orderData.amount || 0,
        },
      },
      { new: true }
    );
    if (updatedOrder.modifiedCount === 0) return null;
    const updatedOrderData = await this.orderRepository.findById(id);
    if (!updatedOrderData) return null;
    return {
      id: updatedOrderData._id.toString(),
      status: updatedOrderData.status as OrderStatus,
      amount: updatedOrderData.amount,
      userId: updatedOrderData.user_id
        ? updatedOrderData.user_id.toString()
        : null,
      chefId: updatedOrderData.chef
        ? updatedOrderData.chef._id.toString()
        : null,
      products: updatedOrderData.products.map((product) =>
        product.product_id.toString()
      ),
      deliveryAgentId: updatedOrderData.delivery_agent_id
        ? updatedOrderData.delivery_agent_id.toString()
        : null,
      createdAt: updatedOrderData.createdAt,
      updatedAt: updatedOrderData.updatedAt,
    };
  }

  public async updateOrderStatus(
    id: string,
    status: OrderStatus
  ): Promise<OrderStatusDto | null> {
    const order = await this.orderRepository.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!order) return null;

    return {
      id: order._id.toString(),
      status: order.status as OrderStatus,
      amount: order.amount,
      userId: order.user_id ? order.user_id.toString() : null,
      chefId: order.chef ? order.chef._id.toString() : null,
      products: order.products.map((product) => product.product_id.toString()),
      deliveryAgentId: order.delivery_agent_id
        ? order.delivery_agent_id.toString()
        : null,
      createdAt: order.createdAt,
      updatedAt: order.updatedAt,
    };
  }

  public async assignChefToOrder(
    orderId: string,
    chefId: string
  ): Promise<OrderStatusDto | null> {
    const order = await this.orderRepository.findByIdAndUpdate(
      orderId,
      { chef: chefId, status: OrderStatus.PENDING },
      { new: true }
    );

    if (!order) return null;
    return {
      id: order._id.toString(),
      status: order.status as OrderStatus,
      amount: order.amount,
      userId: order.user_id ? order.user_id.toString() : null,
      chefId: order.chef ? order.chef._id.toString() : null,
      products: order.products.map((product) => product.product_id.toString()),
      deliveryAgentId: order.delivery_agent_id
        ? order.delivery_agent_id.toString()
        : null,
      createdAt: order.createdAt,
      updatedAt: order.updatedAt,
    };
  }

  public async getOrdersByStatus(
    status: OrderStatus
  ): Promise<OrderStatusDto[]> {
    const orders = await this.orderRepository.find(
      { status },
      { sort: { createdAt: -1 } }
    );
    return orders.map((order) => ({
      id: order._id.toString(),
      status: order.status as OrderStatus,
      amount: order.amount,
      userId: order.user_id ? order.user_id.toString() : null,
      chefId: order.chef ? order.chef._id.toString() : null,
      products: order.products.map((product) => product.product_id.toString()),
      deliveryAgentId: order.delivery_agent_id
        ? order.delivery_agent_id.toString()
        : null,
      createdAt: order.createdAt,
      updatedAt: order.updatedAt,
    }));
  }

  public async getOrdersByUserId(userId: string): Promise<OrderStatusDto[]> {
    const orders = await this.orderRepository.find({
      user_id: userId,
    });
    return orders.map((order) => ({
      id: order._id.toString(),
      status: order.status as OrderStatus,
      amount: order.amount,
      userId: order.user_id ? order.user_id.toString() : null,
      chefId: order.chef ? order.chef._id.toString() : null,
      products: order.products.map((product) => product.product_id.toString()),
      deliveryAgentId: order.delivery_agent_id
        ? order.delivery_agent_id.toString()
        : null,
      createdAt: order.createdAt,
      updatedAt: order.updatedAt,
    }));
  }
}
