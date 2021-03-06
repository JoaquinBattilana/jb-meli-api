const getDecimals = number => Number(number.toString().split('.')[1]);

const getPicture = item => (item.pictures && item.pictures[0] 
  ? item.pictures[0].secure_url || item.pictures[0].url 
  : item.secure_thumbnail || item.thumbnail);

exports.normalizeItem = item => ({
  id: item.id,
  title: item.title,
  price: {
    currency: item.currency_id,
    amount: Math.floor(item.price),
    decimals: getDecimals(item.price)
  },
  picture: getPicture(item),
  condition: item.condition,
  freeShipping: item.shipping && item.shipping.free_shipping
});

exports.normalizeSearchItems = items => items && items.map(
  item => ({ ...this.normalizeItem(item), state: item.address.state_name })
);

exports.findCategoryFilter = filters => filters && filters.find(filter => filter.id === 'category');

exports.getCategoryRoot = category => category 
  && category.path_from_root
  && category.path_from_root.map(cat => cat.name);

exports.findCategoriesInFilters = filters => {
  const categoryFilter = this.findCategoryFilter(filters);
  const category = categoryFilter && categoryFilter.values[0];
  return this.getCategoryRoot(category);
};

exports.findCategoryIdInAvailableFilters = availableFilters => {
  const categories = this.findCategoryFilter(availableFilters);
  if (!categories) return null;
  return categories.values.reduce((acumulator, category) =>
    (category.results > acumulator.results ? category : acumulator),
  categories.values[0]);
};
