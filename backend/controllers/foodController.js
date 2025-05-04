import foodModel from "../models/foodModel.js";
import fs from "fs";

// add food item
const addFood = async (req, res) => {

    let image_filename = `${req.file.filename}`

    const food = new foodModel({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        category: req.body.category,
        image: image_filename
    });

    try {
        food.save();
        res.json({success: true, message: "Food added"});

    }catch(err) {
        res.json({success: false, message: "Error..."});
    }

}

// all food items
const listFood = async (req, res) => {
    try {
        const foods = await foodModel.find({});
        res.json({success: true, data: foods});
    }catch (error){
        console.log(error);
        res.json({success: false, message: "Error..."});
    }
}

export const getFoodById = async (req, res) => {
    try {
        const food = await foodModel.findById(req.params.id);
        if (!food) {
            return res.status(404).json({ success: false, message: "Food not found" });
        }
        res.json({ success: true, data: food });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Server Error" });
    }
};

// remove food item
const removeFood = async (req, res) => {
    try {
        const food = await foodModel.findById(req.body.id);
        fs.unlink(`uploads/${food.image}`, () =>{} )

        await foodModel.findByIdAndDelete(req.body.id);
        res.json({success: true, message: "Food removed"});
    } catch (error) {
        console.log(error);
        res.json({success: false, message: "Error..."})
    }
}


const updateFood = async (req, res) => {
    try {
        const id = req.params.id;
        const food = await foodModel.findById(id);
        if (!food) {
            return res.status(404).json({ success: false, message: "Food not found" });
        }

        const updateData = {
            ...req.body,
        };

        if (req.file) {
            updateData.image = req.file.filename;   
        }

        
        await foodModel.findByIdAndUpdate(id, updateData, { new: true });

        res.status(200).json({ success: true, message: "Food updated" });

    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Error updating food" });
    }
};



export {addFood, listFood, removeFood, updateFood};

