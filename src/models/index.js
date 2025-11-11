import Categories from "./categories.js";
import Products from "./products.js";
import User from "./user.js";
import ProductVariant from "./productVariant.js";
import StockProduct from "./stockProduct.js";
import Carts from "./carts.js";
import Wishlist from "./wishlist.js";
import sequelize from "../utils/db.js";

//relasi antar tabel
//product => category (1:N)
Categories.hasMany(Products, {
  foreignKey: "category_id",
  as: "products",
});
Products.belongsTo(Categories, {
  foreignKey: "category_id",
  as: "category",
});

//product => productVariant (1:N)
Products.hasMany(ProductVariant, {
  foreignKey: "product_id",
  as: "productVariants",
});
ProductVariant.belongsTo(Products, {
  foreignKey: "product_id",
  as: "product",
});

//product => stockProduct (1:N)
Products.hasMany(StockProduct, {
  foreignKey: "product_id",
  as: "stockProducts",
});
StockProduct.belongsTo(Products, {
  foreignKey: "product_id",
  as: "product",
});

//productVariant => stockProduct (1:N)
ProductVariant.hasMany(StockProduct, {
  foreignKey: "variant_id",
  as: "stockProducts",
});
StockProduct.belongsTo(ProductVariant, {
  foreignKey: "variant_id",
  as: "productVariant",
});
//user => carts (1:N)
User.hasMany(Carts, {
  foreignKey: "user_id",
  as: "carts",
});
Carts.belongsTo(User, {
  foreignKey: "user_id",
  as: "user",
});
//user => wishlist (1:N)
User.hasMany(Wishlist, {
  foreignKey: "user_id",
  as: "wishlists",
});
Wishlist.belongsTo(User, {
  foreignKey: "user_id",
  as: "user",
});
Carts.belongsTo(Products, {
  foreignKey: "product_id",
  as: "products" // Samakan 'as' dengan di controller Anda
});

// Carts => ProductVariant (N:1)
Carts.belongsTo(ProductVariant, {
  foreignKey: "variant_id",
  as: "productVariants" // Samakan 'as' dengan di controller Anda
});

// Carts => StockProduct (N:1)
Carts.belongsTo(StockProduct, {
  foreignKey: "stock_id",
  as: "stockProducts" // Samakan 'as' dengan di controller Anda
});

// Lakukan hal yang sama untuk Wishlist
// Wishlist => Products (N:1)
Wishlist.belongsTo(Products, {
  foreignKey: "product_id",
  as: "products"
});

// Wishlist => ProductVariant (N:1)
Wishlist.belongsTo(ProductVariant, {
  foreignKey: "variant_id",
  as: "productVariants"
});

// Wishlist => StockProduct (N:1)
Wishlist.belongsTo(StockProduct, {
  foreignKey: "stock_id",
  as: "stockProducts"
});
export { sequelize,Categories, Products, User, ProductVariant, StockProduct, Carts, Wishlist };
