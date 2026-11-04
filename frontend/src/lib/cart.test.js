import { describe, it } from "node:test";
import assert from "node:assert/strict";
import {
  addCartItem,
  readCart,
  removeCartItem,
  setCartItemQuantity,
} from "./cart.js";

describe("cart helpers", () => {
  it("adds a product and increments its existing quantity", () => {
    const product = { _id: "p1", name: "Shoes", price: 100 };
    const cart = addCartItem([], product);
    assert.deepEqual(cart, [{ ...product, quantity: 1 }]);
    assert.deepEqual(addCartItem(cart, product), [{ ...product, quantity: 2 }]);
  });

  it("updates quantity without allowing values below one", () => {
    const cart = [{ id: "p1", quantity: 2 }];
    assert.equal(setCartItemQuantity(cart, "p1", 0)[0].quantity, 1);
    assert.equal(setCartItemQuantity(cart, "p1", 4)[0].quantity, 4);
  });

  it("removes items and ignores products without identifiers", () => {
    const cart = [{ id: "p1", quantity: 1 }, { id: "p2", quantity: 1 }];
    assert.equal(addCartItem(cart, { name: "invalid" }), cart);
    assert.deepEqual(removeCartItem(cart, "p1"), [cart[1]]);
  });

  it("loads only valid persisted items and handles malformed storage", () => {
    const storage = {
      getItem: () => JSON.stringify([
        { _id: "p1", quantity: 1 },
        { _id: "p2", quantity: 0 },
        null,
      ]),
    };
    assert.deepEqual(readCart(storage), [{ _id: "p1", quantity: 1 }]);
    assert.deepEqual(readCart({ getItem: () => "not-json" }), []);
  });
});
