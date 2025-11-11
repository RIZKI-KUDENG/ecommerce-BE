import { Wishlist, Products, ProductVariant, StockProduct } from "../models/index.js";

export const wishlist = async (req, res) => {
  try {
    const { user_id } = req.params;
    const cart = await Wishlist.findAll({
      where: {
        user_id,
      },
      include: [
        { model: Products, as: "products" },
        { model: ProductVariant, as: "productVariants" },
        { model: StockProduct, as: "stockProducts" },
      ],
    });
    res.status(200).json({ message: "success", data: cart });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};
export const addWishlist = async (req, res) => {
    try{
        const {userId,productId, variantId, stockId, quantity, price } = req.body;
        const newCart = await Wishlist.create({
            user_id: userId,
            product_id: productId,
            variant_id: variantId,
            stock_id: stockId,
            quantity,
            price
        })
        res.status(201).json({message: "success", data: newCart})
    }catch(err){
        res.status(500).json({ message: "Internal Server Error", error: err.message });
    }
}