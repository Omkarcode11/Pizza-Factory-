import Pizza from "../../models/pizza.model";
import Stuff from "../../models/stuff.model";
import StuffFactoryService from "../stuff/stuffFactoryService";
import { StuffingDto, StuffingInstance } from "../stuff/types";
import {
  PizzaDto,
  PizzaInstance,
  PizzaPriceDto,
  PizzaRepository,
} from "./types";

class PizzaFactoryService implements PizzaRepository {
  private pizza: typeof Pizza;
  private stuffService: StuffFactoryService;

  constructor(
    pizzaModel: typeof Pizza = Pizza,
    stuffService: StuffFactoryService = new StuffFactoryService(Stuff)
  ) {
    this.pizza = pizzaModel;
    this.stuffService = stuffService;
  }

  private stuffingTransform(stuffings: any[]): StuffingDto[] {
    return stuffings.map((stuff) => ({
      id: stuff._id.toString(),
      name: stuff.name,
      description: stuff.description,
      price: stuff.price,
    }));
  }

  public async createPizza(pizza: PizzaInstance): Promise<PizzaDto> {
    const stuffings = new Array();

    for (const stuff of pizza.stuffing) {
      const stuffRequest: StuffingInstance = {
        name: stuff.name,
        description: stuff.description,
        price: stuff.price,
      };
      const stuffInstance = await this.stuffService.getOrCreateStuffing(
        stuffRequest
      );
      stuffings.push(stuffInstance);
    }

    const createdPizza = await this.pizza.create({
      title: pizza.title,
      description: pizza.description,
      img: pizza.img,
      basePrice: pizza.basePrice,
      stuffing: stuffings.map((stuff) => stuff._id),
    });

    return {
      id: createdPizza._id.toString(),
      title: createdPizza.title,
      description: createdPizza.description,
      img: createdPizza.img,
      basePrice: createdPizza.basePrice,
      stuffing: this.stuffingTransform(createdPizza.stuffing),
    };
  }

  public async getPizzas(): Promise<PizzaDto[]> {
    const pizzas = await this.pizza.find().populate("stuffing");
    return pizzas.map((pizza) => ({
      id: pizza._id.toString(),
      title: pizza.title,
      description: pizza.description,
      img: pizza.img,
      basePrice: pizza.basePrice,
      stuffing: pizza.stuffing.map((s: any) => ({
        id: s._id.toString(),
        name: s.name,
        description: s.description,
        price: s.price,
      })),
    }));
  }

  public async getPizzaById(id: string): Promise<PizzaDto | null> {
    const pizza = await this.pizza.findById(id).populate("stuffing");
    if (!pizza) return null;

    return {
      id: pizza._id.toString(),
      title: pizza.title,
      description: pizza.description,
      img: pizza.img,
      basePrice: pizza.basePrice,
      stuffing: this.stuffingTransform(pizza.stuffing),
    };
  }

  public async updatePizza(
    id: string,
    pizza: Partial<PizzaInstance>
  ): Promise<PizzaDto | null> {
    const updatedPizza = await this.pizza
      .findByIdAndUpdate(
        id,
        {
          title: pizza.title,
          description: pizza.description,
          img: pizza.img,
          basePrice: pizza.basePrice,
          stuffing: pizza.stuffing,
        },
        { new: true, runValidators: true }
      )
      .populate("stuffing");

    return updatedPizza
      ? {
          id: updatedPizza._id.toString(),
          title: updatedPizza.title,
          description: updatedPizza.description,
          img: updatedPizza.img,
          basePrice: updatedPizza.basePrice,
          stuffing: this.stuffingTransform(updatedPizza.stuffing),
        }
      : null;
  }

  public async addStuffingToPizza(
    pizzaId: string,
    stuffingId: string
  ): Promise<PizzaDto | null> {
    const updatedPizza = await this.pizza
      .findByIdAndUpdate(
        pizzaId,
        { $addToSet: { stuffing: stuffingId } },
        { new: true, runValidators: true }
      )
      .populate("stuffing");

    return updatedPizza
      ? {
          id: updatedPizza._id.toString(),
          title: updatedPizza.title,
          description: updatedPizza.description,
          img: updatedPizza.img,
          basePrice: updatedPizza.basePrice,
          stuffing: this.stuffingTransform(updatedPizza.stuffing),
        }
      : null;
  }

  public async removeStuffingFromPizza(
    pizzaId: string,
    stuffingId: string
  ): Promise<PizzaDto | null> {
    const updatedPizza = await this.pizza
      .findByIdAndUpdate(
        pizzaId,
        { $pull: { stuffing: stuffingId } },
        { new: true, runValidators: true }
      )
      .populate("stuffing");

    return updatedPizza
      ? {
          id: updatedPizza._id.toString(),
          title: updatedPizza.title,
          description: updatedPizza.description,
          img: updatedPizza.img,
          basePrice: updatedPizza.basePrice,
          stuffing: this.stuffingTransform(updatedPizza.stuffing),
        }
      : null;
  }
  public async getPizzaPrice(pizzaId: string): Promise<PizzaPriceDto> {
    const pizza = await this.pizza.findById(pizzaId).populate("stuffing");
    if (!pizza) return null;

    const stuffingPrice = (pizza.stuffing as Array<{ price?: number }>).reduce(
      (total, stuff) => {
        return total + (typeof stuff.price === "number" ? stuff.price : 0);
      },
      0
    );
    const price = pizza.basePrice + stuffingPrice;

    return {
      pizzaId: pizza._id.toString(),
      basePrice: pizza.basePrice,
      stuffingPrice: stuffingPrice,
      totalPrice: price,
    };
  }
}

export default PizzaFactoryService;
