/**
 * Check if param is a valid brace character
 * @param {string} c - character input
 * @return {boolean} true if valid brace character
 */
const isValidBrace = c => (c === '{' || c === '}');

/**
 * Check if two character inputs form complete braces
 * @param {string} a - first character input
 * @param {string} b - second character input
 * @return {boolean} - true if first and second characters are complete braces
 */
const areCompleteBraces = (a, b) => (a === '{' && b === '}');

/**
 * Calculate the number of braces in a string
 * @param {string} str - string parameter
 * @return {number} the number of valid braces in the str param
 */
const getNumberOfBraces = str => str.split('').reduce((acc, s) => acc + (isValidBrace(s) ? 1 : 0), 0);

module.exports = {
  isValidBrace,
  areCompleteBraces,
  getNumberOfBraces
};