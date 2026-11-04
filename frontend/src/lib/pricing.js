export const getCartTotals = (items, couponApplied = false) => {
  const subtotal = items.reduce(
    (total, item) => total + Number(item.price) * item.quantity,
    0,
  );
  const shipping = subtotal === 0 || subtotal >= 999 ? 0 : 49;
  const discount = couponApplied ? Math.round(subtotal * 0.1) : 0;
  return { subtotal, shipping, discount, total: subtotal + shipping - discount };
};
