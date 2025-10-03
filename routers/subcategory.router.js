const { Router } = require('express');
const subcategoryCtl = require('../controllers/subcategory.controller');
const upload = require("../middlewares/upload");
const subCatRouter = Router();

subCatRouter.get('/add-subcategory', subcategoryCtl.addSubcategoryPage);
subCatRouter.post('/add-subcategory', upload.single("image"), subcategoryCtl.addSubcategory);

subCatRouter.get('/view-subcategory', subcategoryCtl.viewSubcategoryPage);

subCatRouter.get('/edit/:id', subcategoryCtl.editSubcategoryPage);
subCatRouter.post('/edit/:id', upload.single("image"), subcategoryCtl.editSubcategory);

subCatRouter.get('/delete/:id', subcategoryCtl.deleteSubcategory);

module.exports = subCatRouter;
