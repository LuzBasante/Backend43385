import express from 'express';
import __dirname from './src/utils.js'
import handlebars from 'express-handlebars'
import routers from './routers/app.routers.js'
import mongoose from 'mongoose';
//import productModel from './dao/models/products.model.js';


const app = express()
const PORT = process.env.PORT || 8080


app.use(express.static(`${__dirname}/public`))

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.engine('handlebars', handlebars.engine())
app.set('views', `${__dirname}/views`)
app.set('view engine', 'handlebars')

app.use('/', routers)



try {
    await mongoose.connect('mongodb+srv://luzbasante1:luzbasante1@backendlb.ye4s1zp.mongodb.net/')
    console.log('DB -ecommerce- connected')


} catch (error) {
    console.log(error)
}

app.listen(PORT, () => {console.log(`Server is active and running on port ${PORT}`)})




  





