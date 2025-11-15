import express from "express"
import { createVariant, getVariantById } from "../controllers/variantControllers.js"

const variantRoute = express.Router();

variantRoute.post("/", createVariant);
variantRoute.get("/:id", getVariantById);

export default variantRoute;