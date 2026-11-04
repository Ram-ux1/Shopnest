const crypto = require("node:crypto");
const { describe, it } = require("node:test");
const assert = require("node:assert/strict");
const { isValidPaymentSignature } = require("../controller/paymentController");

describe("payment signature validation", () => {
  it("accepts a matching HMAC and rejects altered or missing values", () => {
    const orderId = "order_123";
    const paymentId = "pay_456";
    const secret = "test-secret";
    const signature = crypto
      .createHmac("sha256", secret)
      .update(`${orderId}|${paymentId}`)
      .digest("hex");

    assert.equal(isValidPaymentSignature(orderId, paymentId, signature, secret), true);
    assert.equal(isValidPaymentSignature(orderId, paymentId, `${signature}00`, secret), false);
    assert.equal(isValidPaymentSignature(orderId, paymentId, "", secret), false);
  });
});
