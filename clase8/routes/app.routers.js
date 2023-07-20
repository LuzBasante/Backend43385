import express from 'express'; 
import productsRouter from './products.routers.js'; 
import cartsRouter  from './cart.routers.js' ; 
import ProductManager from '../managers/productManager.js';
//import CartManager from '../managers/cartManager.js';

;
const router = express.Router (); 

const productManager= new ProductManager('/files/products.json')

const appRouters= (cartManager, productManager) => {
    router.use('/products', productsRouter(productManager));
    router.use('/carts', cartsRouter(cartManager,productManager));
    
    return router;
};

export default appRouters; 