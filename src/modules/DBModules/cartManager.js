
const { Carts } = require('../../models');

class CartManager {

  constructor() {
  }

  async addCart() {
    const newCart = {
      products: []
    }
    const Cart = await Carts.create(newCart)

    return Cart
  }

  async getCartById(id) {
    try {
      const foundcart = await Carts.findById(id);

      if (foundcart) {

        return (foundcart)
      }
      console.log("Not Found")
    }
    catch (err) {
      console.error("Error al procesar solicitud")
      throw (err)
    }
  }
  // async updateCart(cid, productData) {
  //   try {


  //     const cart = await Carts.findById(cid)

  //     const productOnCart = await cart.products.findIndex(product => product.productID === productData.id);
  //     console.log(`productOnCart ${productOnCart}`)

  //     if (productOnCart >= 0) {
  //       let cantidad = +await cart.products[productOnCart].quantity + 1
  //       cart.products[productOnCart].quantity = cantidad
  //       console.log({ status: "Success!", Message: `el total de unidades es ${cantidad}` })
  //       await Carts.findByIdAndUpdate(cid, cart.quantity)
  //     } else {
  //       await cart.products.push({ productID: productData.id, quantity: 1 })

  //       const update = await Carts.findByIdAndUpdate(cid, cart)
  //       if (update) {
  //         console.log({ status: "Success!", message: "El carrito ha sido actualizado correctamente" })

  //       }

  //     }


  //     return cart
  //   }


  //   catch (err) {

  //     console.error({ error: "error al actualizar el contenido", message: err })


  //   }
  // }
  // async deletecart(id) {
  //   try {
  //     const foundcartIdx = this.#carts.findIndex(cart => cart.id === id)
  //     if (!foundcartIdx < 0) {
  //       this.#carts.splice(foundcartIdx, 1)
  //       return
  //     }
  //     console.log({ error: "carto no encontrado" })
  //     return


  //   }


  //   catch {
  //     console.log('error al eliminar el carto')
  //   }


  // }

};


module.exports = CartManager
