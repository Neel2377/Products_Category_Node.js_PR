const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  }
});

const Subcategory = mongoose.model('Subcategory', categorySchema);
module.exports =  Subcategory;

