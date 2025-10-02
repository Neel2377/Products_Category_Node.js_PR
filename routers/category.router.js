const { Router } = require('express');
const categoryCtl = require('../controllers/category.controller');
const imageUpload = require("../middlewares/upload");
const catRouter = Router();

catRouter.get('/add-category', categoryCtl.addCategoryPage);
catRouter.post('/add-category', imageUpload.single('image'), categoryCtl.addCategory);

catRouter.get('/view-category', categoryCtl.viewCategoryPage);

catRouter.get('/edit/:id', categoryCtl.editCategoryPage);
catRouter.post('/edit/:id', imageUpload.single('image'), categoryCtl.editCategory);

catRouter.get('/delete/:id', categoryCtl.deleteCategory);

module.exports = catRouter;
