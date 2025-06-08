import {
  IPaymentService,
  paymentCreateReq,
  PaymentDto,
  PaymentMode,
  PaymentStatus,
} from "./types";
import Payment from "../../models/payment.model";

export class PaymentService implements IPaymentService {
  private paymentRepo: typeof Payment;

  constructor(paymentRepo: typeof Payment) {
    this.paymentRepo = paymentRepo;
  }

  public async createPayment(
    paymentDyo: paymentCreateReq
  ): Promise<PaymentDto> {
    const payment = await this.paymentRepo.create({
      order_id: paymentDyo.order_id,
      amount: paymentDyo.amount,
      payment_method: paymentDyo.payment_method,
      currency: paymentDyo.currency,
    });

    return {
      id: payment.id,
      order_id: payment.order_id.toString(),
      amount: payment.amount,
      payment_method: payment.payment_method as PaymentMode,
      currency: payment.currency,
      createdAt: payment.createdAt,
      updatedAt: payment.updatedAt,
      paid_at: payment.paid_at,
      status: payment.status as PaymentStatus,
      transaction_id: payment.transaction_id,
    };
  }

  public async getPaymentByOrderId(
    orderId: string
  ): Promise<PaymentDto | null> {
    const payment = await this.paymentRepo.findOne({
      where: { order_id: orderId },
    });
    if (!payment) return null;
    return {
      id: payment.id,
      order_id: payment.order_id.toString(),
      amount: payment.amount,
      payment_method: payment.payment_method as PaymentMode,
      currency: payment.currency,
      createdAt: payment.createdAt,
      updatedAt: payment.updatedAt,
      paid_at: payment.paid_at,
      status: payment.status as PaymentStatus,
      transaction_id: payment.transaction_id,
    };
  }

  public async getPaymentById(id: string): Promise<PaymentDto> {
    const payment = await this.paymentRepo.findById(id);
    if (!payment) return null;
    return {
      id: payment.id,
      order_id: payment.order_id.toString(),
      amount: payment.amount,
      payment_method: payment.payment_method as PaymentMode,
      currency: payment.currency,
      createdAt: payment.createdAt,
      updatedAt: payment.updatedAt,
      paid_at: payment.paid_at,
      status: payment.status as PaymentStatus,
      transaction_id: payment.transaction_id,
    };
  }

  public async completePayment(
    orderId: string,
    code: string
  ): Promise<PaymentDto> {
    // TODO integration payment get way
    const payment = await this.getPaymentById(orderId);
    if (!payment) {
      throw new Error("payment not found");
    }

    if (payment.status == PaymentStatus.FAILED) {
      throw new Error("payment failed");
    }

    if (payment.status == PaymentStatus.SUCCESS) {
      throw new Error("payment already success");
    }

    if (Number(code) != 1) {
      throw new Error("Invalid payment code");
    }

    await this.paymentRepo.updateOne(
      { order_id: orderId },
      {
        $set: {
          status: PaymentStatus.SUCCESS,
          paid_at: new Date(),
        },
      }
    );

    const updatedPayment = await this.paymentRepo.findOne({
      where: { order_id: orderId },
    });
    if (!updatedPayment) {
      throw new Error("Updated payment not found");
    }

    return {
      id: updatedPayment.id,
      order_id: updatedPayment.order_id.toString(),
      amount: updatedPayment.amount,
      payment_method: updatedPayment.payment_method as PaymentMode,
      currency: updatedPayment.currency,
      createdAt: updatedPayment.createdAt,
      updatedAt: updatedPayment.updatedAt,
      paid_at: updatedPayment.paid_at,
      status: updatedPayment.status as PaymentStatus,
      transaction_id: updatedPayment.transaction_id,
    };
  }
}
