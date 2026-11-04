import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { matchesCategory } from "./catalog.js";

describe("category matching", () => {
  it("maps storefront category names to catalog categories", () => {
    assert.equal(matchesCategory("Clothing", "Fashion"), true);
    assert.equal(matchesCategory("Footwear", "Fashion"), true);
    assert.equal(matchesCategory("Home", "Home & Living"), true);
    assert.equal(matchesCategory("Electronics", "Fashion"), false);
    assert.equal(matchesCategory("Electronics", "All"), true);
  });
});
