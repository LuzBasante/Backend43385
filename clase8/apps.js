import express from 'express'; 
import appRouters from './routes/app.routers.js'
import CartManager from './managers/cartManager.js';
import ProductManager from '../managers/ProductManager.js';
import productsRouter from './routes/products.routers.js'; 

const app= express ()
const PORT = process.env.PORT  || 8080

const cartManager= new CartManager('/files/carts.json'); 
const productManager= new ProductManager ('/files/products.json'); 

app.use(express.json())
app.use(express.urlencoded({extended: true}))


app.use('/api', appRouters(cartManager,productManager)); 
app.use('/api/products', productsRouter(productManager));


const connectedServer = app.listen(PORT, () => { console.log(`Servidor activo y esuchando en el puerto ${PORT}`) })

connectedServer.on('error', (error) => { console.error('Error: ', error) })
