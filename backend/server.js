import express  from "express";
import data from "./data.js";
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv'; 
import seedRouter from './routes/seedRoutes.js'
import productRouter from './routes/productRoutes.js'

const app  = express();
app.use(cors());

app.use('/api/seed', seedRouter);
app.use('/api/product', productRouter);


dotenv.config();
mongoose.connect(process.env.MONGODB_URI).then(() => {
    console.log('connected to db')
}).catch(err =>{
    console.log(err.message);
});



const port = process.env.port || 5000

app.listen(port, ()=> {
    console.log(`server is running on port http://localhost:${port}/`);
});
