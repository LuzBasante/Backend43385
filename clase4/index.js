import ProductManager from "./managers/productManager"; 

const manager = new ProductManager (`./files/Productos.json`); 

const env= async () => {
    let Productos = await manager.getProducts(); 
    console.log (Productos); 

    const product = {
        title: "pruba"
    }; 

    await managers.updateProduct(3, product); 
    await managers. deleteProduct(1);
}

env()