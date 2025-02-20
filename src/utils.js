// ----------------------------------------------------------------------------
/**
 * Returns a random boolean value with 50% probability of being true
 * @returns {boolean} - Returns true or false with equal probability
 */
export const isRandomTrue = () => {
  return Math.random() > 0.5;
};

// ----------------------------------------------------------------------------
/**
 * Returns a random integer between two numbers, inclusive
 * @param {number} start - The minimum value (inclusive)
 * @param {number} end - The maximum value (inclusive)
 * @returns {number} - A random integer between start and end
 */
export const randomBetween = (start, end) => {
  return start + Math.floor(Math.random() * (end - start + 1));
};
