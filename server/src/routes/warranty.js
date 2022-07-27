import express from "express";
import warrantyController from "../controllers/warranty.js";
import authController from "../controllers/auth.js";

const route = express.Router();

const routes = (app) => {
  route.post(
    "/create",
    authController.isAuthenticated,
    warrantyController.createWarranty
  );
  route.get(
    "/:warrantyId",
    authController.isAuthenticated,
    warrantyController.getWarrantyFromId
  );

  route.get(
    "/",
    authController.isAuthenticated,
    warrantyController.getAllWarrantyOfUser
  );

  route.put(
    "/:warrantyId",
    authController.isAuthenticated,
    warrantyController.editWarranty
  );

  route.delete(
    "/:warrantyId",
    authController.isAuthenticated,
    warrantyController.deleteWarranty
  );

  app.use("/api/warranty", route);
};

export default routes;
