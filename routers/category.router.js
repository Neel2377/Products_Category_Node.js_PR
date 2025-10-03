const { Router } = require('express');
const categoryCtl = require('../controllers/category.controller');
const upload = require("../middlewares/upload");
const catRouter = Router();

catRouter.get('/add-category', categoryCtl.addCategoryPage);
catRouter.post('/add-category', upload.single("image"), categoryCtl.addCategory);

catRouter.get('/view-category', categoryCtl.viewCategoryPage);

catRouter.get('/edit/:id', categoryCtl.editCategoryPage);
catRouter.post('/edit/:id', upload.single("image"), categoryCtl.editCategory);

catRouter.get('/delete/:id', categoryCtl.deleteCategory);

module.exports = catRouter;
