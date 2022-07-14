import express from "express";
import cors from "cors";
import "./db/config.js";
import authRoute from "./routes/auth.js";

const PORT = process.env.PORT;
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//all route files
authRoute(app);

app.listen(PORT, () => console.log(`Server started on: ${PORT}`));
