import { Categories } from "../models/index.js";

export const getCategories = async (req, res) => {
    try{
        const categories = await Categories.findAll();
        res.status(200).json({ message: "success", data: categories });
    }catch(err){
        console.error(err);
        res.status(500).json({ message: "Internal Server Error", error: err.message });
    }
}

export const createCategories = async (req, res) => {
    try{
        const {name} = req.body
        const category = await Categories.create({name})
        res.status(201).json({message: "success", data: category})
    }catch(err){
        console.error(err);
        res.status(500).json({ message: "Internal Server Error", error: err.message });
    }
}
