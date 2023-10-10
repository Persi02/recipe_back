const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/user.routes');
const courseRoutes = require('./routes/course.routes')
const privacyRoutes = require('./routes/privacy.routes')
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
app.use('/api/course', courseRoutes);
app.use('/api/privacy', privacyRoutes);

app.set('PORT', 4400)

app.listen(
  app.get('PORT'), 
  () => console.log('The server started at port ', app.get('PORT'))
);