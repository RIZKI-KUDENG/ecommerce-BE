import { DataTypes } from "sequelize";
import sequelize from "../utils/db.js";

const ProductVariant = sequelize.define("productVariant", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
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
    variant_name:{
        type: DataTypes.STRING,
        allowNull: false
    },
    additional_price: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    created_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    }
},
{
    tableName: "productVariant",
    timestamps: false,
    underscored: true
})
export default ProductVariant;
