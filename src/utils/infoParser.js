const getDecimals = number => number - Math.floor(number);

exports.normalizeItem = (item, description) => ({
  item: {
    id: item.id,
    title: item.title,
    price: {
      currency: item.currency_id,
      amount: Math.floor(item.price),
      decimals: getDecimals(item.price)
    },
  },
  picture: item.pictures && item.pictures[0].url,
  condition: item.condition,
  free_shipping: item.shipping && item.shipping.free_shipping,
  sold_quantity: item.sold_quantity,
  description: description.plain_text
});
