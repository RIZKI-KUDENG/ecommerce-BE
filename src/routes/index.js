import express from "express";
import authRoute from "./auth.js";
import productRoute from "./products.js";
import categoryRoute from "./category.js";
import variantRoute from "./variant.js";
import stockRoute from "./stock.js";
import cartRoute from "./cart.js";
import wishlistRoute from "./wishlist.js";
const router = express.Router();

router.use("/auth", authRoute);
router.use("/products", productRoute);
router.use("/categories", categoryRoute);
router.use("/variants", variantRoute);
router.use("/stocks", stockRoute);
router.use("/carts", cartRoute);
router.use("/wishlists", wishlistRoute);


export default router;