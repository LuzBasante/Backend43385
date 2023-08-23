import { Router } from "express";
import productModel from "../dao/models/products.model.js";
import {privateAccess, publicAccess} from "../middlewares/middlewares.js"


const router = Router()

//const CartsManager= new CartsManager()

router.get('/register', publicAccess, (req, res) => {
    //Renderiza vista Register:
    res.render('register')
})

router.get('/login', publicAccess, (req, res) => {
    //Renderiza vista Login:
    res.render('login')
})

router.get('/products', async (req,res) => {
    const { page = 1, limit = 5, query, sort} = req.query

    
        const {
            docs,
            totalPages,
            hasPrevPage,
            hasNextPage,
            nextPage,
            prevPage,
     
        } = await productModel.paginate({}, {
            limit,
            page,
            query,
            sort,
            lean: true})
        
        const products = docs
        res.render('products', {
            products,
            totalPages,
            hasPrevPage,
            hasNextPage,
            nextPage,
            prevPage,
            user: req.session.user
        })
 
})




router.get('/carts/:cid', async (req,res) => {
    const cid = req.params.cid
    try {
        const cart = await CartsManager.getCartById(cartId)
        res.render('products', { cart})
    } catch (error) {
        console.log(error)
    }
})

export default router