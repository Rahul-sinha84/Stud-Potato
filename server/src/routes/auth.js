import express from "express";
import authController from "../controllers/auth.js";
const route = express.Router();

const routes = (app) => {
  route.post("/signup", authController.signup);
  route.post("/login", authController.login);

  app.use("/api", route);
};

export default routes;
