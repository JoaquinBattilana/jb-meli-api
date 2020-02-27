const axios = require('axios');

const meliApiInstance = axios.create({
  baseUrl: process.env.MELI_API_BASE_URL,
  timeout: 1000
});

module.exports = meliApiInstance;
