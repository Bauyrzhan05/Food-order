import express from "express";
import { addFood, getFoodById, listFood, removeFood, updateFood } from "../controllers/foodController.js";
import multer from "multer";

const foodRouter = express.Router();

const storage = multer.diskStorage({
    destination: "uploads",
    filename: (req, file, cb) => {
        return cb(null, `${Date.now()}${file.originalname}`);
    }
});

const upload = multer({storage: storage});

foodRouter.post('/add', upload.single("image"), addFood);
foodRouter.get("/list", listFood);
foodRouter.post("/remove", removeFood);
foodRouter.patch("/:id", upload.single("image"), updateFood);
foodRouter.get("/:id", getFoodById);

export default foodRouter;