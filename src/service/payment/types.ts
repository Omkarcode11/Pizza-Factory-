import { OrderStatusDto } from "../order/types";

export enum PaymentStatus {
  PENDING = "PENDING",
  SUCCESS = "SUCCESS",
  FAILED = "FAILED",
}

export enum PaymentMode {
  CASH = "CASH",
  CARD = "CARD",
  ONLINE = "ONLINE",
}

export interface PaymentDto {
  id: number;
  order_id: string;
  status: PaymentStatus;
  payment_method: PaymentMode;
  amount: number;
  transaction_id: string;
  currency: string;
  paid_at: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface paymentCreateReq {
    order_id : string;
    payment_method : PaymentMode;
    amount : number;
    currency: string;
}


export interface IPaymentService {
    createPayment(paymentDyo: paymentCreateReq): Promise<PaymentDto>
    getPaymentByOrderId(orderId:string):Promise<PaymentDto | null>
    completePayment(orderId:string,code:string):Promise<PaymentDto>
    getPaymentById(id:string): Promise<PaymentDto | null>
}