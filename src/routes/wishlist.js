import express from "express";
import { wishlist, addWishlist } from "../controllers/wishlistControllers.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const wishlistRoute = express.Router();

wishlistRoute.get("/:user_id",verifyToken, wishlist);
wishlistRoute.post("/",verifyToken, addWishlist);

export default wishlistRoute;