import { DataTypes } from "sequelize";
import sequelize from "../utils/db.js";

const Products = sequelize.define("products", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    category_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: "categories",
            key: "id"
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE"
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    brand: {
        type: DataTypes.STRING,
        allowNull: false
    },
    base_price: {
        type: DataTypes.DECIMAL(12, 2),
        allowNull: false
    },
    image: {
        type: DataTypes.STRING,
        allowNull: false
    },
},
{
    tableName: "products",
})


export default Products;