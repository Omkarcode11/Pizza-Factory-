export interface StuffingInstance {
  name: string;
  description: string;
  price: number;
}


export interface StuffingDto extends StuffingInstance {
  id: string;
}

export interface StuffingRepository {
  getOrCreateStuffing(stuffing: StuffingInstance): Promise<StuffingDto>;
  createStuffing(stuffing: StuffingInstance): Promise<StuffingDto>;
  getStuffings(): Promise<StuffingDto[]>;
  getStuffingById(id: string): Promise<StuffingDto | null>;
  updateStuffing(id: string, stuffing: Partial<StuffingInstance>): Promise<StuffingDto | null>;
  deleteStuffing(id: string): Promise<void>;
}