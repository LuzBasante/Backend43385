import express from 'express'; 
import productsRouter from './products.routers.js'; 
import cartsRouter  from './cart.routes.js' ; 
import viewsRouter from './views.routes.js'
import sessionRouter from './sessions.routes.js'
//import CartManager from '../managers/cartManager.js';

;
const router = express.Router (); 

router.use('/', viewsRouter); 
router.use('/api/products', productsRouter)
router.use('/api/carts', cartsRouter)
router.use('/api/sessions', sessionRouter)



export default router; 