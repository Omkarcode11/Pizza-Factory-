import { Request, Response } from "express";
import { UserService } from "../../service/user/user.service";
import { IUserService } from "../../service/user/types";

export class UserController {
  private userService: IUserService;

  constructor(userService: IUserService = new UserService()) {
    this.userService = userService;
  }

  public getAllUser = async (req: Request, res: Response) => {
    try {
      const users = await this.userService.getAllUser();
      res.json(users);
    } catch (error) {
      res.status(500).json({ message: "Error fetching users" });
    }
  };

  public createUser = async (req: Request, res: Response): Promise<void> => {
    try {
      const user = await this.userService.createUser(req.body);
      res.status(201).json(user);
    } catch (error) {
      res.status(400).json({ error: (error as Error).message });
    }
  };

  public updateUser = async (req: Request, res: Response): Promise<void> => {
    try {
      const userId = req.params.id;
      const updatedUser = await this.userService.updateUser(userId, req.body);
      if (!updatedUser) {
        res.status(404).json({ error: "User not found" });
        return;
      }
      res.status(200).json(updatedUser);
    } catch (error) {
      res.status(400).json({ error: (error as Error).message });
    }
  };

  public deleteUser = async (req: Request, res: Response): Promise<void> => {
    try {
      const userId = req.params.id;
      const deleted = await this.userService.deleteUser(userId);
      if (!deleted) {
        res.status(404).json({ error: "User not found" });
        return;
      }
      res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
      res.status(400).json({ error: (error as Error).message });
    }
  };

  public createCustomer = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    try {
      const customer = await this.userService.createCustomer(req.body);
      res.status(201).json(customer);
    } catch (error) {
      res.status(400).json({ error: (error as Error).message });
    }
  };

  public createManager = async (req: Request, res: Response): Promise<void> => {
    try {
      const manager = await this.userService.createManager(req.body);
      res.status(201).json(manager);
    } catch (error) {
      res.status(400).json({ error: (error as Error).message });
    }
  };

  public createDeliveryAgent = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    try {
      const agent = await this.userService.createDeliveryAgent(req.body);
      res.status(201).json(agent);
    } catch (error) {
      res.status(400).json({ error: (error as Error).message });
    }
  };
}
