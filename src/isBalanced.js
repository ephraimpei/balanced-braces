const Stack = require('./Stack');
const { isValidBrace, areCompleteBraces, getNumberOfBraces } = require('./helpers');
const { logBraceDetected, logBraceNotDetected, logBraceResult } = require('./logging');

/**
 * Check if a string is balanced.
 * Uses a stack to keep track of imbalances. Is balanced if stack is empty at the end.
 * Only assign the first breaking brace idx tracker when an imbalance occurs.
 * Assumptions:
 *    1.) input is a string type and can contain any character
 *    2.) input is balanced if it contains 0 balanced pairs
 *    3.) only checking for { or } braces
 * Time Complexity: O(n), n = the length of the string param (it's actually O(2*n) b/c of using getNumberOfBraces)
 * Space Complexity: O(m), m = the number of brackets in the string param
 * @param {string} str to check if balanced
 * @param {boolean} renderMode set to true to enable rendering mode (chk out cli/demo.js)
 * @param {number} timer used in render mode, number of ms between renders
 * @param {object} loggers used in render mode, logger fns (depedency injected for easier unit testing)
 * @return {number} -1 if balanced, idx of the first breaking brace if not balanced
 */
const isBalanced = (
  str,
  renderMode = false,
  timer = 1000,
  loggers = {
    braceDetected: logBraceDetected,
    braceNotDetected: logBraceNotDetected,
    braceResult: logBraceResult
  }
) => {
  if (typeof str !== 'string') {
    return 0;
  }

  const numBraces = getNumberOfBraces(str);

  if (numBraces === 0) {
    return -1;
  }

  const stack = new Stack();

  let idx = 0;
  let wasComplete = true;

  // CLI rendering mode is for funsies...
  const enableRenderMode = renderMode && typeof global === 'object';

  for (let i = 0; i < str.length; i++) {
    const char = str[i];

    if (isValidBrace(char)) {
      const complete = areCompleteBraces(stack.peek(), char);

      if (complete) {
        stack.pop();
      } else {
        stack.push(char);

        if (wasComplete) {
          idx = i;
        }
      }

      wasComplete = complete;

      if (enableRenderMode) {
        loggers.braceDetected(
          new Stack([...stack.items]), numBraces, i, char, complete, idx, str, timer
        );
      }
    } else {
      if (enableRenderMode) {
        loggers.braceNotDetected(i, char, timer);
      }
    }
  }

  const complete = stack.isEmpty();
  const returnValue = complete ? -1 : idx;

  if (enableRenderMode) {
    loggers.braceResult(str.length, complete, str, returnValue, timer);
  }

  return returnValue;
}

module.exports = isBalanced;