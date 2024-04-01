const { mongoose } = require("mongoose");


const productsSchema = mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    code: { type: Number, min:10000000},
    price: { type: Number, required: true },
    stock: { type: Number, required: true },
    category: { type: String, required: true },
    thumbnails: { type: String }


});

module.exports = mongoose.model('Products', productsSchema);
