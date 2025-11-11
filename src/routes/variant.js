import express from "express"
import { createVariant } from "../controllers/variantControllers.js"

const variantRoute = express.Router();

variantRoute.post("/", createVariant);

export default variantRoute;