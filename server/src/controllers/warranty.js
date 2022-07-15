import User from "../schema/user.js";
import Warranty from "../schema/warranty.js";
import Utils from "../utils.js";

const controllers = {
  createWarranty: async (req, res) => {
    try {
      await Warranty.create({ ...req.body, seller: req.current.user._id })
        .then((_) => Utils.handleSuccess(res, "Warranty created !!", {}, 200))
        .catch((err) => Utils.handleError(res, err, 500));
    } catch (err) {
      return Utils.handleError(res, err, 500);
    }
  },
  getAllWarrantyFromId: async (req, res) => {
    try {
      const seller = req.current.user._id;
      await Warranty.find({ seller })
        .then((data) => Utils.handleSuccess(res, "All Warranties", data, 200))
        .catch((err) => Utils.handleError(res, err, 500));
    } catch (err) {
      return Utils.handleError(res, err, 500);
    }
  },
  editWarranty: async (req, res) => {
    try {
      const { _id } = req.current.user;
      const { warrantyId } = req.params;
      const { validity, termsAndCondition, itemType } = req.body;

      const warranty = await Warranty.findById(warrantyId);
      if (!warranty)
        return Utils.handleSuccess(res, "Warranty not found !!", {}, 404);

      console.log(warranty.seller.toString(), _id);
      if (warranty.seller.toString() !== _id)
        return Utils.handleSuccess(res, "Not Authorized !!", {}, 401);

      await Warranty.findByIdAndUpdate(warrantyId, {
        validity: validity ? validity : warranty.validity,
        termsAndCondition: termsAndCondition
          ? termsAndCondition
          : warranty.termsAndCondition,
        itemType: itemType ? itemType : warranty.itemType,
      })
        .then((_) =>
          Utils.handleSuccess(res, "Successfully Updated !!", {}, 200)
        )
        .catch((err) => Utils.handleError(res, err, 500));
    } catch (err) {
      return Utils.handleError(res, err, 500);
    }
  },
  deleteWarranty: async (req, res) => {
    try {
      const { _id } = req.current.user;
      const { warrantyId } = req.params;

      const warranty = await Warranty.findById(warrantyId);

      if (!warranty)
        return Utils.handleSuccess(res, "Warranty not found !!", {}, 404);
      if (warranty.seller.toString() !== _id)
        return Utils.handleSuccess(res, "Not Authorized !!", {}, 401);

      await Warranty.findByIdAndDelete(warrantyId)
        .then((_) =>
          Utils.handleSuccess(res, "Successfully Deleted !!", {}, 200)
        )
        .catch((err) => Utils.handleError(res, err, 500));
    } catch (err) {
      return Utils.handleError(res, err, 500);
    }
  },
};

export default controllers;
