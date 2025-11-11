import express from "express";
import authRoute from "./auth.js";
import productRoute from "./products.js";
import categoryRoute from "./category.js";
const router = express.Router();

router.use("/auth", authRoute);
router.use("/products", productRoute);
router.use("/categories", categoryRoute);


export default router;