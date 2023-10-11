const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/user.routes');
const courseRoutes = require('./routes/course.routes')
const privacyRoutes = require('./routes/privacy.routes')
const { verifyToken, refreshToken } = require('./lib/auth').auth;

require('dotenv').config();
const mongoURL = process.env.MONGO_DB_URL;
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

mongoose.connect(mongoURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("Connected"))
.catch(e => console.log(e))

app.use('/api/user', userRoutes);
app.use('/api/refreshToken', refreshToken);
app.use('/api/course', verifyToken, courseRoutes);
app.use('/api/privacy', verifyToken, privacyRoutes);

// app.get('/api/testJWT', verifyToken, (req, res) => {
//   if(req.user) {
//     return res.json({ message: "user authorized" })
//   }
// })

app.set('PORT', 4400)

app.listen(
  app.get('PORT'), 
  () => console.log('The server started at port ', app.get('PORT'))
);