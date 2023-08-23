import cartModel from "../models/cart.model.js"; 


export default class CartsManager {
    constructor(){
        console.log('working carts with DB')
    }

    getCarts= async () => {
        const carts= await cartModel.find().lean()
        return carts
    }

    addCart = async () => {
        const newCart = {
            products:[
                {
                    product: _id,
                    quantity: 1
                }
            ]
          };
        const result = await cartModel.create(newCart)
        return result
    }

    getCartById = async(id) => {
        const carts= await cartModel.findOne ({_id: id})
        return carts
    }

    updateCart= async(id, cart) =>{
        const result = await cartModel.updateOne(
            {_id: id}, 
            {$push: {products: {$each: products}}}
        )
        return result
    }



    deleteCart = async (id) => {
        await cartModel.deleteOne({_id: id})
    }

}