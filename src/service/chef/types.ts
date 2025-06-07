interface ChefDto {
  id: string;
  name: string;
  email: string;
  contact_number: string;
  performance_score:number;
  busy: boolean;
  order_id: string | null; // Optional, as it may not always be assigned
}

interface ChefCreateRequest {
  name: string;
  email: string;
  contact_number: string;
  password: string; // Password should be hashed before saving
}

interface ChefUpdateRequest {
  name?: string;
  email?: string;
  contact_number?: string;
  password?: string; // Password should be hashed before saving
}



interface ChefServiceInterface {
  getChefs(): Promise<ChefDto[]>;
  getChefById(id: string): Promise<ChefDto | null>;
  createChef(chef: ChefCreateRequest): Promise<ChefDto>;
  updateChef(id: string, chefData: ChefUpdateRequest): Promise<ChefDto | null>;
  deleteChef(id: string): Promise<boolean>; // Delete a chef by ID
  getFreeChefs(): Promise<ChefDto[]>; // Get chefs who are not busy
  assignOrderToChef(chefId: string, orderId: string): Promise<ChefDto | null>; // Assign an order to a chef
  orderPrepared(chefId: string): Promise<ChefDto | null>; // Mark an order as completed by a chef
}
