const router = require('express').Router();
const roleController = require('../controllers/role.controller')

router.get('/', roleController.getRoles);
router.post('/', roleController.createRole);

module.exports = router;