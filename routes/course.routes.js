const router = require('express').Router();
const courseController = require('../controllers/course.controller');

router.get('/', courseController.getCourses);
router.post('/create', courseController.createCourse);

module.exports = router