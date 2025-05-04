import mongoose from "mongoose";

export const connectDB = async () => {
    await mongoose.connect('mongodb+srv://bauyrzhan:erman2023@cluster0.cdvoh.mongodb.net/food-del').then(() => console.log('DB connected'));
}

