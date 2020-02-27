const axios = require('axios');

const meliApiInstance = axios.create({
  baseURL: 'https://api.mercadolibre.com/sites/MLA',
  timeout: 1000
});

module.exports = meliApiInstance;
