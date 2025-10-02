const { Router } = require('express');
const clientsideCtl = require('../controllers/clientside.controller');
const clientsideRouter = Router();

clientsideRouter.get('/view-clientdata', clientsideCtl.viewClientData);

module.exports = clientsideRouter;