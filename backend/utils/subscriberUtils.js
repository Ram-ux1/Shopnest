const normalizeSubscriberEmail = (email) => {
  if (typeof email !== "string") return null;
  const normalized = email.trim().toLowerCase();
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalized) ? normalized : null;
};

module.exports = { normalizeSubscriberEmail };
