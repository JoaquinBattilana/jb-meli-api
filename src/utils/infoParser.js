const getDecimals = number => Number(number.toString().split('.')[1]);

const normalizeCategories = filters => {
  const category = filters && filters.find(filter => filter.id === 'category');
  const categories = category && category.values[0].path_from_root.map(cat => cat.name);
  return categories;
};

exports.normalizeItem = item => ({
  id: item.id,
  title: item.title,
  price: {
    currency: item.currency_id,
    amount: Math.floor(item.price),
    decimals: getDecimals(item.price)
  },
  picture: item.thumbnail,
  condition: item.condition,
  free_shipping: item.shipping && item.shipping.free_shipping
});

exports.normalizeSearchItems = searchResults => ({
  categories: normalizeCategories(searchResults.filters),
  items: searchResults && searchResults.results.map(
    item => this.normalizeItem(item)
  )
});
