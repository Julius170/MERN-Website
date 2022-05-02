import express  from "express";
import data from "./data.js";
import cors from 'cors';

const app  = express();
app.use(cors());


app.get('/api/products', (req, res)=> {
    res.send(data.products)

});

app.get('/api/product/slug/:slug', (req, res)=> {
    const product = data.products.find(x => x.slug === req.params.slug);
    if (product) {
        res.send(product)
    } else {
        res.send(404).send({message: 'Product Not found'});
    }
});


app.get('/api/product/_id', (req, res)=> {
    const product = data.products.find(x => x._id === req.params.id);
    if (product) {
        res.send(product)
    } else {
        res.send(404).send({message: 'Product Not found'});
    }
});


const port = process.env.port || 5000

app.listen(port, ()=> {
    console.log(`server is running on port http://localhost:${port}/`);
});
