const { Router } = require("express");
const adminCtl = require("../controllers/admin.controller"); // path must be correct
const imageUpload = require("../middlewares/upload"); // Multer + Cloudinary
const router = Router();

router.get("/", (req, res) => {
  res.render("index"); 
});

// Products
router.get("/addproduct", adminCtl.addproductPage);
router.post("/addproduct", imageUpload.single("image"), adminCtl.addproduct);

router.get("/viewproduct", adminCtl.viewproductPage);

router.get("/edit/:id", adminCtl.editProductPage);
router.post("/edit/:id", imageUpload.single("image"), adminCtl.editProduct);

// Delete product
router.get("/delete/:id", adminCtl.deleteProduct);

// Other routes
router.use("/category", require("./category.router"));
router.use("/subcategory", require("./subcategory.router"));
router.use("/extcategory", require("./extcategory.router"));
router.use("/clientside", require("./clientside.router"));

module.exports = router;
