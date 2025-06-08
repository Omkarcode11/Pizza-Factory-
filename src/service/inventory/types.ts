
export interface ItemDto {
  id: string;
  product_id: string;
  quantity: number;
  capacity: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface ItemInstance {
  product_id: string;
  quantity: number;
  capacity: number;
}

export interface ItemUpdateRequest {
  product_id?: string;
  name?: string;
  price?: number;
  quantity?: number;
  capacity?: number;
}

export interface IInventoryService {
  getInventories(): Promise<ItemDto[]>;
  getInventoryById(id: string): Promise<ItemDto>;
  getInventoryByIds(ids: string[]): Promise<ItemDto[]>;
  createInventory(item: ItemInstance): Promise<ItemDto>;
  updateInventory(id: string, item: ItemUpdateRequest): Promise<ItemDto>;
  deleteInventory(id: string): Promise<boolean>;
  increaseQuantity(id:string,quantity: number): Promise<ItemDto>;
  decreaseQuantity(id:string,quantity: number): Promise<ItemDto>;
  updateCapacity(id:string,capacity: number): Promise<ItemDto>;
}
