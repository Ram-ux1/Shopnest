const { describe, it } = require("node:test");
const assert = require("node:assert/strict");
const { normalizeEmail, validateRegistration } = require("../utils/authUtils");

describe("authentication input validation", () => {
  it("normalizes valid emails and rejects invalid ones", () => {
    assert.equal(normalizeEmail(" USER@Example.COM "), "user@example.com");
    assert.equal(normalizeEmail("invalid"), null);
  });

  it("validates registration fields and ignores requested roles", () => {
    assert.deepEqual(
      validateRegistration({
        name: " Ada ",
        email: " ADA@example.com ",
        password: "passphrase",
        role: "admin",
      }),
      { name: "Ada", email: "ada@example.com", password: "passphrase" },
    );
    assert.ok(validateRegistration({ name: "Ada", email: "ada@example.com", password: "short" }).error);
    assert.ok(validateRegistration({ name: "", email: "ada@example.com", password: "passphrase" }).error);
  });
});
