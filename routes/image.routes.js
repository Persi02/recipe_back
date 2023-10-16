const router = require('express').Router();
const imageController = require('../controllers/imageController');

router.post('/', imageController.saveImage);
router.put('/', imageController.updateImage);

module.exports = router