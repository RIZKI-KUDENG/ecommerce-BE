import { DataTypes } from "sequelize";
import sequelize from "../utils/db.js";

const Wishlist = sequelize.define("wishlist", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: "users",
            key: "id"
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE"
    },
    product_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: "products",
            key: "id"
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE"
    },
    variant_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: "productVariant",
            key: "id"
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
    },
    stock_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: "stockProduct",
            key: "id"
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1
    },
    price: {
        type: DataTypes.DECIMAL,
        allowNull: false
    },
}, {
    tableName: "wishlist",
    timestamps: false
})

export default Wishlist;