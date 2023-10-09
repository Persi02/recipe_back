const express = require('express');
// const PORT = 4400;

const app = express();

app.get('/test', (req, res) => {
  console.log('request received');
  res.json({
    "message": "response from the server"
  })
});

app.set('PORT', 4400)

app.listen(
  app.get('PORT'), 
  () => console.log('The server started at port ', app.get('PORT'))
);