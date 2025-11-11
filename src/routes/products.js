import express from "express";
const productRoute = express.Router();
import { getAllproducts, createProduct } from "../controllers/productControllers.js";
import { verifyToken, verifyAdmin } from "../middleware/authMiddleware.js";

productRoute.get("/", getAllproducts);
productRoute.post("/",verifyToken, verifyAdmin, createProduct);

export default productRoute;