const meliApiInstance = require('../config/meliApi');

exports.getItemCategory = async id => {
  const response = await meliApiInstance.get(`/categories/${id}`);
  return response.data;
};
