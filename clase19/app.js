import express from 'express';
import handlebars from 'express-handlebars'
import session from 'express-session'
import __dirname from './src/utils.js'
import MongoStore from 'connect-mongo'
import mongoose from 'mongoose';
//import productModel from './dao/models/products.model.js';
import router from './src/routes/app.routers.js';


const app = express()
const PORT = process.env.PORT || 8080



try {
    await mongoose.connect('mongodb+srv://proyectoCoder:coderhouse2023@backendlb.ye4s1zp.mongodb.net/')
    
} catch (error) {
    console.log(error)
}

// Sessions usando Mongo Storage
app.use(session({
    store: MongoStore.create({
        client: mongoose.connection.getClient(), 
        ttl: 3600
    }),
    secret: 'CoderSessionsPass',
    resave: true,
    saveUninitialized: true
}))


app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(`${__dirname}/public`));

app.engine('handlebars', handlebars.engine())
app.set('views', `${__dirname}/views`)
app.set('view engine', 'handlebars')



app.use('/', router)

app.listen(PORT, () => {console.log(`Server is active and running on port ${PORT}`)})




  





