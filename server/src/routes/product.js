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
    "/:productId",
    authController.isAuthenticated,
    productController.getProductById
  );

  route.get(
    "/get/warranty/:warrantyId",
    authController.isAuthenticated,
    productController.getAllProductByWarranty
  );

  route.get(
    "/get/user",
    authController.isAuthenticated,
    productController.getAllProductByUser
  );

  route.get(
    "/get/user/sold",
    authController.isAuthenticated,
    productController.getAllSoldProduct
  );

  route.get(
    "/",
    authController.isAuthenticated,
    productController.getAllUnsoldProducts
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
