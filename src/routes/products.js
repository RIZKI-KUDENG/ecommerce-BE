import express from "express";
const productRoute = express.Router();
import { getAllproducts, createProduct, getProductById } from "../controllers/productControllers.js";

productRoute.get("/", getAllproducts);
productRoute.post("/", createProduct);
productRoute.get("/:id", getProductById);

export default productRoute;