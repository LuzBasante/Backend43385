import fs from 'fs' ; 

class CartManager {
    constructor(path){
        this.path = path; 
    }
    getCarts = async () => {
        try {
            if (fs.existsSync(this.path)) {
                const carts = await fs.promises.readFile(this.path, 'utf-8');
                return JSON.parse(carts);
            } else {
                return [];
            }
        } catch (error) {
            console.log(error);
            return [];
        }
    }

    addCart = async (newCart) => {
        try {
            const carts = await this.getCarts();
            if (carts.length === 0) {
                newCart.id = 1;
            } else {
                newCart.id = carts[carts.length - 1].id + 1;
            }
            carts.push(newCart);
            await fs.promises.writeFile(this.path, JSON.stringify(carts, null, '\t'));
        } catch (error) {
            console.log(error);
        }
    }

    getCartById = async (cartId) => {
        try {
            const cart = await this.getCarts();
            const found = cart.find((c) => c.id === cartId);
            if (!found) {
                console.log(`Not Found`);
            } else {
                return found;
            }
        } catch (error) {
            console.log(error);
        }
    }

    addProductToCart = async (cartId, prod) => {
        try {
            let carts = await this.getCarts();
            const prodIndex = carts[cartId - 1].products.findIndex((p) => p.product === prod);
            if (prodIndex >= 0) {
                carts[cartId - 1].products[prodIndex].quantity++;
            } else {
                const newProd = {
                    product: prod,
                    quantity: 1,
                };
                carts[cartId - 1].products.push(newProd);
            }
            await fs.promises.writeFile(this.path, JSON.stringify(carts, null, '\t'));
        } catch (error) {
            console.log(error);
        }
    }
}

export default CartManager;