const meliApiInstance = require('../config/meliApi');

exports.getItemsSearch = async searchText => {
  const response = await meliApiInstance.get('/sites/MLA/search', {
    params: {
      q: searchText
    }
  });
  return response.data.results;
};
