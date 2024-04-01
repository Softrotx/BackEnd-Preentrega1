const { throws } = require('assert');
const { Router } = require('express')
const router = Router();
const fs = require('fs')




router.get('/', async (req, res) => {
    try {
        const { limit } = req.query
        const ProductManager = req.app.get('ProductManager')
        const products = await ProductManager.getProducts()

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
        const ProductManager = req.app.get('ProductManager')
        const productFound = await ProductManager.getProductById(pid)
        if (isNaN(pid)) {
            // HTTP 400 => hay un error en el request o alguno de sus parámetros
            res.status(400).json({ error: "Invalid ID format" })
            return
        }
        if (productFound === undefined) {
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
        const ProductManager = req.app.get('ProductManager')
        const nuevoProducto = await ProductManager.addProduct(req.body)
        if (nuevoProducto) {
            res.json(nuevoProducto)
            return
        }
        res.json({ status: "Error!", Message: "El producto no pudo ser agregado" })



    }
    catch (err) {
        throw err

    }
})

router.put('/:pid', async (req, res) => {
    const pid = req.params.pid
    const ProductManager = req.app.get('ProductManager')
    await ProductManager.updateProduct(pid, req.body)
    // await ProductManager.updateFile()
})

router.delete('/:pid', async (req, res) => {
    const pid = req.params.pid
    if (isNaN(pid)) {
        res.status(400).json({ error: "formato de ID invalido" })
        return
    }
    const ProductManager = req.app.get('ProductManager')
    await ProductManager.deleteProduct(pid)
    // await ProductManager.updateFile()

    res.status(202).send({ status: "Success!", Message: "El producto ha sido eliminado correctamente" })





})

module.exports = router

