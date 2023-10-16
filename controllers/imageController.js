const Image = require('../entity/Image.entity');
const User = require('../entity/User.entity');
const { deleteImage } = require('../lib/utils/deleteImage');

const saveImage = async(req, res, next) => {
  const { userId } = req.body;
  try {
    const image = new Image({
      fileName: req.file.originalname,
      nameHashed: req.file.filename
    });
    const doc = await image.save();
    if(doc) {
      const user = await User.findById(userId);
      user.avatar = doc.id;
      user.save()
    }

    return res.json({ message: "File saved", image: doc });

  } catch(err) {
    console.log(err.message);
    return res.status(500).json({ message: err.message });
  }
}

const updateImage = async(req, res) => {
  const { id }  = req.body;

  try {
    const doc = await Image.findById(id);
    if(doc) {
      deleteImage('./public/images/' + doc.nameHashed)
    }

    const updatedDoc = await Image.findOneAndUpdate(
      { _id: id },
      {
        fileName: req.file.originalname,
        nameHashed: req.file.filename
      },
      {
        new: true
      }
    )
    return res.json({ message: "Image updated", image: updatedDoc });

  } catch(err) {
    console.log(err)
    return res.status(500).json({ message: err.message });
  }
}

module.exports = {
  saveImage,
  updateImage
}