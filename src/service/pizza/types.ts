import { StuffingDto, StuffingInstance } from "../stuff/types";

export interface PizzaInstance {
  title: string;
  description: string;
  img: string;
  stuffing: StuffingInstance[]; // Array of stuffing IDs or names
  basePrice: number;
  size: "small" | "medium" | "large";
}

export interface PizzaDto extends PizzaInstance {
  id: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface PizzaPriceDto {
  pizzaId: string;
  basePrice: number;
  stuffingPrice: number;
  totalPrice: number;
}

export interface PizzaRepository {
  createPizza(pizza: PizzaInstance): Promise<PizzaDto>;
  getPizzas(): Promise<PizzaDto[]>;
  getPizzaById(id: string): Promise<PizzaDto | null>;
  updatePizza(
    id: string,
    pizza: Partial<PizzaInstance>
  ): Promise<PizzaDto | null>;
  addStuffingToPizza(
    pizzaId: string,
    stuffingId: string
  ): Promise<PizzaDto | null>;
  removeStuffingFromPizza(
    pizzaId: string,
    stuffingId: string
  ): Promise<PizzaDto | null>;
  getPizzaPrice(pizzaId: string): Promise<PizzaPriceDto>;
}
