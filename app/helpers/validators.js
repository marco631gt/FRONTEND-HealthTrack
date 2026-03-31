export const patterns = {
  email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  password: /^(?=.*[A-Z])(?=.*\d).{6,}$/,
};

export const validate = (type, value) => {
  return patterns[type]?.test(value);
};