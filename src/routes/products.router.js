const { Router } = require('express')
const router = Router();
const fs = require('fs')




router.get('/', async (req, res) => {
    try {
        const { limit } = req.query
        const productManager = req.app.get('ProductManager')
        const products = await productManager.getProducts()

        if (limit >= 0) {
            res.json(products.slice(0, limit))
            return
        }
        res.json(products)
    }
    catch (err) {
        console.error("Error al procesar solicitud")
        throw (err)
    }
})

router.get('/:pid', async (req, res) => {
    try {
        const pid = +req.params.pid
        const productManager = req.app.get('ProductManager')
        const productFound = await productManager.getProductById(pid)
        if (isNaN(pid)) {
            // HTTP 400 => hay un error en el request o alguno de sus parámetros
            res.status(400).json({ error: "Invalid ID format" })
            return
        }
        if (productFound === undefined){
            res.status(400).json({ error: "No existe el producto solicitado" })
            return
        }
        res.json(productFound)


    }
    catch (err) {
        throw (err)
    }
})

router.post('/', async (req, res) => {
    try {
        const productManager = req.app.get('ProductManager')
        await productManager.addProduct(req.body)

    }
    catch (err) {

    }
})

router.put('/:pid', async (req, res) => {
    const pid = req.params.pid
    const productManager = req.app.get('ProductManager')
    productManager.updateProduct(pid, req.body)
})

router.delete('/:pid', async (req, res) => {
    const pid = req.params.pid
    const productManager = req.app.get('ProductManager')
    await productManager.addProduct(pid)
    if (isNaN(pid)) {
        res.status(400).json({ error: "formato de ID invalido" })
    }

    if (productIndex < 0) {
        res.status(404).json({ error: "Producto no encontrado" })
        return
    } else {
        await products.splice(productIndex, 1)
        await fs.promises.writeFile('./assets/Productos.json', JSON.stringify(products, null, '\t'))
        res.status(202).send({status:"Success!", Message: "El producto ha sido eliminado correctamente"})
    }




})

module.exports = router

