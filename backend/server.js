import express  from "express";
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv'; 
import seedRouter from './routes/seedRoutes.js';
import productRouter from './routes/productRoutes.js';
import userRouter from './routes/userRoutes.js';
import orderRouter from "./routes/orderRoutes.js";


const app  = express();
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get('/api/keys/paypal', (req, res) => {
    res.send(process.env.PAYPAL_CLIENT_ID || 'sb');
});


app.use('/api/seed', seedRouter);
app.use('/api/product', productRouter);
app.use('/api/users', userRouter);
app.use('/api/orders', orderRouter);


dotenv.config();
mongoose.connect(process.env.MONGODB_URI).then(() => {
    console.log('connected to db')
}).catch(err =>{
    console.log(err.message);
});''


app.use((err, req, res, next) => {
    res.status(500).send({message:err.message });
});

const port = process.env.port || 5000

app.listen(port, ()=> {
    console.log(`server is running on port http://localhost:${port}/`);
});
