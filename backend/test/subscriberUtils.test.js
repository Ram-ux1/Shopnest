const { describe, it } = require("node:test");
const assert = require("node:assert/strict");
const { normalizeSubscriberEmail } = require("../utils/subscriberUtils");

describe("newsletter email validation", () => {
  it("normalizes valid emails and rejects malformed values", () => {
    assert.equal(normalizeSubscriberEmail("  SHOPPER@Example.COM "), "shopper@example.com");
    assert.equal(normalizeSubscriberEmail("not-an-email"), null);
    assert.equal(normalizeSubscriberEmail(null), null);
  });
});
