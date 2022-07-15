import express from "express";
import productController from "../controllers/product.js";
import authController from "../controllers/auth.js";

const route = express.Router();

const routes = (app) => {
  route.post(
    "/create",
    authController.isAuthenticated,
    productController.createProduct
  );

  route.get(
    "/get/warranty/:warrantyId",
    authController.isAuthenticated,
    productController.getAllProductByWarranty
  );

  route.get(
    "/get",
    authController.isAuthenticated,
    productController.getAllProductByUser
  );

  route.put(
    "/:productId",
    authController.isAuthenticated,
    productController.editProduct
  );

  route.delete(
    "/:productId",
    authController.isAuthenticated,
    productController.deleteProduct
  );

  route.put(
    "/buy/:productId",
    authController.isAuthenticated,
    productController.buyProduct
  );

  app.use("/api/product", route);
};

export default routes;
