import express from "express";
import {sequelize} from "./models/index.js";

const app = express();
const PORT = 3001;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

import cors from "cors";
app.use(cors());

import router from "./routes/index.js";
app.use(router);

const startServer = async () => {
    try {
        await sequelize.sync({alter: true});
        console.log("Database connected");
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    } catch (error) {
        console.error("error in starting server",error);
    }
}

startServer();