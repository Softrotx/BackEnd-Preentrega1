const { mongoose } = require("mongoose");



const cartsSchema = mongoose.Schema({
    products: [{
        productID:{type:Number,require:true},
        quantity:{type:Number,require:true}
    }],




});

module.exports= mongoose.model('Carts', cartsSchema);
