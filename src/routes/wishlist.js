import express from "express";
import { getWishlistByUser, addToWishlist } from "../controllers/wishlistControllers.js";

const wishlistRoute = express.Router();

wishlistRoute.get("/:user_id", getWishlistByUser);
wishlistRoute.post("/", addToWishlist);

export default wishlistRoute;