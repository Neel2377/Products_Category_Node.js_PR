const Extcategory = require("../models/extcategorySchema");
const cloudinary = require("../configs/cloudinary"); // <- correct Cloudinary SDK
const fs = require("fs");

// Show Add Extra Category Page
exports.addExtcategoryPage = (req, res) => res.render("pages/add-extcategory");

// Add Extra Category
exports.addExtcategory = async (req, res) => {
  try {
    let imageUrl = "";
    let imageId = "";

    if (req.file && req.file.path) {
      const result = await cloudinary.uploader.upload(req.file.path, { folder: "extcategories" });
      imageUrl = result.secure_url;
      imageId = result.public_id;

      if (fs.existsSync(req.file.path)) fs.unlinkSync(req.file.path);
    }

    await Extcategory.create({ name: req.body.name, image: imageUrl, imageId });
    res.redirect("/extcategory/view-extcategory");
  } catch (err) {
    console.error("Error adding Extra Category:", err.message);
    res.redirect("/extcategory/add-extcategory");
  }
};

// View Extra Categories
exports.viewExtcategoryPage = async (req, res) => {
  try {
    const extcategories = await Extcategory.find({});
    return res.render("pages/view-extcategory", { extcategories });
  } catch (error) {
    console.log("Error fetching extcategories:", error.message);
    return res.render("pages/view-extcategory", { extcategories: [] });
  }
};

// Edit Page
exports.editExtcategoryPage = async (req, res) => {
  const extcategory = await Extcategory.findById(req.params.id);
  if (!extcategory) return res.redirect("/extcategory/view-extcategory");
  return res.render("pages/edit-extcategory", { extcategory });
};

// Edit Extra Category
exports.editExtcategory = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = { name: req.body.name };

    if (req.file && req.file.path) {
      const extcategory = await Extcategory.findById(id);
      if (extcategory.imageId) await cloudinary.uploader.destroy(extcategory.imageId);

      const result = await cloudinary.uploader.upload(req.file.path, { folder: "extcategories" });
      updateData.image = result.secure_url;
      updateData.imageId = result.public_id;

      if (fs.existsSync(req.file.path)) fs.unlinkSync(req.file.path);
    }

    await Extcategory.findByIdAndUpdate(id, updateData, { new: true });
    console.log("Extcategory Updated.");
    return res.redirect("/extcategory/view-extcategory");
  } catch (error) {
    console.log(error.message);
    return res.redirect("/extcategory/view-extcategory");
  }
};

// Delete Extra Category
exports.deleteExtcategory = async (req, res) => {
  try {
    const { id } = req.params;
    const extcategory = await Extcategory.findByIdAndDelete(id);
    if (extcategory && extcategory.imageId) await cloudinary.uploader.destroy(extcategory.imageId);
    console.log("Extcategory Deleted.");
    return res.redirect("/extcategory/view-extcategory");
  } catch (error) {
    console.log(error.message);
    return res.redirect("/extcategory/view-extcategory");
  }
};
