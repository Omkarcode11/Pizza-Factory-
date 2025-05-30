import express from "express";
import userRoutes from "./routes/user.routes";
import dotenv from "dotenv";
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./docs/swagger";

dotenv.config();

const app = express();

app.get("/", (req, res) => {
  res.send("Welcome to the Pizza Factory API!");
});

app.use(express.json());
app.use("/api/v1/users", userRoutes);

// Swagger route
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

export default app;
