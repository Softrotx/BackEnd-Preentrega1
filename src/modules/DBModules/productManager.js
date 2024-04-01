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




  async getProductById(id) {
    try {
      const foundProduct = await Products.findById(id);

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
          console.log({ error: "Invalid ID format" })
          return
        }
        const foundProduct = await Products.findByIdAndUpdate(pid, newData)

        if (!foundProduct) {
          console.log({ error: "User not found" })
          return
        }
        Products.save()
        console.log({ status: "Success!", Message: "El producto ha sido actualizado correctamente" })

      }


      catch {
        console.error("error al actualizar el contenido")

      }
    }
  //   async deleteProduct(id) {
  //     try {
  //       const foundProductIdx = this.#products.findIndex(product => product.id === id)
  //       if (!foundProductIdx < 0) {
  //         this.#products.splice(foundProductIdx, 1)
  //         return
  //       }
  //       console.log({ error: "Producto no encontrado" })
  //       return


  //     }


  //     catch {
  //   console.log('error al eliminar el producto')
  // }


  //   }

};


module.exports = ProductManager
