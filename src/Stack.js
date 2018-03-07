/**
 * Class representing basic Stack implementation
 */
class Stack {
  /**
   * Instantiate a stack
   * @param {array} items - an initial list
   */
  constructor(items = []) {
    this.items = items instanceof Array ? items : [];
  }

  /**
   * Get the top item on the stack
   * @return {string|object|number|null} the top item (or null)
   */
  peek() {
    if (this.isEmpty()) {
      return null;
    }

    return this.items[this.items.length - 1];
  }

  /**
   * Push item into the stack
   * @param {string|object|number|null} item - the item to push
   * @return {string|object|number|null} the pushed item (or null)
   */
  push(item) {
    if (!item) {
      return null;
    }

    this.items.push(item);
    return item;
  }

  /**
   * Pop an item from the stack
   * @return {string|object|number|null} the popped item (or null)
   */
  pop() {
    if (this.isEmpty()) {
      return null;
    }

    return this.items.pop();
  }

  /**
   * Check if the stack is empty
   * @return {boolean} true if the stack is empty
   */
  isEmpty() {
    return this.items.length === 0;
  }

  /**
   * Get a reference to the items in the stack
   * @return {array} the items in the stack
   */
  getItems() {
    return this.items;
  }

  /**
   * Console.log the stack
   * @param {number} rows - number of rows to render
   */
  render(rows = this.items.length) {
    let output = '';

    for (let i = rows - 1; i >= 0; i--) {
      output += `|${this.items[i] || ' '}|\n`;
    }

    console.log(output += '---');
  }
}

module.exports = Stack;