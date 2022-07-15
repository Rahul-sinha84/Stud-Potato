import express from "express";
import userController from "../controllers/user.js";
import authController from "../controllers/auth.js";

const route = express.Router();

const routes = (app) => {
  route.get("/:userId", userController.getUserById);

  app.use("/api/user", route);
};

export default routes;
