class ProductManager {
    constructor(){
        this.products= []; }

    getProducts= () => {
        return this.products; }; 
    addProduct =(title, description, price, thumbnail, code, stock) => {
        if(!title || !description || !price || !thumbnail || !code || !stock ){
            console.log (`Todos los campos son obligatorios.`)
            return
        }
        const product ={
            title,
            description,
            price,
            thumbnail, 
            code, 
            stock, 
        }; 
        if (this.products.length === 0 ){
            product.id = 1; } 
        else { product.id = this.products [this.products.length -1].id +1 }

        const validationCode =  this.products.find (
                (product) => product.code === code);

        if (validationCode){
            console.log(`the code ${validationCode} is already in use`);
            return; }
        else {this.products.push (product); }
    };

    getProductById =(id) => {
        const productId = this.products.find ((product) => product.id=== id); 
        if(!productId){
            console.error("Product not found"); }
        else {
            return console.log (productId); }
    };
 }

 const product = new ProductManager(); 
 console.log (product.getProducts()); 

 product.addProduct ("product prueba", "Este es un producto prueba", 200, "Sin imagen","ABC123", 25);
 product.addProduct ("product prueba2", "Este es un producto prueba", 200, "Sin imagen","ABC124", 25);
 product.addProduct ("product prueba3", "Este es un producto prueba", 200, "Sin imagen","ABC124", 25);

console.log(product.getProducts()); 
console.log(product.getProductById(2)); 