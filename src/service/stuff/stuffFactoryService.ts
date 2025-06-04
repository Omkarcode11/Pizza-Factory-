import Stuff from "../../models/stuff.model";
import { StuffingDto, StuffingInstance, StuffingRepository } from "./types";

class StuffFactoryService implements StuffingRepository {
  private stuff: typeof Stuff;
  constructor(stuffModel: typeof Stuff = Stuff) {
    // You can initialize any dependencies here if needed
    this.stuff = stuffModel;
  }

  public async getOrCreateStuffing(
    stuffing: StuffingInstance
  ): Promise<StuffingDto> {
    const existingStuff = await Stuff.findOne({ name: stuffing.name });
    if (existingStuff) {
      return {
        id: existingStuff._id.toString(),
        name: existingStuff.name,
        description: existingStuff.description,
        price: existingStuff.price,
      };
    }

    return this.createStuffing(stuffing);
  }

  public async createStuffing(
    stuffing: StuffingInstance
  ): Promise<StuffingDto> {
    const createdStuffing = await this.stuff.create({
      name: stuffing.name,
      description: stuffing.description,
      price: stuffing.price,
    });

    return {
      id: createdStuffing._id.toString(),
      name: createdStuffing.name,
      description: createdStuffing.description,
      price: createdStuffing.price,
    };
  }

  public async getStuffings(): Promise<StuffingDto[]> {
    const stuffings = await this.stuff.find();
    return stuffings.map((stuffing) => ({
      id: stuffing._id.toString(),
      name: stuffing.name,
      description: stuffing.description,
      price: stuffing.price,
    }));
  }

  public async updateStuffing(
    id: string,
    stuffing: Partial<StuffingInstance>
  ): Promise<StuffingDto | null> {
    const updatedStuffing = await this.stuff.findByIdAndUpdate(
      id,
      {
        name: stuffing.name,
        description: stuffing.description,
        price: stuffing.price,
      },
      {
        new: true,
      }
    );
    if (!updatedStuffing) return null;

    return {
      id: updatedStuffing._id.toString(),
      name: updatedStuffing.name,
      description: updatedStuffing.description,
      price: updatedStuffing.price,
    };
  }

  public async getStuffingById(id: string): Promise<StuffingDto | null> {
    const stuffing = await this.stuff.findById(id);
    if (!stuffing) return null;

    return {
      id: stuffing._id.toString(),
      name: stuffing.name,
      description: stuffing.description,
      price: stuffing.price,
    };
  }

  public async deleteStuffing(id: string): Promise<void> {
    await this.stuff.findByIdAndDelete(id);
  }
}

export default StuffFactoryService;
