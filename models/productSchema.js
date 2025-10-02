const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  price: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
  },
  subcategory: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Subcategory"
  },
  extcategory: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Extcategory"
  }
});

const Product = mongoose.model('Products', productSchema);
module.exports = Product;
