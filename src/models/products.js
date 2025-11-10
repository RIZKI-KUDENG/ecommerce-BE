import { DataTypes } from "sequelize";
import sequelize from "../utils/db.js";

const Products = sequelize.define("products", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false
    },
    price: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    image: {
        type: DataTypes.STRING,
        allowNull: false
    },
    category: {
        type: DataTypes.STRING,
        allowNull: false
    },
    stock: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    discount: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false
    }
},
{
    tableName: "products"
})

sequelize.sync();
export default Products;