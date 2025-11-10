import Products from "../models/products.js";
import { Op } from "sequelize";

export const getProducts = async (req, res) => {
  try {
    const { category, page = 1, sortBy = "id", search } = req.query;
    const limit = 10;
    const offset = (page - 1) * limit;
    const where = {};
    if (category) {
      where.category = category;
    }
    if (search) {
      where.name = {
        [Op.iLike]: `%${search}%`,
      };
    }
    const order = [[sortBy, "ASC"]];
    const products = await Products.findAll({ where, order, offset, limit });
    res.status(200).json({ message: "success", data: products });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Products.findByPk(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json({ message: "success", data: product });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const createProduct = async (req, res) => {
  try {
    const { name, description, price, image, category, stock, discount,status } = req.body;
    const product = await Products.create({
      name,
      description,
      price,
      image,
      category,
      stock,
      discount,
      status
    });
    res.status(201).json({ message: "success", data: product });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, price, image, category, stock } = req.body;
    const product = await Products.findByPk(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    await product.update({
      name,
      description,
      price,
      image,
      category,
      stock,
    });
    res.status(200).json({ message: "success", data: product });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Products.findByPk(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    await product.destroy();
    res.status(200).json({ message: "success", data: product });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};