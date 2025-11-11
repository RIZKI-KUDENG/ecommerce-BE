import express from "express";
import { getCartByUser, addToCart } from "../controllers/cartControllers.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const cartRoute = express.Router();

cartRoute.get("/:user_id", verifyToken, getCartByUser);
cartRoute.post("/", verifyToken, addToCart);

export default cartRoute;