const isBalanced = require('./src/isBalanced');

// Provided test cases
console.log(`'hello world' => ${isBalanced('hello world')}`); // -1
console.log(`'{}' => ${isBalanced('{}')}`); // -1
console.log(`'{{{foo();}}}{}' => ${isBalanced('{{{foo();}}}{}')}`); // -1
console.log(`'{{}{}}' => ${isBalanced('{{}{}}')}`); // -1
console.log(`'{{{}' => ${isBalanced('{{{}')}`); // 0
console.log(`'}' => ${isBalanced('}')}`); // 0
console.log(`'{}{foo{}' => ${isBalanced('{}{foo{}')}`); // 2

// Other test cases
console.log(`123 => ${isBalanced(123)}`); // 0
console.log(`{} => ${isBalanced({})}`); // 0
console.log(`null => ${isBalanced(null)}`); // 0
console.log(`undefined => ${isBalanced()}`); // 0
console.log(`'' => ${isBalanced('')}`); // -1
console.log(`'{{{{{{{{{{{{}}}}}}}}}}}}' => ${isBalanced('{{{{{{{{{{{{}}}}}}}}}}}}')}`); // -1
console.log(`'{{{{{{{{{{{{}}}}}}}}}}}}}' => ${isBalanced('{{{{{{{{{{{{}}}}}}}}}}}}}')}`); // 24