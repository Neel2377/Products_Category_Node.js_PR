const { Router } = require('express');
const extcategoryCtl = require('../controllers/extcategory.controller');
const upload = require("../middlewares/upload");
const extCatRouter = Router();

extCatRouter.get('/add-extcategory', extcategoryCtl.addExtcategoryPage);
extCatRouter.post('/add-extcategory', upload.single("image"), extcategoryCtl.addExtcategory);

extCatRouter.get('/view-extcategory', extcategoryCtl.viewExtcategoryPage);

extCatRouter.get('/edit/:id', extcategoryCtl.editExtcategoryPage);
extCatRouter.post('/edit/:id', upload.single("image"), extcategoryCtl.editExtcategory);

extCatRouter.get('/delete/:id', extcategoryCtl.deleteExtcategory);

module.exports = extCatRouter;
