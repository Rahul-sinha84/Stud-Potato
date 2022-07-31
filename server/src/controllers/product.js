import mongoose from "mongoose";
import Product from "../schema/product.js";
import Warranty from "../schema/warranty.js";
import Utils from "../utils.js";
import User from "../schema/user.js";
import Request from "../schema/request.js";
import Nexmo from "nexmo";

// initialising nexmo for sending messages
const nexmo = new Nexmo(
  {
    apiKey: "255bea3d",
    apiSecret: "SL0AGvZGg0vPINTC",
  },
  { debug: true }
);

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
      const { _id, isSeller } = req.current.user;
      let query;
      if (isSeller) {
        query = { seller: _id };
      } else {
        query = { consumer: _id };
      }
      await Product.find(query)
        .then(async (data) => {
          if (!data.length)
            return Utils.handleSuccess(res, "All Products !!", data, 200);
          let reqData = [];
          data.forEach(async (val, ind) => {
            const warranty = await Warranty.findById(val.warranty);
            const seller = await User.findById(val.seller);
            const request = await Request.find({ product: val._id });
            let isPending = false;
            request.forEach((_val) => {
              if (_val.isPending) {
                isPending = true;
              }
            });

            reqData.push({
              ...val._doc,
              warranty: warranty,
              seller,
              isPendingRequest: isPending,
            });
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
          if (!data.length)
            return Utils.handleSuccess(res, "All unsold product !!", data, 200);
          let reqData = [];
          data.forEach(async (val, ind) => {
            const seller = await User.findById(val.seller);
            const consumer = await User.findById(val.consumer);
            const warranty = await Warranty.findById(val.warranty);
            reqData.push({ ...val._doc, seller, consumer, warranty });
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
        if (!data.length)
          return Utils.handleSuccess(res, "All Unsold Products !!", data, 200);
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
      const { _id, isSeller, phone } = req.current.user;
      const { productId } = req.params;
      const { tokenId, transactionAddress, isReplace = false } = req.body;

      const product = await Product.findById(productId);
      if (!product)
        return Utils.handleSuccess(res, "No Product found !!", {}, 404);

      if (product.isSold)
        return Utils.handleSuccess(res, "Product Already Bought !!", {}, 403);

      const date = new Date();

      let options = {};
      if (isReplace) {
        options = {
          ...product._doc,
          tokenId,
          transactionAddress,
        };
      } else {
        options = {
          ...product._doc,
          isSold: true,
          consumer: _id,
          dateOfPurchase: date.getTime(),
          tokenId,
          transactionAddress,
        };
      }
      await Product.findByIdAndUpdate(productId, options)
        .then((_) => {
          //sending confirmation message to consumer
          // for now only whitelisted numbers can recieve the message as we are using the trial version of nexmo

          const from = "Vonage APIs";
          const to = `91${phone}`;
          const text = `Congratulations for your new purchase from Stud-Potato, of serial number: ${product.serialNumber} and of id: ${product._id}`;

          nexmo.message.sendSms(from, to, text, (err, responseData) => {
            if (err) {
              console.log(err);
            } else {
              if (responseData.messages[0]["status"] === "0") {
                console.log("Message sent successfully.");
              } else {
                console.log(
                  `Message failed with error: ${responseData.messages[0]["error-text"]}`
                );
              }
            }
          });

          return Utils.handleSuccess(
            res,
            "Product Successfully updated !!",
            {},
            200
          );
        })
        .catch((err) => Utils.handleError(res, err, 500));
    } catch (err) {
      return Utils.handleError(res, err, 500);
    }
  },
  replaceProduct: async (req, res) => {
    try {
      const { isSeller } = req.current.user;
      if (!isSeller)
        return Utils.handleSuccess(res, "Only Seller Required !!", {}, 401);
      const { oldProductId, newProductId, transactionAddress, tokenId } =
        req.body;
      const oldProductIdMongoose = mongoose.Types.ObjectId(oldProductId);
      const newProductIdMongoose = mongoose.Types.ObjectId(newProductId);
      await Product.findById(oldProductIdMongoose)
        .then(async (oldProduct) => {
          const options = {
            isSold: true,
            transactionAddress,
            tokenId,
            dateOfPurchase: oldProduct.dateOfPurchase,
            consumer: mongoose.Types.ObjectId(oldProduct.consumer),
          };
          const requests = await Request.find({ product: oldProduct._id });
          requests.forEach(async ({ _id }) => {
            await Request.findByIdAndRemove(_id);
          });

          await Product.findByIdAndRemove(oldProductIdMongoose);
          await Product.findByIdAndUpdate(newProductIdMongoose, options).then(
            (response) =>
              Utils.handleSuccess(
                res,
                "Product successfully replaced !!",
                {},
                200
              )
          );
        })
        .catch((err) => Utils.handleError(res, err, 500));
    } catch (err) {
      return Utils.handleError(res, err, 500);
    }
  },
};

export default controllers;
