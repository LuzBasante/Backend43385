import { Console } from 'console';
import fs from 'fs';

export default class ProductManager {
    constructor(path){
        this.path = path ;
    }

    getProducts = async () => {
        try {
            if (fs.existsSync(this.path)) {
                const data = await fs.promises.readFile (this.path,'utf-8' );
                console.log(data);
                const product = JSON.parse(data); 
                return product; 
            }
            else { return []; }
        }catch(error) {
            console.log(error); 
        }
    }

    addProduct = async (product) => {
        try {
            const products = await this.getProducts(); 

            if (!(product.title && product.description && product.price && product.thumbnail && product.code && product.price && product.stock)) {
                console.log ("")
                return
        }
        products.lenght ===0 ? product.id : product.id = products [products.length - 1].id + 1
        products.find((el) => el.code === product.code)
                    ? console.log(`el producto seleccionado ya existe.`) : product.push(product);

            await fs.promises.writeFile(this.path, JSON.stringify(users,null,'\t'))

            return product; 
   
        } catch(error) {
            console.log(error); 
        }

    } 

    getProductById = async (id) => {
        const product = await this.getProducts( ); 
        const productById = this.products.find((product)=> product.id === id); 
        productById ? console.log(productById) : console.log ("Product not found");
}; 



updateProduct = async (id, obj) => {
    try{
        const products =await this.getProducts (); 
        const productIndex = products.findIndex (product=> product.id === id )
        if (productIndex !== -1) {
            products[productIndex] = {...products[productIndex], ...obj}
            await fs.promises.writeFile(this.path, JSON.stringify(products, null, "\t"));
            console.log(await this.getProducts());
        }
        else {
            console.log ("no se encuentra el producto que quiere actualizar."); 
        }
    } catch (error) {
        console.log (error); 
    }
}

deleteProduct = async (id) => {
    try {
        let products = await this.getProducts(); 
        const productIndex = products.findIndex (product => product.id === id)
        if (productIndex !== -1) {
            products.splice (productIndex,1); 
            await fs.promises.writeFile(this.path, JSON.stringify(products, null,'\t' ));
        } else {
            console.log ('No se encontró el producto que desea eliminar.')
        }
    } catch (error) {
        console.log(error);
    }
}

}