import bcrypt, { compareSync } from "bcrypt";
import jwt from "jsonwebtoken";
import utils from "../utils.js";
import User from "../schema/user.js";

const controller = {
  signup: async (req, res) => {
    try {
      const { email, password } = req.body;
      let isAlreadyExist = await User.find({ email });

      if (isAlreadyExist.length)
        return res.status(400).json({
          status: res.statusCode,
          message: "User Already exists !!",
          data: {},
        });

      const hashedPassword = await bcrypt.hash(password, 10);

      await User.create({ ...req.body, password: hashedPassword })
        .then((_) =>
          utils.handleSuccess(res, "User created successfully !!", {}, 200)
        )
        .catch((err) => utils.handleError(res, err, 500));
    } catch (err) {
      return utils.handleError(res, err, 500);
    }
  },
  login: async (req, res) => {
    try {
      const { email } = req.body;
      const _password = req.body.password;

      const user = await User.findOne({ email });
      if (!user) return utils.handleSuccess(res, "User not exists !!", {}, 404);

      const { password, ...withoutPassword } = user._doc;

      if (await bcrypt.compare(_password, user.password)) {
        const accessToken = jwt.sign({ user }, process.env.ACCESS_TOKEN_SECRET);
        return utils.handleSuccess(
          res,
          "User Loggedin Successfully !!",
          {
            accessToken,
            user: withoutPassword,
          },
          200
        );
      } else {
        return utils.handleSuccess(res, "User not authorized !!", {}, 500);
      }
    } catch (err) {
      return utils.handleError(res, err, 500);
    }
  },
  isAuthenticated: async (req, res, next) => {
    try {
      const authHeader = req.headers["authorization"];
      const token = authHeader && authHeader.split(" ")[1];
      if (!token) return utils.handleSuccess(res, "JWT not provided", {}, 401);

      jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) return utils.handleError(res, err, 500);

        req.current = user;
        next();
      });
    } catch (err) {
      return utils.handleError(res, err, 500);
    }
  },
};

export default controller;
