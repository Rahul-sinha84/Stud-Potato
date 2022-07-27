import express from "express";
import authController from "../controllers/auth.js";
import requestController from "../controllers/request.js";

const route = express.Router();

const routes = (app) => {
  route.post(
    "/",
    authController.isAuthenticated,
    requestController.createRequest
  );

  route.get(
    "/",
    authController.isAuthenticated,
    requestController.getRequestByUser
  );

  route.put(
    "/action",
    authController.isAuthenticated,
    requestController.acceptOrDenyRequest
  );

  route.put(
    "/action/repair",
    authController.isAuthenticated,
    requestController.resolveToRepair
  );

  app.use("/api/request", route);
};

export default routes;
