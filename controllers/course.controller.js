const Course = require('../entity/Course.entity')
const Privacy = require('../entity/Privacy.entity')
const User = require('../entity/User.entity')

const createCourse = async(req, res, next) => {
  const { title, description, author, privacy, link } = req.body;
  const privacyLabel = await Privacy.findOne({ label: privacy });
  const foundAuthor = await User.findById(author);

  const newCourse = new Course({
    title,
    description,
    link,
    author: foundAuthor.id,
    privacy: privacyLabel.id
  });
  // newCourse.privacy = privacyLabel.id;
  // newCourse.author = foundAuthor.id;

  const doc = await newCourse.save();

  if(doc) {
    foundAuthor.courses.push(doc.id)
    await foundAuthor.save()
  }

  res.json({
    message: "Course created",
    course: doc
  })
}

const getCourses = async(req, res, next) => {
  const courses = await Course.find()

  return res.json({
    message: "All courses",
    data: courses
  })
}

module.exports = {
  createCourse,
  getCourses
}