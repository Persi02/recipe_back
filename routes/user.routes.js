const router = require('express').Router();
const userController = require('../controllers/user.controller');

router.get('/', userController.getAllUsers);
router.post("/", userController.createUser);
router.post('/login', userController.login);
router.put('/', userController.updateUser)

module.exports = router;