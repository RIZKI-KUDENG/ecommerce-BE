import express from "express"
import { getCategories, createCategories } from "../controllers/categoryControllers.js";

const categoryRoute = express.Router();

categoryRoute.get("/", getCategories);
categoryRoute.post("/", createCategories);

export default categoryRoute;