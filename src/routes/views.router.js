const { Router } = require('express')
const router = Router();


router.get('/', async (req, res) => {
    
    const ProductManager = req.app.get("ProductManager")
    const products = await ProductManager.getProducts()
    console.log(products)
    
    res.render('index', {
        title: 'Product Manager',
        useWS: true,
        useSweetAlert: true,
        scripts: [
            'index.js'
        ],
        products
    })
})


module.exports = router