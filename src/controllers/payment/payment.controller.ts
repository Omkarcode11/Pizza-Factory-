import { Request, Response } from "express";
import { PaymentService } from "../../service/payment/payment.service";
import { IPaymentController } from "./types";
import { paymentCreateReq } from "../../service/payment/types";

class PaymentController implements IPaymentController {
  private paymentService: PaymentService;

  constructor(paymentService: PaymentService) {
    this.paymentService = paymentService;
  }

  public async createPayment(req: Request, res: Response): Promise<void> {
    try {
      const { amount, order_id, payment_method, currency } = req.body;

      const paymentCreateReq: paymentCreateReq = {
        amount,
        order_id,
        payment_method,
        currency: currency || "INR",
      };

      const payment = await this.paymentService.createPayment(paymentCreateReq);
      res.status(201).json(payment);
    } catch (err: any) {
      res.status(500).json({ message: err.message });
    }
  }

  public async completePayment(req: Request, res: Response): Promise<void> {
    try {
      const { payment_id } = req.params;
      const { code } = req.body;
      const payment = await this.paymentService.completePayment(
        payment_id,
        code
      );
      res.status(200).json(payment);
    } catch (err: any) {
      res.status(500).json({ message: err.message });
    }
  }
}

export default PaymentController;
