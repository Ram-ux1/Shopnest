import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { getCartTotals } from "./pricing.js";

describe("cart pricing", () => {
  it("charges shipping below the free-shipping threshold", () => {
    assert.deepEqual(getCartTotals([{ price: 500, quantity: 1 }]), {
      subtotal: 500,
      shipping: 49,
      discount: 0,
      total: 549,
    });
  });

  it("waives shipping at the threshold and applies the coupon to merchandise", () => {
    assert.deepEqual(getCartTotals([{ price: 999, quantity: 1 }], true), {
      subtotal: 999,
      shipping: 0,
      discount: 100,
      total: 899,
    });
  });
});
