import express from "express";
const productRoute = express.Router();
import { getAllproducts, createProduct } from "../controllers/productControllers.js";

productRoute.get("/", getAllproducts);
productRoute.post("/", createProduct);

export default productRoute;