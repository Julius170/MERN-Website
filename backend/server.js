import express  from "express";
import data from "./data.js";
import cors from 'cors';

const app  = express();
app.use(cors());


const headers = {
        'Access-Control-Allow-Origin': '*'
    };

app.get('/api/products', (req, res)=> {
    res.send(data.products)
    res.header("Access-Control-Allow-Origin", "*");
    {headers}
});

const port = process.env.port || 5000

app.listen(port, ()=> {
    console.log(`server is running on port http://localhost:${port}/`);
});
