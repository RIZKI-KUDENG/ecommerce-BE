import { DataTypes } from "sequelize";
import sequelize from "../utils/db.js";

const Categories = sequelize.define("categories", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    }
},
{
    tableName: "categories",
    timestamps: false
})
export default Categories;