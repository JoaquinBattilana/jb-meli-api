require('dotenv').config();
const express = require('express');
const searchService = require('./services/searchService');

const app = express();

app.get('/api/items', async (req, res) => {
  const response = await searchService.getSearch('hola');
  res.json(response);
});

module.exports = app;
