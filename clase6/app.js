import express from 'express'; 
import ProductManager from './productManager.js';

const app= express(); 
const productManager= new ProductManager('./Productos.json');

app.use (express.urlencoded({extended: true}));

app.get ('/products', async(req,res) => {
    const {limit} = req.query;
    const products = await productManager.getProducts();
    const productsLimit = products.splice (0,limit);
    !limit ? res.send({ products }) : res.send({ products: productsLimit });
});

app.get('./products/:pid', async (req, res) => {
    const pid = Number (req.params.pid);
    const product= await productManager.getProductById(pid);
    product? res.send ({product}) : res.send('product not found');

});

app.listen(8080,() => console.log('Listening on port 8080'));
