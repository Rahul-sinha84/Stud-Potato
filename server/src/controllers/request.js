import Request from "../schema/request.js";
import Product from "../schema/product.js";
import User from "../schema/user.js";
import Utils from "../utils.js";

const controller = {
  createRequest: async (req, res) => {
    try {
      const { _id, isSeller } = req.current.user;
      if (isSeller)
        return Utils.handleSuccess(res, "Only Consumer is Allowed !!", {}, 401);
      const { product, description, tag } = req.body;
      const _product = await Product.findById(product);
      if (!_product)
        return Utils.handleSuccess(res, "No Product found !!", {}, 404);

      const seller = _product.seller;
      await Request.create({ tag, product, description, seller, consumer: _id })
        .then((_) =>
          Utils.handleSuccess(res, "Request Successfully created !!", {}, 200)
        )
        .catch((err) => Utils.handleError(res, err, 500));
    } catch (err) {
      return Utils.handleError(res, err, 500);
    }
  },
  getRequestByUser: async (req, res) => {
    try {
      const { _id, isSeller } = req.current.user;
      if (isSeller) {
        await Request.find({ seller: _id })
          .then(async (data) => {
            if (!data.length)
              return Utils.handleSuccess(res, "All Request !!", data, 200);
            let reqData = [];
            data.forEach(async (val, ind) => {
              const product = await Product.findById(val.product);
              console.log(product);
              reqData.push({ ...val._doc, product });
              if (ind === data.length - 1)
                Utils.handleSuccess(res, "All Request !!", reqData, 200);
            });
          })
          .catch((err) => Utils.handleError(res, err, 500));
      } else {
        await Request.find({ consumer: _id })
          .then((data) => Utils.handleSuccess(res, "All Request !!", data, 200))
          .catch((err) => Utils.handleError(res, err, 500));
      }
    } catch (err) {
      return Utils.handleError(res, err, 500);
    }
  },
  acceptOrDenyRequest: async (req, res) => {
    try {
      const { _id, isSeller } = req.current.user;
      const { requestId, isAccept } = req.body;
      if (!isSeller)
        return Utils.handleSuccess(res, "Only Seller required !!", {}, 401);

      const request = await Request.findById(requestId);

      if (!request.isPending)
        return Utils.handleSuccess(
          res,
          "Already responded to this request !!",
          {},
          400
        );

      if (!request)
        return Utils.handleSuccess(res, "No Request found !!", {}, 404);
      if (_id != request.seller.toString())
        return Utils.handleSuccess(res, "Not Authorized !!", {}, 401);

      const product = await Product.findById(request.product).exec();
      if (!product)
        return Utils.handleSuccess(res, "No Product found !!", {}, 404);

      if (request.tag === "return") {
        if (isAccept) {
          product.isSold = false;
          product.consumer = null;
          product.dateOfPurchase = null;
          product.tokenId = null;
          product.save();

          request.isAccept = true;
          request.isPending = false;
          request.msgBySeller = "Return request accepted by seller";
          request.save();

          return Utils.handleSuccess(
            res,
            "Return request accepted by seller !!",
            {},
            200
          );
        } else {
          request.isAccept = false;
          request.isPending = false;
          request.msgBySeller = "Return request declined by seller";
          request.save();
          return Utils.handleSuccess(
            res,
            "Return request declined by seller !!",
            {},
            200
          );
        }
      } else {
        //finding whether the seller has similar model or not (to replace)
        if (isAccept) {
          const productWithSameModel = await Product.find({
            _id: {
              $ne: product._id,
            },
            seller: product.seller,
            modelNumber: product.modelNumber,
            isSold: false,
          }).exec();
          // const
          if (!productWithSameModel.length) {
            request.isAccept = false;
            request.isPending = false;
            request.msgBySeller =
              "Currently no similar product for replacement is available, please generate request after sometime";
            request.save();
            return Utils.handleSuccess(
              res,
              "Replacement request declined by seller due to inavailability of product !!",
              {},
              200
            );
          }
          request.isAccept = true;
          request.isPending = false;
          request.msgBySeller = "Replacement request is accepted by seller";
          request.save();

          let newProduct = productWithSameModel[0];
          newProduct.isSold = true;
          newProduct.consumer = product.consumer;
          newProduct.dateOfPurchase = product.dateOfPurchase;
          newProduct.save();

          return Utils.handleSuccess(
            res,
            "Replacement request is accepted !!",
            productWithSameModel[0],
            200
          );
        } else {
          request.isAccept = false;
          request.isPending = false;
          request.msgBySeller = "Replacement request declined by seller";
          request.save();
          return Utils.handleSuccess(
            res,
            "Replacement request declined by seller !!",
            {},
            200
          );
        }
      }
    } catch (err) {
      return Utils.handleError(res, err, 500);
    }
  },
  resolveToRepair: async (req, res) => {
    try {
      const { _id, isSeller } = req.current.user;
      const { requestId } = req.body;

      if (!isSeller)
        return Utils.handleSuccess(res, "Only Seller required !!", {}, 401);

      const request = await Request.findById(requestId);

      if (!request)
        return Utils.handleSuccess(res, "No Request found !!", {}, 404);
      if (_id != request.seller.toString())
        return Utils.handleSuccess(res, "Not Authorized !!", {}, 401);

      request.isAccept = true;
      request.isPending = false;
      request.msgBySeller = "Replacement request is resolved by repair";
      request.save();

      return Utils.handleSuccess(
        res,
        "Successfully resolved the request as repair !!",
        {},
        200
      );
    } catch (err) {
      return Utils.handleError(res, err, 500);
    }
  },
};

export default controller;
