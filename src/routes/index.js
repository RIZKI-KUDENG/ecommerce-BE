import express from "express";
import authRoute from "./auth.js";
import productRoute from "./products.js";
const router = express.Router();

router.use("/auth", authRoute);
router.use("/products", productRoute);


export default router;