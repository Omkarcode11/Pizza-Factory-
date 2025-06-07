import {
  IInventoryService,
  ItemDto,
  ItemInstance,
  ItemUpdateRequest,
} from "./types";
import Inventory from "../../models/inventory.model";

export class InventoryService implements IInventoryService {
  private inventory: typeof Inventory;

  constructor(inventory: typeof Inventory) {
    this.inventory = inventory;
  }

  public async getInventories(): Promise<ItemDto[]> {
    const items = await this.inventory.find().populate("product");
    return items.map((ele) => ({
      id: ele._id.toString(),
      product_id: ele.product_id.toString(),
      quantity: ele.quantity,
      capacity: ele.capacity,
      createdAt: ele.createdAt,
      updatedAt: ele.updatedAt,
    }));
  }

  public async getInventoryById(id: string): Promise<ItemDto> {
    const item = await this.inventory.findById(id).populate("product");

    return {
      id: item._id.toString(),
      product_id: item.product_id.toString(),
      quantity: item.quantity,
      capacity: item.capacity,
      createdAt: item.createdAt,
      updatedAt: item.updatedAt,
    };
  }

  public async getInventoryByIds(ids: string[]): Promise<ItemDto[]> {
    const items = await this.inventory
      .find({ _id: { $in: ids } })
      .populate("product");

    return items.map((item) => ({
      id: item._id.toString(),
      product_id: item.product_id.toString(),
      quantity: item.quantity,
      capacity: item.capacity,
      createdAt: item.createdAt,
      updatedAt: item.updatedAt,
    }));
  }

  public async createInventory(item: ItemInstance): Promise<ItemDto> {
    const itemModal = await this.inventory.create({
      product_id: item.product_id,
      price: item.price,
      quantity: item.quantity,
      capacity: item.capacity,
    });

    if (!itemModal) {
      throw new Error("Failed to create item");
    }

    return {
      id: itemModal._id.toString(),
      product_id: itemModal.product_id.toString(),
      quantity: itemModal.quantity,
      capacity: itemModal.capacity,
      createdAt: itemModal.createdAt,
      updatedAt: itemModal.updatedAt,
    };
  }

  public async updateInventory(
    id: string,
    item: ItemUpdateRequest
  ): Promise<ItemDto> {
    let updateKeys: ItemUpdateRequest = {};
    if (item.capacity) updateKeys.capacity = item.capacity;
    if (item.quantity) updateKeys.quantity = item.quantity;
    if (item.product_id) updateKeys.product_id = item.product_id;

    const itemModal = await this.inventory
      .findByIdAndUpdate(
        id,
        {
          $set: {
            capacity: updateKeys.capacity,
            quantity: updateKeys.quantity,
            product_id: updateKeys.product_id,
          },
        },
        { new: true, runValidators: true }
      )
      .populate("product");

    return {
      id: itemModal._id.toString(),
      product_id: itemModal.product_id.toString(),
      quantity: itemModal.quantity,
      capacity: itemModal.capacity,
      createdAt: itemModal.createdAt,
      updatedAt: itemModal.updatedAt,
    };
  }

  public async deleteInventory(id: string): Promise<boolean> {
    const result = await this.inventory.findByIdAndDelete(id);
    return result !== null;
  }

  public async increaseQuantity(
    id: string,
    quantity: number
  ): Promise<ItemDto> {
    const item = await this.inventory
      .findByIdAndUpdate(
        id,
        {
          $inc: {
            quantity: quantity,
          },
        },
        { new: true, runValidators: true }
      )
      .populate("product");

    return {
      id: item._id.toString(),
      product_id: item.product_id.toString(),
      quantity: item.quantity,
      capacity: item.capacity,
      createdAt: item.createdAt,
      updatedAt: item.updatedAt,
    };
  }
  public async decreaseQuantity(
    id: string,
    quantity: number
  ): Promise<ItemDto> {
    const item = await this.inventory
      .findByIdAndUpdate(id, {
        $dec: {
          quantity: -quantity,
        },
      })
      .populate("product");

    return {
      id: item._id.toString(),
      product_id: item.product_id.toString(),
      quantity: item.quantity,
      capacity: item.capacity,
      createdAt: item.createdAt,
      updatedAt: item.updatedAt,
    };
  }

  public async updateCapacity(id: string, capacity: number): Promise<ItemDto> {
    const item = await this.inventory.findByIdAndUpdate(
      id,
      { capacity: capacity },
      { new: true, runValidators: true }
    );
    return {
      id: item._id.toString(),
      product_id: item.product_id.toString(),
      quantity: item.quantity,
      capacity: item.capacity,
      createdAt: item.createdAt,
      updatedAt: item.updatedAt,
    };
  }
}
