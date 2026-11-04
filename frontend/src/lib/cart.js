export const readCart = (storage = globalThis.localStorage) => {
  try {
    const storedCart = JSON.parse(storage?.getItem("cart") || "[]");
    return Array.isArray(storedCart)
      ? storedCart.filter(
          (item) =>
            item &&
            typeof item === "object" &&
            (item._id || item.id) &&
            Number.isInteger(item.quantity) &&
            item.quantity > 0,
        )
      : [];
  } catch {
    return [];
  }
};

export const addCartItem = (items, product) => {
  const id = product?._id || product?.id;
  if (!id) return items;

  const existing = items.find((item) => (item._id || item.id) === id);
  if (existing) {
    return items.map((item) =>
      (item._id || item.id) === id
        ? { ...item, quantity: item.quantity + 1 }
        : item,
    );
  }

  return [...items, { ...product, quantity: 1 }];
};

export const removeCartItem = (items, id) =>
  items.filter((item) => (item._id || item.id) !== id);

export const setCartItemQuantity = (items, id, quantity) =>
  items
    .map((item) =>
      (item._id || item.id) === id
        ? { ...item, quantity: Math.max(1, Math.floor(quantity)) }
        : item,
    )
    .filter((item) => Number.isFinite(item.quantity));
