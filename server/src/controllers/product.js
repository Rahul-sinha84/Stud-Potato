import Product from "../schema/product.js";
import Warranty from "../schema/warranty.js";
import Utils from "../utils.js";
import User from "../schema/user.js";

const controllers = {
  createProduct: async (req, res) => {
    try {
      const { _id, isSeller } = req.current.user;
      if (!req.body.warranty)
        return Utils.handleSuccess(res, "Warranty is required !!", {}, 500);

      if (!isSeller)
        return Utils.handleSuccess(res, "Only Seller is Allowed !!", {}, 401);

      await Product.create({ ...req.body, seller: _id })
        .then(
          async (_) =>
            await Warranty.findByIdAndUpdate(req.body.warranty, {
              isInUse: true,
            })
              .then((_) =>
                Utils.handleSuccess(
                  res,
                  "Product Successfully created !!",
                  {},
                  200
                )
              )
              .catch((err) => Utils.handleError(res, err, 500))
        )
        .catch((err) => Utils.handleError(res, err, 500));
    } catch (err) {
      return Utils.handleError(res, err, 500);
    }
  },
  getProductById: async (req, res) => {
    try {
      const { productId } = req.params;
      const product = await Product.findById(productId);
      if (!product)
        return Utils.handleSuccess(res, "No Product found !!", {}, 404);

      await Warranty.findById(product.warranty)
        .then((data) =>
          Utils.handleSuccess(
            res,
            "Product found !!",
            { ...product._doc, warranty: data },
            200
          )
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
        .then(async (data) => {
          let reqData = [];
          data.forEach(async (val, ind) => {
            const warranty = await Warranty.findById(val.warranty);
            const seller = await User.findById(val.seller);
            reqData.push({ ...val._doc, warranty: warranty, seller });
            if (ind === data.length - 1) {
              return Utils.handleSuccess(res, "All Products !!", reqData, 200);
            }
          });
        })
        .catch((err) => Utils.handleError(res, err, 500));
    } catch (err) {
      return Utils.handleError(res, err, 500);
    }
  },
  getAllSoldProduct: async (req, res) => {
    try {
      const { _id, isSeller } = req.current.user;
      if (!isSeller)
        return Utils.handleSuccess(res, "Only Seller required !!", {}, 401);

      await Product.find({ seller: _id, isSold: true })
        .then((data) => {
          let reqData = [];
          data.forEach(async (val, ind) => {
            const seller = await User.findById(val.seller);
            reqData.push({ ...val._doc, seller });
            if (ind === data.length - 1)
              return Utils.handleSuccess(
                res,
                "All Unsold Product !!",
                reqData,
                200
              );
          });
        })
        .catch((err) => Utils.handleError(res, err, 500));
    } catch (err) {
      return Utils.handleError(res, err, 500);
    }
  },
  getAllUnsoldProducts: async (req, res) => {
    try {
      await Product.find({ isSold: false }).then((data) => {
        let reqData = [];
        data.forEach(async (val, ind) => {
          const seller = await User.findById(val.seller);
          const warranty = await Warranty.findById(val.warranty);

          reqData.push({ ...val._doc, seller, warranty });

          if (ind === data.length - 1)
            Utils.handleSuccess(res, "All Unsold Products !!", reqData, 200);
        });
      });
    } catch (err) {
      return Utils.handleError(res, err, 500);
    }
  },
  editProduct: async (req, res) => {
    try {
      const { productId } = req.params;
      const { _id } = req.current.user;
      const { name, warranty, price, modelNumber, serialNumber, imgSrc } =
        req.body;

      const product = await Product.findById(productId);
      if (!product)
        return Utils.handleSuccess(res, "No Product found !!", {}, 404);

      if (product.seller.toString() !== _id)
        return Utils.handleSuccess(res, "Not Authorized !!", {}, 401);

      await Product.findByIdAndUpdate(productId, {
        name: name ? name : product.name,
        warranty: warranty ? warranty : product.warranty,
        price: price ? price : product.price,
        modelNumber: modelNumber ? modelNumber : product.modelNumber,
        serialNumber: serialNumber ? serialNumber : product.serialNumber,
        imgSrc: imgSrc ? imgSrc : product.imgSrc,
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
      const { tokenId } = req.body;

      const product = await Product.findById(productId);
      if (!product)
        return Utils.handleSuccess(res, "No Product found !!", {}, 404);

      if (product.isSold)
        return Utils.handleSuccess(res, "Product Already Bought !!", {}, 403);

      const date = new Date();

      await Product.findByIdAndUpdate(productId, {
        ...product._doc,
        isSold: true,
        consumer: _id,
        dateOfPurchase: date.getTime(),
        tokenId,
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
