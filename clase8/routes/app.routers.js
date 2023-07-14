import express from 'express'; 
import productsRouter from './products.routers.js'; 
import cartsRouter  from './cart.routers.js' ; 

const router = express.Router ()

router.use('/products', productsRouter)
router.use('/carts', cartsRouter)

export default router