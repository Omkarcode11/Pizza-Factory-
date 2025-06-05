export interface OrderStatusDto {
  id: string;
  status: OrderStatus;
  amount: number;
  userId: string;
  chefId: string | null;
  deliveryAgentId: string | null;
  products: string[];
  createdAt?: Date;
  updatedAt?: Date;
}

enum OrderStatus {
  PENDING = "PENDING",
  ACCEPTED = "ACCEPTED",
  PREPARING = "PREPARING",
  OUT_FOR_DELIVERY = "OUT_FOR_DELIVERY",
  DELIVERED = "DELIVERED",
  CANCELLED = "CANCELLED",
}

export interface OrderCreateRequest {
  amount: number;
  userId: number;
  products: string[];
}

export interface OrderUpdateRequest {
    addProducts: string[];
    amount: number;
}

export interface OrderServiceInterface {
  createOrder(order: OrderCreateRequest): Promise<OrderStatusDto>;
  getOrders(): Promise<OrderStatusDto[]>;
  getOrderById(id: string): Promise<OrderStatusDto | null>;
  updateOrderStatus(
    id: string,
    status: OrderStatus
  ): Promise<OrderStatusDto | null>;
  updateOrder(
    id: string,
    orderData: OrderUpdateRequest
  ): Promise<OrderStatusDto | null>;
}
