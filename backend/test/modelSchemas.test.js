const { describe, it } = require("node:test");
const assert = require("node:assert/strict");
const Product = require("../model/product.model");
const Order = require("../model/order.model");

describe("catalog and order schemas", () => {
  it("rejects negative product price and stock", async () => {
    const product = new Product({
      name: "Item",
      description: "Test item",
      price: -1,
      imageUrl: "https://example.test/image.jpg",
      category: "Test",
      stock: -1,
    });
    const error = await product.validate().catch((validationError) => validationError);
    assert.ok(error.errors.price);
    assert.ok(error.errors.stock);
  });

  it("rejects unsupported order statuses and quantities", async () => {
    const order = new Order({
      user: "507f1f77bcf86cd799439011",
      items: [{ product: "507f1f77bcf86cd799439012", quantity: 0, price: 10 }],
      totalAmount: 10,
      address: {
        fullName: "Ada",
        street: "1 Main St",
        city: "Test",
        postalCode: "12345",
        country: "IN",
      },
      status: "cancelled",
    });
    const error = await order.validate().catch((validationError) => validationError);
    assert.ok(error.errors.status);
    assert.ok(error.errors["items.0.quantity"]);
  });
});
