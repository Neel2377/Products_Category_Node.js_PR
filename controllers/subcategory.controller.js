const Subcategory = require("../models/subcategorySchema");
const cloudinary = require("../configs/cloudinary"); // <-- Use your Cloudinary config here
const fs = require("fs");

// Show Add Subcategory Page
exports.addSubcategoryPage = (req, res) => res.render("pages/add-subcategory");

// Handle Add Subcategory
exports.addSubcategory = async (req, res) => {
  try {
    let imageUrl = "";
    let imageId = "";

    // Only attempt to upload & delete if a file exists locally
    if (req.file && req.file.path) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "subcategories",
      });
      imageUrl = result.secure_url;
      imageId = result.public_id;

      // Delete local file after upload
      if (fs.existsSync(req.file.path)) {
        fs.unlinkSync(req.file.path);
      }
    }

    await Subcategory.create({ ...req.body, image: imageUrl, imageId: imageId });
    console.log("Subcategory Added.");
    return res.redirect("/subcategory/view-subcategory");
  } catch (error) {
    console.log("Error adding subcategory:", error.message);
    return res.redirect("/subcategory/add-subcategory");
  }
};

// View Subcategories
exports.viewSubcategoryPage = async (req, res) => {
  try {
    const subcategories = await Subcategory.find({});
    return res.render("pages/view-subcategory", { subcategories });
  } catch (error) {
    console.log("Error fetching subcategories:", error.message);
    return res.render("pages/view-subcategory", { subcategories: [] });
  }
};

// Show Edit Page
exports.editSubcategoryPage = async (req, res) => {
  try {
    const subcategory = await Subcategory.findById(req.params.id);
    if (!subcategory) return res.redirect("/subcategory/view-subcategory");
    return res.render("pages/edit-subcategory", { subcategory });
  } catch (error) {
    console.log(error.message);
    return res.redirect("/subcategory/view-subcategory");
  }
};

// Handle Edit
exports.editSubcategory = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = { name: req.body.name };

    if (req.file) {
      const subcategory = await Subcategory.findById(id);
      if (subcategory.imageId) {
        await cloudinary.uploader.destroy(subcategory.imageId);
      }

      const result = await cloudinary.uploader.upload(req.file.path, { folder: "subcategories" });
      updateData.image = result.secure_url;
      updateData.imageId = result.public_id;

      fs.unlinkSync(req.file.path); // Delete local file
    }

    await Subcategory.findByIdAndUpdate(id, updateData, { new: true });
    console.log("Subcategory Updated.");
    return res.redirect("/subcategory/view-subcategory");
  } catch (error) {
    console.log(error.message);
    return res.redirect("/subcategory/view-subcategory");
  }
};

// Delete Subcategory
exports.deleteSubcategory = async (req, res) => {
  try {
    const { id } = req.params;
    const subcategory = await Subcategory.findByIdAndDelete(id);
    if (subcategory && subcategory.imageId) {
      await cloudinary.uploader.destroy(subcategory.imageId);
    }
    console.log("Subcategory Deleted.");
    return res.redirect("/subcategory/view-subcategory");
  } catch (error) {
    console.log(error.message);
    return res.redirect("/subcategory/view-subcategory");
  }
};
