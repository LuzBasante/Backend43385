import express from 'express'; 
import productsRouter from './products.routers.js'; 
import cartsRouter  from './cart.routes.js' ; 
import viewsRouter from './views.routes.js'
//import CartManager from '../managers/cartManager.js';

;
const router = express.Router (); 

router.use('/', viewsRouter); 
router.use('/api/products', productsRouter)
router.use('/api/carts', cartsRouter)



export default router; 