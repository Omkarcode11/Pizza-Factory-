import { InventoryService } from "../../inventory/inventory.service";
import eventBus from "./../../../utils/event";
import { IInventoryAssessment } from "./types";

export class InventoryAssessment implements IInventoryAssessment {
  private inventoryService: InventoryService;
  constructor(inventoryService: InventoryService) {
    this.inventoryService = inventoryService;

    eventBus.on("increase.product", (id: string, quantity: number) =>
      this.decreaseQuantity(id, quantity)
    );

    eventBus.on("decrease.product", (id: string, quantity: number) =>
      this.increaseQuantity(id, quantity)
    );
  }

  public async increaseQuantity(id: string, quantity: number) {
    this.inventoryService.increaseQuantity(id, quantity);
  }

  public async decreaseQuantity(id: string, quantity: number) {
    this.inventoryService.decreaseQuantity(id, quantity);
  }
}
