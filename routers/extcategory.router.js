const { Router } = require('express');
const extcategoryCtl = require('../controllers/extcategory.controller');
const imageUpload = require("../middlewares/upload");
const extCatRouter = Router();

extCatRouter.get('/add-extcategory', extcategoryCtl.addExtcategoryPage);
extCatRouter.post('/add-extcategory', imageUpload.single('image'), extcategoryCtl.addExtcategory);

extCatRouter.get('/view-extcategory', extcategoryCtl.viewExtcategoryPage);

extCatRouter.get('/edit/:id', extcategoryCtl.editExtcategoryPage);
extCatRouter.post('/edit/:id', imageUpload.single('image'), extcategoryCtl.editExtcategory);

extCatRouter.get('/delete/:id', extcategoryCtl.deleteExtcategory);

module.exports = extCatRouter;
