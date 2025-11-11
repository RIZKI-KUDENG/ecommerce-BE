import {
  Products,
  Categories,
  ProductVariant,
  StockProduct,
} from "../models/index.js";

export const getAllproducts = async (req, res) => {
  try {
    const data = await Products.findAll({
      include: [
        {
          model: Categories,
          as: "category",
        },
        {
          model: ProductVariant,
          as: "productVariants",
          include: { model: StockProduct, as: "stockProducts" },
        },
        {
          model: StockProduct,
          as: "stockProducts",
        },
      ],
    });
    res.status(200).json({message: "success", data: data})
  } catch (error) {
    res.status(500).json({message: "Internal Server Error", error: error.message})
  }
};
