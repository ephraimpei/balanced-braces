/**
 * Used by isBalanced function to log some details to the console when valid brace char detected
 * @param {Stack} stack - the stack to render
 * @param {number} numBraces - number of valid braces in the string param
 * @param {number} iteration - iteration number
 * @param {string} char - character that was just evaluated
 * @param {boolean} complete - if current iteration outcome is complete braces
 * @param {number} idx - current index of the first breaking brace
 * @param {string} str - string characters that still need to be evaluated
 * @param {number} timer - number of seconds to wait before logging
 */
const logBraceDetected = (stack, numBraces, iteration, char, complete, idx, str, timer) => {
  setTimeout(() => {
    process.stdout.write('\033c');

    console.log(`Characters left to evaluate: '${str.slice(iteration + 1)}'`);
    console.log(`Brace character detected: '${char}'`);
    if (complete) {
      console.log('Complete braces detected! Popping from the stack...');
    } else {
      console.log(`Imbalance detected! Setting breaking brace idx to: ${idx}`);
    }
    console.log('Rendering the current stack...');

    stack.render(numBraces);
  }, timer * iteration);
};

/**
 * Used by isBalanced function to log some details to the console when invalid brace char detected
 * @param {number} iteration - iteration number
 * @param {string} char - character that was just evaluated
 * @param {number} timer - number of seconds to wait before logging
 */
const logBraceNotDetected = (iteration, char, timer) => {
  setTimeout(() => {
    console.log(`Character '${char}' is not a brace. Skipping...`);
  }, timer * iteration);
};

/**
 * Used by isBalanced function to log the result
 * @param {number} iteration - iteration number
 * @param {boolean} complete - if current iteration outcome is complete braces
 * @param {string} str - string characters that still need to be evaluated
 * @param {number} returnValue - return value of the isBalanced function
 * @param {number} timer - number of seconds to wait before logging
 */
const logBraceResult = (iteration, complete, str, returnValue, timer) => {
  setTimeout(() => {
    console.log(`The input '${str}' ${complete ? 'is' : 'is NOT'} BALANCED!`);
    console.log(`The return value is ${returnValue}`);
  }, timer * iteration);
}

module.exports = {
  logBraceDetected,
  logBraceNotDetected,
  logBraceResult
}