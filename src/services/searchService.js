const meliApiInstance = require('../config/meliApi');

exports.getItemsSearch = async searchText => {
  const response = await meliApiInstance.get('/search', {
    params: {
      q: searchText
    }
  });
  return response.data.results;
};
