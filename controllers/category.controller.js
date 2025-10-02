const Category = require("../models/categorySchema");
const cloudinary = require("../configs/cloudinary"); // <- use your Cloudinary config
const fs = require("fs");

// Show Add Category Page
exports.addCategoryPage = (req, res) => res.render("pages/add-category");

// Handle Add Category
exports.addCategory = async (req, res) => {
  try {
    let imageUrl = "";
    let imageId = "";

    if (req.file) {
      // Upload to Cloudinary
      const result = await cloudinary.uploader.upload(req.file.path, { folder: "categories" });
      imageUrl = result.secure_url;
      imageId = result.public_id;

      // Only delete local file saved by multer
      if (fs.existsSync(req.file.path)) {
        fs.unlinkSync(req.file.path);
      }
    }

    await Category.create({ ...req.body, image: imageUrl, imageId: imageId });
    console.log("Category Added.");
    return res.redirect("/category/view-category");
  } catch (error) {
    console.log("Error adding category:", error.message);
    return res.redirect("/category/add-category");
  }
};


// View Categories
exports.viewCategoryPage = async (req, res) => {
  try {
    const categories = await Category.find({});
    return res.render("pages/view-category", { categories });
  } catch (error) {
    console.log("Error fetching categories:", error.message);
    return res.render("pages/view-category", { categories: [] });
  }
};

// Show Edit Category Page
exports.editCategoryPage = async (req, res) => {
  const category = await Category.findById(req.params.id);
  if (!category) return res.redirect("/category/view-category");
  return res.render("pages/edit-category", { category });
};

// Handle Edit Category
exports.editCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = { name: req.body.name };

    if (req.file) {
      const category = await Category.findById(id);
      if (category.imageId) await cloudinary.uploader.destroy(category.imageId);

      const result = await cloudinary.uploader.upload(req.file.path, { folder: "categories" });
      updateData.image = result.secure_url;
      updateData.imageId = result.public_id;

      fs.unlinkSync(req.file.path); // delete local file
    }

    await Category.findByIdAndUpdate(id, updateData, { new: true });
    console.log("Category Updated.");
    return res.redirect("/category/view-category");
  } catch (error) {
    console.log(error.message);
    return res.redirect("/category/view-category");
  }
};

// Handle Delete Category
exports.deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await Category.findByIdAndDelete(id);

    if (category && category.imageId) {
      await cloudinary.uploader.destroy(category.imageId);
    }

    console.log("Category Deleted.");
    return res.redirect("/category/view-category");
  } catch (error) {
    console.log(error.message);
    return res.redirect("/category/view-category");
  }
};
