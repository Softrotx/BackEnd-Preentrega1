const ProductManager = require('./modules/DBModules/productManager')
const CartManager = require('./modules/DBModules/cartManager')
const productsRouter = require('./routes/products.router')
const cartsRouter = require('./routes/carts.router')
const express = require('express');
const { mongoose } = require('mongoose');




const app = express();
app.use(express.urlencoded({ extended: true }))
app.use(express.json())



app.use('/api/products', productsRouter )
app.use('/api/carts', cartsRouter )

const main = async () => {

    await mongoose.connect(
        'mongodb+srv://ccfuentes91:E410bd48b9*1234qwer@backendtesting.kmllbfb.mongodb.net/?retryWrites=true&w=majority&appName=backEndTesting',
        { dbName: 'backEndTesting' }
    )

    const productos = new ProductManager(`${__dirname}/assets/Productos.json`)
    const carrito = new CartManager(`${__dirname}/assets/Carts.json`)
    // await productos.iniciar()
    // await carrito.iniciar()
    app.set('ProductManager', productos)
    app.set('CartManager', carrito)
    app.listen(8080, () => {
        console.log('servidor listo')
    })
}

main()

