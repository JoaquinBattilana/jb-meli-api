const searchService = require('../../services/searchService');
const itemsService = require('../../services/itemsService');

exports.getSearch = async (req, res) => {
  const response = await searchService.getItemsSearch(req.query.q);
  res.json(response);
};

exports.getItem = async (req, res) => {
  const response1 = await itemsService.getItem(req.params.id);
  const response2 = await itemsService.getItemDescription(req.params.id);
  res.json({
    item: response1,
    itemDescription: response2
  });
};
