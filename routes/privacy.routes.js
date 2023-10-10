const router = require('express').Router()
const privacyController = require('../controllers/privacy.controller')

router.get('/', privacyController.getPrivacy)
router.post('/create', privacyController.createPrivacy)

module.exports = router;