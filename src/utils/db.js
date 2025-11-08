import {sequelize} from "sequelize";

import "dotenv/config";

const db = new sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD
)