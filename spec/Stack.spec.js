const sinon = require('sinon');
const Stack = require('../src/Stack');

describe('Stack class', () => {
  let stack;
  let returnValue;

  describe('constructor', () => {
    it('sets items instance variable to empty array if no param specified', () => {
      stack = new Stack();
      expect(stack.items instanceof Array).toBe(true);
      expect(stack.items.length).toEqual(0);
    });

    it('sets items instance variable to empty array if param is invalid', () => {
      stack = new Stack('abc');
      expect(stack.items instanceof Array).toBe(true);
      expect(stack.items.length).toEqual(0);
    });

    it('sets items instance variable correctly if array param is passed', () => {
      const param = ['a', 'b', 'c'];
      stack = new Stack(param);
      expect(stack.items instanceof Array).toBe(true);
      expect(stack.items).toEqual(param);
    });
  });

  describe('#peek', () => {
    describe('when the stack is empty', () => {
      it('returns null', () => {
        stack = new Stack();
        returnValue = stack.peek();
        expect(returnValue).toBe(null);
      });
    });

    it('returns the top item in the stack if it is NOT empty', () => {
      stack = new Stack([1, 2, 3]);
      returnValue = stack.peek();
      expect(returnValue).toEqual(3);
    });
  });

  describe('#push', () => {
    beforeEach(() => {
      stack = new Stack();
    });

    describe('when there isn\'t a valid item param', () => {
      it('items array remain unchanged and returns null', () => {
        returnValue = stack.push(null);
        expect(stack.items.length).toEqual(0);
        expect(returnValue).toBe(null);
      });
    });

    it('pushes the item param into the items array and returns the pushed item', () => {
      returnValue = stack.push(123);
      expect(stack.items.length).toEqual(1);
      expect(returnValue).toBe(123);
    });
  });

  describe('#pop', () => {
    describe('when the stack is empty', () => {
      it('items array remain unchanged and returns null', () => {
        stack = new Stack();
        returnValue = stack.pop();
        expect(stack.items.length).toEqual(0);
        expect(returnValue).toBe(null);
      });
    });

    it('pops the items array and returns the popped item', () => {
      stack = new Stack([123]);
      returnValue = stack.pop();
      expect(stack.items.length).toEqual(0);
      expect(returnValue).toBe(123);
    });
  });

  describe('#isEmpty', () => {
    it('returns true if stack is empty', () => {
      stack = new Stack();
      expect(stack.isEmpty()).toBe(true);
    });

    it('returns false if stack is NOT empty', () => {
      stack = new Stack(['hello', 'friend']);
      expect(stack.isEmpty()).toBe(false);
    });
  });

  describe('#getItems', () => {
    it('returns a pass by reference to the items instance', () => {
      const items = ['sup', 'wit', 'it'];
      stack = new Stack(items);
      expect(stack.getItems()).toEqual(items);

      stack.getItems().push('!!!');
      expect(stack.peek()).toEqual('!!!');
    });
  });

  describe('#render', () => {
    let consoleSpy;

    beforeEach(() => {
      consoleSpy = sinon.spy(console, 'log');
    });

    afterEach(() => {
      console.log.restore();
    });

    describe('when rows param is not provided', () => {
      it('calls console.log with the correct string param', () => {
        stack = new Stack([1, 2, 3]);
        stack.render();
        const expectedOutput = `|3|\n|2|\n|1|\n---`;
        expect(consoleSpy.calledWith(expectedOutput)).toBe(true);
      });
    });

    it('calls console.log with the correct string param', () => {
      stack = new Stack([1, 2, 3]);
      stack.render(5);
      const expectedOutput = `| |\n| |\n|3|\n|2|\n|1|\n---`;
      expect(consoleSpy.calledWith(expectedOutput)).toBe(true);
    })
  });
});