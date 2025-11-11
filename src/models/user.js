import { DataTypes } from "sequelize";
import sequelize from "../utils/db.js";
import { hashPassword } from "../utils/bcrypt.js";


const User = sequelize.define("user", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: true
    },
    role: {
        type: DataTypes.ENUM("admin", "user"),
        allowNull: false,
        defaultValue: "user"
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        set(value) {
            const hashed = hashPassword(value);
            this.setDataValue("password", hashed)
        }
    }
},
{
    tableName: "users"
}
)
export default User;