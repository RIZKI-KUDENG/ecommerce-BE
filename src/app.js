import express from "express";

const app = express();
const PORT = 3001;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

import router from "./routes/index.js";
app.use(router);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})