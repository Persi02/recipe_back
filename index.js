const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/user.routes');
const courseRoutes = require('./routes/course.routes')
const privacyRoutes = require('./routes/privacy.routes')
const roleRoutes = require('./routes/role.routes');
const imageRoutes = require('./routes/image.routes');
const { createUploadDir } = require('./lib/utils/createUploadDir');
const multer = require('multer');
const { hashFilename } = require('./lib/utils/hashFilename');

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, './public/images');
  },
  filename: function(req, file, cb) {
    const exttype = file.mimetype.split('/')[1];
    const filename = hashFilename(file.originalname) + '-' + Date.now() + '.' + exttype;
    cb(null, filename);
  }
})

const upload = multer({ storage: storage });
const cors = require('cors');
const { verifyToken, refreshToken } = require('./lib/auth').auth;

require('dotenv').config();
const mongoURL = process.env.MONGO_DB_URL;
const app = express();
app.use(cors());
app.use(express.static("public/images"))

// swagger config
const swaggerUI = require('swagger-ui-express');
const fs = require('fs');
const YAML = require('yaml');
const file = fs.readFileSync('./swagger.yaml', 'utf-8');
const swaggerDocument = YAML.parse(file);
let options = {
  explorer: true
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

mongoose.connect(mongoURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(async() => {
  await createUploadDir('./public/images');
  console.log("Connected")
})
.catch(e => console.log(e))

app.use('/api/user', userRoutes);
app.get('/api/refreshToken', refreshToken);
app.use('/api/course', verifyToken, courseRoutes);
app.use('/api/privacy', verifyToken, privacyRoutes);
app.use('/api/role', roleRoutes);
app.use('/api/image', upload.single('file') , imageRoutes);

// route for API documentation
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument, options))

app.get('/api/testJWT', verifyToken, (req, res) => {
  if(req.user) {
    return res.json({ message: "user authorized" })
  }
})

app.set('PORT', 4400)

app.listen(
  app.get('PORT'), 
  () => console.log('The server started at port ', app.get('PORT'))
);