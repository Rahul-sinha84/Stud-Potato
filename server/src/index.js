import express from "express";
import cors from "cors";
import "./db/config.js";
import authRoute from "./routes/auth.js";
import userRoute from "./routes/user.js";
import warrantyRoute from "./routes/warranty.js";
import productRoute from "./routes/product.js";
import requestRoute from "./routes/request.js";
import fast2sms from "fast-two-sms";

const PORT = process.env.PORT;
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//all route files
authRoute(app);
userRoute(app);
warrantyRoute(app);
productRoute(app);
requestRoute(app);

app.listen(PORT, () => console.log(`Server started on: ${PORT}`));
