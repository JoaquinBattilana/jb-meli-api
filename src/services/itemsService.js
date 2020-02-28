const meliApiInstance = require('../config/meliApi');

exports.getItem = async id => {
  const response = await meliApiInstance.get(`/items/${id}`);
  return response.data;
};

exports.getItemDescription = async id => {
  const response = await meliApiInstance.get(`/items/${id}/description`);
  return response.data;
};
