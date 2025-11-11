import { StockProduct } from "../models/index.js";

export const createStock = async (req, res) => {
    try {
        const {productId, variantId, color, stock, price, image} = req.body;
        const newStock = await StockProduct.create({
            product_id: productId,
            variant_id: variantId,
            color,
            stock,
            price,
            image
        })
        res.status(201).json({message: "success", data: newStock})
    } catch (error) {
        res.status(500).json({message: "Internal Server Error", error: error.message})
    }
}