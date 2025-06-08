import * as express from "express";
import { UserController } from "../controllers/user/user.controller";

const router = express.Router();
const userController = new UserController();

/**
 * @swagger
 * /api/v1/users:
 *   get:
 *     summary: Retrieve a list of users
 *     responses:
 *       200:
 *         description: A list of users
 */
router.get("/", userController.getAllUser);

export default router;
