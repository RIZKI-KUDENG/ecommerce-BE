import express from "express";
import { createStock } from "../controllers/stockControllers.js";

const stockRoute = express.Router();

stockRoute.post("/", createStock);

export default stockRoute;