const searchService = require('../../services/searchService');
const itemsService = require('../../services/itemsService');
const categoriesService = require('../../services/categoriesService');
const infoParser = require('../../utils/infoParser');

exports.getSearch = async (req, res) => {
  try {
    const itemsSearch = await searchService.getItemsSearch(req.query.q);
    let categories = infoParser.findCategoryIdInAvailableFilters(itemsSearch.available_filters);
    if (!categories) categories = infoParser.findCategoriesInFilters(itemsSearch.filters);
    else {
      categories = await categoriesService.getItemCategory(categories.id);
      categories = infoParser.getCategoryRoot(categories);
    }
    res.json({
      items: infoParser.normalizeSearchItems(itemsSearch.results),
      categories
    });
  } catch (e) {
    res.status(404).json({ message: e.message });
  }
};

exports.getItem = async (req, res) => {
  const item = await itemsService.getItem(req.params.id);
  const description = await itemsService.getItemDescription(req.params.id);
  res.json(infoParser.normalizeItem(item, description));
};
