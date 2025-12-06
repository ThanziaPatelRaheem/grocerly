export const getPriceQueryParams = (searchParams, key, value) => {
  const searchCopy = new URLSearchParams(searchParams);
  const inputValue = value == null ? "" : String(value).trim();
  const isNumber = inputValue !== "" && !Number.isNaN(Number(inputValue));

  if (isNumber) searchCopy.set(key, inputValue);
  else searchCopy.delete(key);

  return searchCopy;
};

export const calculateOrderCost = (cartItems) => {
  const itemsPrice = cartItems?.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const shippingPrice = itemsPrice > 200 ? 0 : 20;
  const taxPrice = Number((0.09 * itemsPrice).toFixed(2));
  const totalPrice = (itemsPrice + shippingPrice + taxPrice).toFixed(2);

  return {
    itemsPrice: Number(itemsPrice).toFixed(2),
    shippingPrice,
    taxPrice,
    totalPrice,
  };
};
