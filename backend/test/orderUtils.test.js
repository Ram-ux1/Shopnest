const { describe, it } = require("node:test");
const assert = require("node:assert/strict");
const { normalizeOrderItems, priceOrderItems } = require("../utils/orderUtils");

describe("order utilities", () => {
  it("validates and merges repeated products", () => {
    assert.deepEqual(
      normalizeOrderItems([
        { product: "p1", quantity: 2 },
        { product: { _id: "p1" }, quantity: 1 },
      ]),
      [{ product: "p1", quantity: 3 }],
    );
    assert.throws(() => normalizeOrderItems([]), /between 1 and 100/);
    assert.throws(() => normalizeOrderItems([{ product: "p1", quantity: 0 }]), /Quantity/);
  });

  it("uses catalog prices and computes delivery and coupon amounts", () => {
    const products = [{ _id: "p1", name: "Item", price: 500, stock: 5 }];
    assert.deepEqual(
      priceOrderItems([{ product: "p1", quantity: 2 }], products, "shop10"),
      {
        items: [{ product: "p1", quantity: 2, price: 500 }],
        subtotal: 1000,
        shippingAmount: 0,
        discountAmount: 100,
        totalAmount: 900,
      },
    );
  });

  it("rejects unavailable products, insufficient stock, and invalid coupons", () => {
    assert.throws(
      () => priceOrderItems([{ product: "missing", quantity: 1 }], []),
      { status: 404 },
    );
    assert.throws(
      () => priceOrderItems([{ product: "p1", quantity: 2 }], [{ _id: "p1", name: "Item", price: 5, stock: 1 }]),
      { status: 409 },
    );
    assert.throws(
      () => priceOrderItems([{ product: "p1", quantity: 1 }], [{ _id: "p1", price: 5, stock: 1 }], "bad"),
      { status: 400 },
    );
  });
});
