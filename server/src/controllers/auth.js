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
      const { email, password } = req.body;

      const user = await User.findOne({ email });
      if (!user) return utils.handleSuccess(res, "User not exists !!", {}, 200);

      console.log(password, user);
      if (await bcrypt.compare(password, user.password)) {
        console.log(process.env.ACCESS_TOKEN_SECRET);
        const accessToken = jwt.sign({ user }, process.env.ACCESS_TOKEN_SECRET);
        return utils.handleSuccess(
          res,
          "User Loggedin Successfully !!",
          {
            accessToken,
          },
          200
        );
      } else {
        return utils.handleError(res, "User not authorized !!", 500);
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

        req.user = user;
        next();
      });
    } catch (err) {
      return utils.handleError(res, err, 500);
    }
  },
};

export default controller;
