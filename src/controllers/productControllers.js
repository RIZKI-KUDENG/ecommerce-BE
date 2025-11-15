import {
  Products,
  Categories,
  ProductVariant,
  StockProduct,
} from "../models/index.js";
import { Op } from "sequelize";

export const getAllproducts = async (req, res) => {
  try {
    const { category, search, sortBy, order, page, limit } = req.query;
    const where = {};
    if (category) where.category_id = category;
    if (search) where.name = { [Op.iLike]: `%${search}%` };
    const sortColumn = sortBy || "id";
    const sortOrder = order?.toUpperCase() === "DESC" ? "DESC" : "ASC";
    const pageNum = parseInt(page) || 1;
    const limitNum = parseInt(limit) || 10;
    const offset = (pageNum - 1) * limitNum;

    const { rows: data, count: total } = await Products.findAndCountAll({
      where,
      include: [
        { model: Categories, as: "category", attributes: ["id", "name"] },
        {
          model: ProductVariant,
          as: "productVariants",
          include: [{ model: StockProduct, as: "stockProducts" }],
        },
        {model : StockProduct, as: "stockProducts"},
      ],
      order: [[sortColumn, sortOrder]],
      limit: limitNum,
      offset: offset,
      distinct: true
    });
    res.status(200).json({ message: "success", 
      currentPage: pageNum,
      totalPages: Math.ceil(total / limitNum),
      totalProducts: total,
      data: data,
    })
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

export const createProduct = async (req, res) => {
  try {
    const { name, description, basePrice, image,brand, categoryId } = req.body;
    const newProduct = await Products.create({
      name,
      description,
      base_price: basePrice,
      image,
      brand,
      category_id: categoryId,
    });
    res.status(201).json({ message: "success", data: newProduct });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: err.message });
  }
};
