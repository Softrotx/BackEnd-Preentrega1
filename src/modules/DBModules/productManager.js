const { Products } = require("../../models")



class ProductManager {
  constructor() {
  }

  async addProduct(newData) {
    const titulo = newData.title

    const busqueda = await Products.findOne({ title: titulo })
    if (busqueda){
      return {error: "el producto ya existe"}
    }
    const cuenta = await Products.countDocuments({})
    console.log(cuenta)
    newData.code = 1 * 10000000 + cuenta +1
    const newProduct = await Products.create(newData)

    return { status: "Success", message: newProduct }



  }



  async getProducts() {
    try {
      return await Products.find({})

    }
    catch (err) {
      throw (err)
    }
  }




  async getProductById(pid) {
    try {
      console.log(pid)
      const foundProduct = await Products.findById(pid);

      if (foundProduct) {

        return (foundProduct)
      } else {
        
        return console.error("Not Found")

      }


    }
    catch (err) {
      return console.error("Error al procesar solicitud" + err)
    }

  }
    async updateProduct(pid, newData) {
      try {
        
        if (pid.length !== 24 ) {
          
          return console.log({ error: "Invalid ID format" })
        }
        const productUpdating = await Products.findByIdAndUpdate(pid, newData)
        const productUpdated = await Products.findById(pid)

        if (!productUpdating) {
          console.log({ error: "User not found" })
          return
        }
        return productUpdated

      }


      catch (err) {
        console.error("error al actualizar el contenido " + err)

      }
    }
    async deleteProduct(pid) {
      try {
        if (pid.length !== 24 ) {
          
          return console.log({ error: "Invalid ID format" })
        }
        console.log(await Products.findById(pid))
        const foundProductIdx = await Products.findByIdAndDelete(pid)

        console.log(foundProductIdx)
        if (foundProductIdx) {
          
          return {status: "Success", msg: "producto eliminado correctamente"}
        }
        return { error: "Producto no encontrado" }


      }


      catch (err){ 
    return {status: 'error al eliminar el producto ', ERROR: err}
  }


    }

};


module.exports = ProductManager
