const ORDER_LIMIT = 99;

const createValidationError = (message) => {
  const error = new Error(message);
  error.status = 400;
  return error;
};

const normalizeOrderItems = (items) => {
  if (!Array.isArray(items) || items.length === 0 || items.length > 100) {
    throw createValidationError("Provide between 1 and 100 order items");
  }

  const quantities = new Map();
  for (const item of items) {
    const productId = String(
      typeof item?.product === "object" ? item.product?._id : item?.product,
    );
    if (!productId || productId === "undefined" || productId === "null") {
      throw createValidationError("Each order item must include a product");
    }

    const quantity = Number(item.quantity);
    if (!Number.isInteger(quantity) || quantity < 1 || quantity > ORDER_LIMIT) {
      throw createValidationError(`Quantity must be between 1 and ${ORDER_LIMIT}`);
    }
    quantities.set(productId, (quantities.get(productId) || 0) + quantity);
  }

  for (const quantity of quantities.values()) {
    if (quantity > ORDER_LIMIT) {
      throw createValidationError(`Quantity must not exceed ${ORDER_LIMIT}`);
    }
  }

  return [...quantities].map(([product, quantity]) => ({ product, quantity }));
};

const priceOrderItems = (requestedItems, products, couponCode = "") => {
  const productById = new Map(products.map((product) => [String(product._id), product]));
  const items = requestedItems.map(({ product, quantity }) => {
    const catalogProduct = productById.get(String(product));
    if (!catalogProduct) {
      const error = new Error("One or more products are no longer available");
      error.status = 404;
      throw error;
    }
    if (!Number.isFinite(catalogProduct.price) || catalogProduct.price < 0) {
      const error = new Error(`${catalogProduct.name} has an invalid catalog price`);
      error.status = 500;
      throw error;
    }
    if (!Number.isFinite(catalogProduct.stock) || catalogProduct.stock < quantity) {
      const error = new Error(`${catalogProduct.name} does not have enough stock`);
      error.status = 409;
      throw error;
    }
    return {
      product: catalogProduct._id,
      quantity,
      price: catalogProduct.price,
    };
  });

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shippingAmount = subtotal >= 999 ? 0 : 49;
  const normalizedCoupon = String(couponCode).trim().toUpperCase();
  if (normalizedCoupon && normalizedCoupon !== "SHOP10") {
    const error = new Error("Invalid coupon code");
    error.status = 400;
    throw error;
  }
  const discountAmount = normalizedCoupon ? Math.round(subtotal * 0.1) : 0;

  return {
    items,
    subtotal,
    shippingAmount,
    discountAmount,
    totalAmount: subtotal + shippingAmount - discountAmount,
  };
};

module.exports = { normalizeOrderItems, priceOrderItems };
