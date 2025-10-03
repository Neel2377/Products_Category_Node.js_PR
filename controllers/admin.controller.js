const Product = require("../models/productSchema");
const Category = require("../models/categorySchema");
const Subcategory = require("../models/subcategorySchema");
const Extcategory = require("../models/extcategorySchema");
const cloudinary = require("../configs/cloudinary");

// Show Add Product Page
exports.addproductPage = async (req, res) => {
  try {
    const categories = await Category.find();
    const subcategories = await Subcategory.find();
    const extcategories = await Extcategory.find();

    res.render("pages/addproduct", {
      categories,
      subcategories,
      extcategories,
    });
  } catch (err) {
    console.error(err.message);
    res.render("pages/addproduct", {
      categories: [],
      subcategories: [],
      extcategories: [],
    });
  }
};

// Handle Add Product
exports.addproduct = async (req, res) => {
  try {
    let imageUrl = "";
    let imageId = "";

    if (req.file) {
      // multer-storage-cloudinary already uploads, just use its info
      imageUrl = req.file.path;        // Cloudinary URL
      imageId = req.file.filename;     // Cloudinary public_id
    }

    await Product.create({ ...req.body, image: imageUrl, imageId });
    res.redirect("/viewproduct");
  } catch (err) {
    console.error(err.message);
    res.redirect("back");
  }
};

// Show View Products Page
exports.viewproductPage = async (req, res) => {
  try {
    const products = await Product.find()
      .populate("category")
      .populate("subcategory")
      .populate("extcategory");

    res.render("pages/viewproduct", { products });
  } catch (err) {
    console.error(err.message);
    res.render("pages/viewproduct", { products: [] });
  }
};

// Show Edit Product Page
exports.editProductPage = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.redirect("/viewproduct");

    res.render("pages/editproduct", { product });
  } catch (err) {
    console.error(err.message);
    res.redirect("/viewproduct");
  }
};

// Handle Edit Product
exports.editProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.redirect("/viewproduct");

    let updateData = { ...req.body };

    if (req.file) {
      // Delete old image from Cloudinary
      if (product.imageId) {
        await cloudinary.uploader.destroy(product.imageId);
      }

      // Use new uploaded file directly
      updateData.image = req.file.path;       // Cloudinary URL
      updateData.imageId = req.file.filename; // Cloudinary public_id
    }

    await Product.findByIdAndUpdate(req.params.id, updateData, { new: true });
    res.redirect("/viewproduct");
  } catch (err) {
    console.error(err.message);
    res.redirect("back");
  }
};

// Handle Delete Product
exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);

    if (product && product.imageId) {
      await cloudinary.uploader.destroy(product.imageId);
    }

    res.redirect("/viewproduct");
  } catch (err) {
    console.error(err.message);
    res.redirect("back");
  }
};
