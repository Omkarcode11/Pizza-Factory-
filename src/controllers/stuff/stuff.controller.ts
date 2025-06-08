import { Request, Response } from "express";
import StuffFactoryService from "../../service/stuff/stuffFactoryService";
import { IStuffController } from "./types";
import { StuffingInstance } from "../../service/stuff/types";
import { InventoryService } from "../../service/inventory/inventory.service";

export class StuffController implements IStuffController {
  private stuffService: StuffFactoryService;
  private inventoryService: InventoryService;

  constructor(
    stuffService: StuffFactoryService,
    inventoryService: InventoryService
  ) {
    this.stuffService = stuffService;
    this.inventoryService = inventoryService;
  }

  public async createStuff(req: Request, res: Response): Promise<void> {
    try {
      const { name, description, price, quantity, capacity } = req.body;
      if (isNaN(price) || isNaN(quantity) || isNaN(capacity)) {
        res
          .status(400)
          .json({ message: "Invalid price, quantity or capacity" });
        return;
      }

      const createRequest: StuffingInstance = {
        name,
        description,
        price,
      };

      const stuff = await this.stuffService.createStuffing(createRequest);
      this.inventoryService.createInventory({
        product_id: stuff.id.toString(),
        quantity: quantity,
        capacity: capacity,
      });
      res.status(201).json(stuff);
    } catch (err: any) {
      res.status(500).json({ message: "Error creating stuff" });
    }
  }

  public async getStuff(req: Request, res: Response): Promise<void> {
    try {
      const stuff = await this.stuffService.getStuffings();
      res.status(200).json(stuff);
    } catch (err: any) {
      res.status(500).json({ message: "Error fetching stuff" });
    }
  }

  public async getStuffById(req: Request, res: Response): Promise<void> {
    try {
      const id = req.params.id;
      const stuff = await this.stuffService.getStuffingById(id);
      res.status(200).json(stuff);
    } catch (err: any) {
      res.status(404).json({ message: "Stuff not found" });
    }
  }

  public async updateStuff(req: Request, res: Response): Promise<void> {
    try {
      const id = req.params.id;
      const { name, description, price, quantity } = req.body;
      const updateRequest: StuffingInstance = {
        name,
        description,
        price,
      };
      const stuff = await this.stuffService.updateStuffing(id, updateRequest);
      res.status(200).json(stuff);
    } catch (err: any) {
      res.status(404).json({ message: "Stuff not found" });
    }
  }

  public async deleteStuff(req: Request, res: Response): Promise<void> {
    try {
      const id = req.params.id;
      await this.stuffService.deleteStuffing(id);
      res.status(204).json({ message: "Stuff deleted" });
    } catch (err: any) {
      res.status(404).json({ message: "Stuff not found" });
    }
  }

  public async increaseQuantity(req: Request, res: Response): Promise<void> {
    try {
      const id = req.params.id;
      const quantity = req.body.quantity;
      if (isNaN(quantity)) {
        res.status(400).json({ message: "Quantity must be a number" });
      }

      if (!id) {
        res.status(400).json({ message: "Id is required" });
      }

      let stuff = this.inventoryService.increaseQuantity(id, quantity);
      res.status(200).json(stuff);
    } catch (err: any) {
      res.status(404).json({ message: "Stuff not found" });
    }
  }

  public async decreaseQuantity(req: Request, res: Response): Promise<void> {
    try {
      const id = req.params.id;
      const quantity = req.body.quantity;
      if (isNaN(quantity) && quantity > 0) {
        res.status(400).json({
          message:
            "Quantity must be a number and quantity should be greater than 0",
        });
      }

      const stuff = this.inventoryService.decreaseQuantity(id, quantity);
      res.status(200).json(stuff);
    } catch (err: any) {
      res.status(404).json({ message: "Stuff not found" });
    }
  }

  public async getAllStuffs(req: Request, res: Response): Promise<void> {
    try {
      const stuffs = await this.stuffService.getStuffings();

      res.status(200).json(stuffs);
    } catch (err: any) {
      res.status(404).json({ message: "Stuff not found" });
    }
  }
}
