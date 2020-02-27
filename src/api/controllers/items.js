const searchService = require('../../services/searchService');

exports.getSearch = async (req, res) => {
  const response = await searchService.getItemsSearch(req.query.q);
  res.json(response);
};

exports.getItem = async (req, res) => {
  const response = await searchService.getItem();
  res.json(response);
};
