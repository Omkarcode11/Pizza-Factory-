// src/service/user/user.service.ts

import User from "../../models/user.model";
import { CreateUserDto, IUserService, UpdateUserDto, UserDto } from "./types";

export class UserService implements IUserService {
  private mapToDto(user: any): UserDto {
    return {
      id: user._id.toString(),
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
      contact_number: user.contact_number,
      role: user.role,
      address: {
        street: user.address.street,
        city: user.address.city,
        state: user.address.state,
        zip: user.address.zip,
      },
    };
  }

  public async createUser(userData: CreateUserDto): Promise<UserDto> {
    const newUser = await User.create(userData);
    return this.mapToDto(newUser);
  }

  public async getAllUser(): Promise<UserDto[]> {
    const users = await User.find().exec();
    return users.map((user) => this.mapToDto(user));
  }

  public async updateUser(
    id: string,
    userData: UpdateUserDto
  ): Promise<UserDto | null> {
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { $set: userData },
      { new: true }
    );

    return updatedUser ? this.mapToDto(updatedUser) : null;
  }

  public async deleteUser(id: string): Promise<boolean> {
    const result = await User.findByIdAndDelete(id);
    return result !== null;
  }

  public async createCustomer(userData: CreateUserDto): Promise<UserDto> {
    return this.createUser({ ...userData, role: "CUSTOMER" });
  }

  public async createManager(userData: CreateUserDto): Promise<UserDto> {
    return this.createUser({ ...userData, role: "MANAGER" });
  }

  public async createDeliveryAgent(userData: CreateUserDto): Promise<UserDto> {
    return this.createUser({ ...userData, role: "DELIVERY_AGENT" });
  }
}
