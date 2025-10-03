const Subcategory = require("../models/subcategorySchema");
const cloudinary = require("../configs/cloudinary"); // Cloudinary config

// Show Add Subcategory Page
exports.addSubcategoryPage = (req, res) => res.render("pages/add-subcategory");

// Handle Add Subcategory
exports.addSubcategory = async (req, res) => {
  try {
    let imageUrl = "";
    let imageId = "";

    if (req.file) {
      // multer-storage-cloudinary already uploads to Cloudinary
      imageUrl = req.file.path;       // Cloudinary URL
      imageId = req.file.filename;    // Cloudinary public_id
    }

    await Subcategory.create({ ...req.body, image: imageUrl, imageId });
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

      // Delete old image from Cloudinary
      if (subcategory.imageId) {
        await cloudinary.uploader.destroy(subcategory.imageId);
      }

      // Use new uploaded image info directly
      updateData.image = req.file.path;       // Cloudinary URL
      updateData.imageId = req.file.filename; // Cloudinary public_id
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