import express from 'express';
import Product from '../models/productModel.js';

const productRouter = express.Router();

productRouter.get('/', async(req, res) => {
    const products = await Product.find();
    res.send(products);
})

export default productRouter;


productRouter.get('/slug/:slug', async(req, res)=> {
    const product = await Product.findOne({slug: req.params.slug});
    if (product) {
        res.send(product)
    } else {
        res.send(404).send({message: 'Product Not found'});
    }
});


productRouter.get('/:id', async(req, res)=> {
    const product = await Product.findById(req.params.id);
    if (product) {
        res.send(product)
    } else {
        res.send(404).send({message: 'Product Not found'});
    }
});