// Validation Utilities

// Validate email
export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Validate phone number
export const isValidPhone = (phone) => {
  const phoneRegex = /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/;
  return phoneRegex.test(phone);
};

// Validate required field
export const isRequired = (value) => {
  if (typeof value === 'string') {
    return value.trim().length > 0;
  }
  return value !== null && value !== undefined;
};

// Validate minimum length
export const minLength = (value, min) => {
  return value && value.length >= min;
};

// Validate maximum length
export const maxLength = (value, max) => {
  return value && value.length <= max;
};

// Validate number range
export const isInRange = (value, min, max) => {
  const num = Number(value);
  return num >= min && num <= max;
};
