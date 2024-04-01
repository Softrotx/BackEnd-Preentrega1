const { Router } = require('express')
const router = Router();

router.post('/', async (req, res) => {
    try {
        const CartManager = req.app.get('CartManager')
        const productToCart = await CartManager.addCart()
        console.log(productToCart)
        if (productToCart) {
            res.json({ status: "success!", Message: `El Carrito ID: ${productToCart.id} fue correctamente creado` })
            return
        }
        res.json({ status: "Error!", Message: "El Carrito no pudo ser creado" })



    }
    catch (err) {
        throw err

    }
})

router.get('/:cid', async (req, res) => {
    try {
        const cartId = req.params.cid
        console.log(cartId)
        if (cartId.length !== 24) {
            // HTTP 400 => hay un error en el request o alguno de sus parámetros
            res.status(400).json({ error: "Invalid ID format" })
            return
        }
        const CartManager = req.app.get('CartManager')
        const productToCart = await CartManager.getCartById(cartId)

        res.json(productToCart)



    }
    catch (err) {
        res.status(500).json({ error: "Internal Server Error" });
        throw (err)

    }


})

router.post('/:cid/product/:pid', async (req, res) => {
    try {
        const cartId = req.params.cid
        const productId = req.params.pid
        if (productId.length || cartId.length !== 24) {
            res.status(400).json({ error: "Invalid ID format" })
            return
        }
        const CartManager = req.app.get('CartManager')
        const ProductManager = req.app.get('ProductManager')
        const product = await ProductManager.getProductById(productId)
        if (!product){
            console.log("producto no encontrado")
            return
        }
        const productToCart = await CartManager.updateCart(cartId, product)

        if(productToCart){
            CartManager.updateFile()
            res.status(201).send({status: "Success!", message: `Producto ID ${productId} agregado correctamente al Carrito N° ${cartId}`})
        }
     
        
        
        
    }
    catch (err) {
        res.status(500).send({status: "Success!", message: `Error interno`,error: err })

}



})









module.exports = router

