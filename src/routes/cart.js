import express from "express";
import { getCartByUser, addToCart } from "../controllers/cartControllers.js";

const cartRoute = express.Router();

cartRoute.get("/:user_id", getCartByUser);
cartRoute.post("/", addToCart);

export default cartRoute;