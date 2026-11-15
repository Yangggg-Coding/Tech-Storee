export function getCartItemKey(item) {
  return JSON.stringify([
    item.productId,
    item.option ?? null,
    item.finish ?? null,
  ]);
}

export function addCartItem(cart, item) {
  const key = getCartItemKey(item);
  const existingItem = cart.find(
    (cartItem) => getCartItemKey(cartItem) === key,
  );

  if (!existingItem) {
    return [...cart, { ...item, quantity: 1 }];
  }

  return cart.map((cartItem) =>
    getCartItemKey(cartItem) === key
      ? { ...cartItem, quantity: cartItem.quantity + 1 }
      : cartItem,
  );
}

export function updateCartItemQuantity(cart, item, quantity) {
  const key = getCartItemKey(item);

  if (quantity < 1) {
    return cart.filter((cartItem) => getCartItemKey(cartItem) !== key);
  }

  return cart.map((cartItem) =>
    getCartItemKey(cartItem) === key
      ? { ...cartItem, quantity }
      : cartItem,
  );
}
