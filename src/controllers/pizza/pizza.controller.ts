import { Request, Response } from "express";
import { PizzaControllerInterface } from "./types";
import { PizzaInstance, PizzaRepository } from "../../service/pizza/types";
import PizzaFactoryService from "../../service/pizza/pizzaFactoryService";

class PizzaController implements PizzaControllerInterface {
  private pizzaService: PizzaRepository;

  constructor(pizzaService?: PizzaRepository) {
    this.pizzaService = pizzaService || new PizzaFactoryService();
  }

  public async createPizza(req: Request, res: Response): Promise<void> {
    try {
      const { title, description, img, stuffing, basePrice, size } = req.body;
      const pizza: PizzaInstance = {
        title,
        description,
        img,
        stuffing,
        basePrice,
        size: size || "medium", // Default size if not provided
      };
      const createdPizza = await this.pizzaService.createPizza(pizza);
      res.status(201).json(createdPizza);
    } catch (error) {
      res.status(500).json({ error: "Failed to create pizza" });
    }
  }

  public async getPizzas(req: Request, res: Response): Promise<void> {
    try {
      const pizzas = await this.pizzaService.getPizzas();
      res.status(200).json(pizzas);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch pizzas" });
    }
  }

  public async updatePizza(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const pizzaData: Partial<PizzaInstance> = req.body;
      const updatedPizza = await this.pizzaService.updatePizza(id, pizzaData);
      if (!updatedPizza) {
        res.status(404).json({ error: "Pizza not found" });
        return;
      }
      res.status(200).json(updatedPizza);
    } catch (error) {
      res.status(500).json({ error: "Failed to update pizza" });
    }
  }

  public async getPizzaById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const pizza = await this.pizzaService.getPizzaById(id);
      if (!pizza) {
        res.status(404).json({ error: "Pizza not found" });
        return;
      }
      res.status(200).json(pizza);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch pizza" });
    }
  }

  public async addStuffingToPizza(req: Request, res: Response): Promise<void> {
    try {
      const { pizzaId, stuffingId } = req.body;
      const updatedPizza = await this.pizzaService.addStuffingToPizza(
        pizzaId,
        stuffingId
      );
      if (!updatedPizza) {
        res.status(404).json({ error: "Pizza not found" });
        return;
      }
      res.status(200).json(updatedPizza);
    } catch (error) {
      res.status(500).json({ error: "Failed to add stuffing to pizza" });
    }
  }

  public async removeStuffingFromPizza(
    req: Request,
    res: Response
  ): Promise<void> {
    try {
      const { pizzaId, stuffingId } = req.body;
      const updatedPizza = await this.pizzaService.removeStuffingFromPizza(
        pizzaId,
        stuffingId
      );
      if (!updatedPizza) {
        res.status(404).json({ error: "Pizza not found" });
        return;
      }
      res.status(200).json(updatedPizza);
    } catch (error) {
      res.status(500).json({ error: "Failed to remove stuffing from pizza" });
    }
  }

  public async getPizzaPrice(req: Request, res: Response): Promise<void> {
    try {
      const { pizzaId } = req.params;
      const pizzaPrice = await this.pizzaService.getPizzaPrice(pizzaId);
      res.status(200).json(pizzaPrice);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch pizza price" });
    }
  }

  public async getPizzaPriceById(req: Request, res: Response): Promise<void> {
    try {
      const { pizzaId } = req.params;
      const pizzaPrice = await this.pizzaService.getPizzaPrice(pizzaId);
      res.status(200).json(pizzaPrice);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch pizza price" });
    }
  }
}

export default PizzaController;
