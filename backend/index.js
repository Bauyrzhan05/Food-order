import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { connectDB } from './config/db.js';
import foodRouter from './routers/foodRoute.js';
import userRouter from './routers/userRoute.js';
import 'dotenv/config';

const app = express();

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cors());

// db connection
connectDB();

// api endpoints
app.use("/api/food", foodRouter);
app.use("/images", express.static("uploads"));
app.use("/api/user", userRouter);






app.listen(3030, () => {
    console.log('Server 3030 startted...');
})

//  mongodb+srv://bauyrzhan:erman2023@cluster0.cdvoh.mongodb.net/?