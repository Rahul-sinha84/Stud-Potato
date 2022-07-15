import User from "../schema/user.js";
import Warranty from "../schema/warranty.js";
import Utils from "../utils.js";

const controllers = {
  getUserById: async (req, res) => {
    try {
      const { userId } = req.params;
      const user = await User.findById({ _id: userId });
      if (!user) return Utils.handleSuccess(res, "User not found !!", {}, 404);

      return Utils.handleSuccess(res, "User found !!", user, 200);
    } catch (err) {
      return Utils.handleError(res, err, 500);
    }
  },
};

export default controllers;
