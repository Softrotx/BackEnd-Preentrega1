const ProductManager = require('./modules/productManager')
const CartManager = require('./modules/cartManager')
const productsRouter = require('./routes/products.router')
const cartsRouter = require('./routes/carts.router')
const express = require('express');



const app = express();
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.get('/api', (req, res) => {
    res.send("hola Mundo")
})

app.use('/api/products', productsRouter )
app.use('/api/carts', cartsRouter )

const main = async () => {

    const productos = new ProductManager(`${__dirname}/assets/Productos.json`)
    const carrito = new CartManager(`${__dirname}/assets/Carts.json`)
    await productos.iniciar()
    await carrito.iniciar()
    app.set('ProductManager', productos)
    app.set('CartManager', carrito)
    app.listen(8080, () => {
        console.log('servidor listo')
    })
}

main()

