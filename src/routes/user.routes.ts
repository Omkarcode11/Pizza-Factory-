import * as express from "express";
import { getUsers } from "../controllers/user.controller";

const router = express.Router();

/**
 * @swagger
 * /api/v1/users:
 *   get:
 *     summary: Retrieve a list of users
 *     responses:
 *       200:
 *         description: A list of users
 */
router.get("/", getUsers);

export default router;
