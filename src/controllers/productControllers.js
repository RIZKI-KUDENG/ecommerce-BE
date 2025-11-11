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
        {model: Categories, as: "category", attributes: ["id", "name"]},
        {model: ProductVariant, as: "productVariants", include: [{model: StockProduct, as: "stockProducts"}]},
      ]
    });
    res.status(200).json({message: "success", data: data})
  } catch (error) {
    res.status(500).json({message: "Internal Server Error", error: error.message})
  }
};

export const createProduct = async (req, res) => {
  try {
    const { name, description , basePrice, image, categoryId} = req.body;
    const newProduct = await Products.create({
      name,
      description,
      base_price: basePrice,
      image,
      category_id: categoryId
    })
    res.status(201).json({message: "success", data: newProduct})
  }catch(err){
    res.status(500).json({message: "Internal Server Error", error: err.message})
  }
}
