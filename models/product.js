const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Definir el esquema de Producto
const productSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    description: String,
    inStock: {
        type: Boolean,
        default: true
    }
});

// Crear el modelo de Producto
const Product = mongoose.model('Product', productSchema);

module.exports = Product;
