const normalizeEmail = (email) => {
  if (typeof email !== "string") return null;
  const normalized = email.trim().toLowerCase();
  return normalized.length <= 254 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalized)
    ? normalized
    : null;
};

const validateRegistration = (body = {}) => {
  const name = typeof body.name === "string" ? body.name.trim() : "";
  const email = normalizeEmail(body.email);
  const password = body.password;

  if (!name || name.length > 100 || !email) {
    return { error: "Enter a name and a valid email address" };
  }
  if (
    typeof password !== "string" ||
    password.length < 8 ||
    Buffer.byteLength(password, "utf8") > 72
  ) {
    return { error: "Password must be at least 8 characters and no more than 72 bytes" };
  }
  return { name, email, password };
};

module.exports = { normalizeEmail, validateRegistration };
