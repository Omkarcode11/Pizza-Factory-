// src/service/user/user.dto.ts

export interface CreateUserDto {
  first_name: string;
  last_name?: string;
  email: string;
  contact_number: string;
  password: string;
  address: {
    street: string;
    city: string;
    state: string;
    zip: string;
  };
  role?: "CUSTOMER" | "MANAGER" | "DELIVERY_AGENT";
}

export interface UpdateUserDto {
  first_name?: string;
  last_name?: string;
  contact_number?: string;
  password?: string;
  address?: {
    street?: string;
    city?: string;
    state?: string;
    zip?: string;
  };
}

export interface UserDto {
  id: string;
  first_name: string;
  last_name?: string;
  email: string;
  contact_number: string;
  role: "CUSTOMER" | "MANAGER" | "DELIVERY_AGENT";
  address: {
    street: string;
    city: string;
    state: string;
    zip: string;
  };
}


export interface IUserService {
  createUser(userData: CreateUserDto): Promise<UserDto>;
  updateUser(id: string, userData: UpdateUserDto): Promise<UserDto | null>;
  deleteUser(id: string): Promise<boolean>;
  createCustomer(userData: CreateUserDto): Promise<UserDto>;
  createManager(userData: CreateUserDto): Promise<UserDto>;
  createDeliveryAgent(userData: CreateUserDto): Promise<UserDto>;
  getAllUser():Promise<UserDto[]>
}
