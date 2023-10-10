const router = require('express').Router();
const userController = require('../controllers/user.controller');
// import { userController } from '../controllers/user.controller';

router.post('/login', userController.login);
router.post("/create", userController.createUser)

module.exports = router;