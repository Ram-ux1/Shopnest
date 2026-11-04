const categoryAliases = {
  Fashion: ["fashion", "clothing", "footwear"],
  "Home & Living": ["home", "home & living"],
  "Sports & Fitness": ["sports", "fitness", "sports & fitness"],
  "Bags & Luggage": ["bags & luggage", "bags", "luggage", "accessories"],
};

export const matchesCategory = (productCategory, selectedCategory) => {
  if (!selectedCategory || selectedCategory === "All") return true;
  const product = String(productCategory || "").trim().toLowerCase();
  const selected = String(selectedCategory).trim();
  const accepted = categoryAliases[selected] || [selected.toLowerCase()];
  return accepted.includes(product);
};
