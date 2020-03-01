const meliApiInstance = require('../config/meliApi');

exports.getItemsSearch = async searchText => {
  const response = await meliApiInstance.get('/sites/MLA/search', {
    params: {
      q: searchText,
      limit: process.env.SEARCH_QUANTITY
    }
  });
  return response.data;
};
