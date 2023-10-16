const router = require('express').Router();
const imageController = require('../controllers/imageController');

router.post('/', imageController.saveImage);

module.exports = router