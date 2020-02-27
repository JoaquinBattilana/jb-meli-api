const searchService = require('../../services/searchService');

exports.getSearch = async (req, res) => {
  const response = await searchService.getSearch(req.params.q);
  res.json(response);
};
