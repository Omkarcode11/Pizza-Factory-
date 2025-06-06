import { Request, Response } from "express";
import { ChefService } from "../../service/chef/chefService";
import { ChefControllerInterface } from "./types";

export class ChefController implements ChefControllerInterface {
  private chefService: ChefService; // Replace with actual service type

  constructor(chefService?: ChefService) {
    this.chefService = chefService || new ChefService(); // Initialize with a default service
  }

  public async getChefs(req: Request, res: Response): Promise<void> {
    try {
      const chefs = await this.chefService.getChefs();
      res.status(200).json(chefs);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch chefs" });
    }
  }

  public async getChefById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const chef = await this.chefService.getChefById(id);
      if (!chef) {
        res.status(404).json({ error: "Chef not found" });
        return;
      }
      res.status(200).json(chef);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch chef" });
    }
  }

  public async getFreeChefs(req: Request, res: Response): Promise<void> {
    try {
      const freeChefs = await this.chefService.getFreeChefs();
      res.status(200).json(freeChefs);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch free chefs" });
    }
  }

  public async createChef(req: Request, res: Response): Promise<void> {
    try {
      const chefData = req.body;
      const newChef = await this.chefService.createChef(chefData);
      res.status(201).json(newChef);
    } catch (error) {
      res.status(500).json({ error: "Failed to create chef" });
    }
  }

  public async updateChef(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const chefData = req.body;
      const updatedChef = await this.chefService.updateChef(id, chefData);
      if (!updatedChef) {
        res.status(404).json({ error: "Chef not found" });
        return;
      }
      res.status(200).json(updatedChef);
    } catch (error) {
      res.status(500).json({ error: "Failed to update chef" });
    }
  }

  public async deleteChef(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const deleted = await this.chefService.deleteChef(id);
      if (!deleted) {
        res.status(404).json({ error: "Chef not found" });
        return;
      }
      res.status(204).send(); // No content
    } catch (error) {
      res.status(500).json({ error: "Failed to delete chef" });
    }
  }
}
