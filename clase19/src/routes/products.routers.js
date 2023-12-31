import Router from 'express';
//import ProductManager from '../managers/ProductManager.js';
import ProductsManager from '../dao/dbManagers/products.manager.js';


const router = Router()
const productManager = new ProductsManager()


router.post('/', async (req,res) => {
    const products = await productManager.getProducts()    
    const product = req.body

    const foundCode = products.find(prod => prod.code === product.code)
    if(foundCode){
        return res.send({error:`product code ${product.code} already exists`})
    }

    if (!product.status){
        product.status = true
    }
    if(!product.title || !product.description || !product.code || !product.price || !product.category || !product.stock) {
        return res.status(400).send({error: 'incomplete values'})
    }
    const result = await productManager.addProduct(product)
    res.send({status:'success', result})
})



router.get('/', async (req, res) => {
  const products = await productManager.getProducts()
  const prods = []
  let limit = Number(req.query.limit)
  if(limit && limit <= products.length){
      for (let i = 0; i < limit; i++){
          prods.push(products[i])
      }
      return res.send({status: 'success', prods})
  }else {
      res.send({status: 'success', products})
  }
})

router.get('/:pid', async (req, res) => {
    let prodID = req.params.pid
    const prod = await productManager.getProductById(prodID)
    if(!prod) return res.send({error:`El producto N° ${prodID} no existe`})
    res.send({status: 'success', prod})
})


router.put('/:pid', async (req, res) => {
    const pid = req.params.pid
    const productUpdate = req.body
    if (!productUpdate  || productUpdate.id) {
      return res.status(400).send({ error: 'Wrong body format' });
    }
    await productManager.updateProduct(pid, productUpdate);
    res.send({ status: 'success', message: 'product updated' });
});


router.delete('/:pid', async (req, res) => {
    const pid = req.params.pid
    try {
        const products = await productManager.getProducts()
        const productIndex = products.findIndex(product => product._id == pid);
        if (productIndex < 0 ){
            res.status(404).send({status:'error', error: 'product not found'})
        } else {
            await productManager.deleteProduct(pid)
            res.send({status: 'success', message: 'product deleted'})
        }
    } catch (error) {
        console.log(error)
    }

})

export default router