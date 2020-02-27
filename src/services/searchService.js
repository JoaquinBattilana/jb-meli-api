const meliApiInstance = require('../config/meliApi');

exports.getItemsSearch = async searchText => {
  const response = await meliApiInstance.get('/search', {
    params: {
      q: searchText
    }
  });
  return response.data.results;
};

exports.getItem = async id => {
  const response = await meliApiInstance.get(`/search/${id}`);
  return response.data;
};

exports.getItemDescription = async id => {
  const response = await meliApiInstance.get(`/search/${id}/description`);
  return response.data;
};
