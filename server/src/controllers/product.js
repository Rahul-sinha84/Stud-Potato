import Product from "../schema/product.js";
import Utils from "../utils.js";

const controllers = {
  createProduct: async (req, res) => {
    try {
      const { _id } = req.current.user;
      await Product.create({ ...req.body, seller: _id })
        .then((_) =>
          Utils.handleSuccess(res, "Product Successfully created !!", {}, 200)
        )
        .catch((err) => Utils.handleError(res, err, 500));
    } catch (err) {
      return Utils.handleError(res, err, 500);
    }
  },
  getAllProductByWarranty: async (req, res) => {
    try {
      const { warrantyId } = req.params;
      await Product.find({ warranty: warrantyId })
        .then((data) => Utils.handleSuccess(res, "All Products !!", data, 200))
        .catch((err) => Utils.handleError(res, err, 500));
    } catch (err) {
      return Utils.handleError(res, err, 500);
    }
  },
  getAllProductByUser: async (req, res) => {
    try {
      const { _id } = req.current.user;
      await Product.find({ seller: _id })
        .then((data) => Utils.handleSuccess(res, "All Products !!", data, 200))
        .catch((err) => Utils.handleError(res, err, 500));
    } catch (err) {
      return Utils.handleError(res, err, 500);
    }
  },
  editProduct: async (req, res) => {
    try {
      const { productId } = req.params;
      const { _id } = req.current.user;
      const { name, warranty, price } = req.body;

      const product = await Product.findById(productId);
      if (!product)
        return Utils.handleSuccess(res, "No Product found !!", {}, 404);

      if (product.seller.toString() !== _id)
        return Utils.handleSuccess(res, "Not Authorized !!", {}, 401);

      await Product.findByIdAndUpdate(productId, {
        name: name ? name : product.name,
        warranty: warranty ? warranty : product.warranty,
        price: price ? price : product.price,
      })
        .then((_) =>
          Utils.handleSuccess(res, "Product Successfully updated !!", {}, 200)
        )
        .catch((err) => Utils.handleError(res, err, 500));
    } catch (err) {
      return Utils.handleError(res, err, 500);
    }
  },
  deleteProduct: async (req, res) => {
    try {
      const { _id } = req.current.user;
      const { productId } = req.params;

      const product = await Product.findById(productId);
      if (!product)
        return Utils.handleSuccess(res, "Product not found !!", {}, 404);
      if (product.seller.toString() !== _id)
        return Utils.handleSuccess(res, "Not Authorized !!", {}, 401);

      await Product.findByIdAndDelete(productId)
        .then((_) =>
          Utils.handleSuccess(res, "Successfully deleted !!", {}, 200)
        )
        .catch((err) => Utils.handleError(res, err, 500));
    } catch (err) {
      return Utils.handleError(res, err, 500);
    }
  },
  buyProduct: async (req, res) => {
    try {
      const { _id } = req.current.user;
      const { productId } = req.params;

      const product = await Product.findById(productId);
      if (!product)
        return Utils.handleSuccess(res, "No Product found !!", {}, 404);

      const date = new Date();

      await Product.findByIdAndUpdate(productId, {
        ...product._doc,
        isSold: true,
        consumer: _id,
        dateOfPurchase: date.getTime(),
      })
        .then((_) =>
          Utils.handleSuccess(res, "Product Successfully updated !!", {}, 200)
        )
        .catch((err) => Utils.handleError(res, err, 500));
    } catch (err) {
      return Utils.handleError(res, err, 500);
    }
  },
};

export default controllers;
