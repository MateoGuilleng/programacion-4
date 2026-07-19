const express = require('express');
const router = express.Router();

const homeController = require('../controllers/homeController');
const apiController = require('../controllers/apiController');

router.get('/', apiController.getApi);

router.get('/usuarios', apiController.getUsuarios);

router.get('/productos', apiController.getProductos);

module.exports = router;