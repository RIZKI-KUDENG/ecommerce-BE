import { ProductVariant } from "../models/index.js";

export const createVariant = async (req, res)=> {
    try{
        const {name, price, productId } = req.body;
        const variant = await ProductVariant.create({
            variant_name: name,
            additional_price: price,
            product_id: productId
        })
        res.status(201).json({message: "success", data: variant})
    }catch(err){
        console.error(err);
        res.status(500).json({ message: "Internal Server Error", error: err.message });
    }
}
export const getVariantById = async (req, res) => {
    try{
        const {id} = req.params;
        const variant = await ProductVariant.findAll({
            where: {
                product_id: id
            }
        });
        res.status(200).json({message: "success", data: variant})
    }catch(err){
        console.error(err);
        res.status(500).json({ message: "Internal Server Error", error: err.message });
    }
}