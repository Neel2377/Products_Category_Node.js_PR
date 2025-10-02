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

const Extcategory = mongoose.model('Extcategory', categorySchema);
module.exports =  Extcategory;

