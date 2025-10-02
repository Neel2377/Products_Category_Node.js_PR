const Product = require("../models/productSchema");

exports.viewClientData = async (req, res) => {
  try {
    const products = await Product.find()
      .populate("category", "name image")
      .populate("subcategory", "name image")
      .populate("extcategory", "name image");
    return res.render("./pages/clientside-product", { products });
  } catch (error) {
    console.log(error.message);
    return res.render("./pages/clientside-product", { products: [] });
  }
};
