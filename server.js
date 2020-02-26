require('dotenv').config();
const express = require('express');
const app = express();

app.get('/', (req, res) => {
  return res.send('Hello world');
});

app.listen(process.env.PORT || 3000);
