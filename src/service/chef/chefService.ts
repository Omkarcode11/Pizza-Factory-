import Chef from "../../models/chef.modal";
import eventBus from "../../utils/event";
import { OrderService } from "../order/orderService";
import { OrderStatus } from "../order/types";

export class ChefService implements ChefServiceInterface {
  private chefModel: typeof Chef;
  private orderService: OrderService;

  constructor(chefModel: typeof Chef, orderService: OrderService) {
    this.chefModel = chefModel;
    this.orderService = orderService;
  }

  public async createChef(chefData: ChefCreateRequest): Promise<ChefDto> {
    const chef = await this.chefModel.create({
      name: chefData.name,
      email: chefData.email,
      password: chefData.password,
      contact_number: chefData.contact_number,
    });

    return {
      id: chef._id.toString(),
      name: chef.name,
      email: chef.email,
      contact_number: chef.contact_number,
      busy: chef.busy,
      performance_score: chef.performance_score,
      order_id: chef.order_id ? chef.order_id.toString() : null,
    };
  }

  public async getChefs(): Promise<ChefDto[]> {
    const chefs = await this.chefModel.find().exec();
    return chefs.map((chef) => ({
      id: chef._id.toString(),
      name: chef.name,
      email: chef.email,
      contact_number: chef.contact_number,
      busy: chef.busy,
      performance_score: chef.performance_score,
      order_id: chef.order_id ? chef.order_id.toString() : null,
    }));
  }

  public async getChefById(id: string): Promise<ChefDto | null> {
    const chef = await this.chefModel.findById(id).exec();
    if (!chef) {
      return null;
    }
    return {
      id: chef._id.toString(),
      name: chef.name,
      email: chef.email,
      contact_number: chef.contact_number,
      busy: chef.busy,
      performance_score: chef.performance_score,
      order_id: chef.order_id ? chef.order_id.toString() : null,
    };
  }

  public async updateChef(
    id: string,
    chefData: Partial<ChefUpdateRequest>
  ): Promise<ChefDto | null> {
    let updateFields: ChefUpdateRequest = {};

    if (chefData.name) {
      updateFields.name = chefData.name;
    }
    if (chefData.email) {
      updateFields.email = chefData.email;
    }
    if (chefData.contact_number) {
      updateFields.contact_number = chefData.contact_number;
    }

    const updatedChef = await this.chefModel
      .findByIdAndUpdate(
        id,
        {
          $set: updateFields,
        },
        { new: true }
      )
      .exec();
    return {
      id: updatedChef._id.toString(),
      name: updatedChef.name,
      email: updatedChef.email,
      contact_number: updatedChef.contact_number,
      busy: updatedChef.busy,
      performance_score: updatedChef.performance_score,
      order_id: updatedChef.order_id ? updatedChef.order_id.toString() : null,
    };
  }

  public async deleteChef(id: string): Promise<boolean> {
    const result = await this.chefModel.findByIdAndDelete(id).exec();
    return !!result;
  }

  public async getFreeChefs(): Promise<ChefDto[]> {
    const chefs = await this.chefModel.find({ busy: false }).exec();
    return chefs.map((chef) => ({
      id: chef._id.toString(),
      name: chef.name,
      email: chef.email,
      contact_number: chef.contact_number,
      busy: chef.busy,
      performance_score: chef.performance_score,
      order_id: chef.order_id ? chef.order_id.toString() : null,
    }));
  }

  public async assignOrderToChef(
    chefId: string,
    orderId: string
  ): Promise<ChefDto | null> {
    const updatedChef = await this.chefModel
      .findByIdAndUpdate(
        chefId,
        { $set: { order_id: orderId, busy: true } },
        { new: true }
      )
      .exec();
    if (!updatedChef) {
      return null;
    }
    return {
      id: updatedChef._id.toString(),
      name: updatedChef.name,
      email: updatedChef.email,
      contact_number: updatedChef.contact_number,
      busy: updatedChef.busy,
      performance_score: updatedChef.performance_score,
      order_id: updatedChef.order_id ? updatedChef.order_id.toString() : null,
    };
  }

  public async orderPrepared(chefId: string): Promise<ChefDto | null> {
    const updatedChef = await this.chefModel
      .findByIdAndUpdate(
        chefId,
        { $set: { order_id: null, busy: false } },
        { new: true }
      )
      .exec();
    if (!updatedChef) {
      return null;
    }

    this.orderService.updateOrderStatus(
      updatedChef.order_id?.toString(),
      OrderStatus.PREPARING
    );

    eventBus.emit("chef.order.prepared", {
      chefId: updatedChef._id.toString(),
      orderId: updatedChef.order_id ? updatedChef.order_id.toString() : null,
    });

    return {
      id: updatedChef._id.toString(),
      name: updatedChef.name,
      email: updatedChef.email,
      contact_number: updatedChef.contact_number,
      busy: updatedChef.busy,
      performance_score: updatedChef.performance_score,
      order_id: updatedChef.order_id ? updatedChef.order_id.toString() : null,
    };
  }

}
