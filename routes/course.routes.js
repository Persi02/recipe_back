const router = require('express').Router();
const courseController = require('../controllers/course.controller');

router.get('/', courseController.getCourses);
router.post('/', courseController.createCourse);

module.exports = router