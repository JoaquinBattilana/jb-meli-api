const searchService = require('../../services/searchService');
const itemsService = require('../../services/itemsService');
const infoParser = require('../../utils/infoParser');

exports.getSearch = async (req, res) => {
  const response = await searchService.getItemsSearch(req.query.q);
  res.json(response);
};

exports.getItem = async (req, res) => {
  const item = await itemsService.getItem(req.params.id);
  const description = await itemsService.getItemDescription(req.params.id);
  res.json(infoParser.normalizeItem(item, description));
};
