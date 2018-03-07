## Balanced Braces algorithm

### Introduction
This solution to the classic Balanced Braces algorithm comes loaded with features.

* ES6 language features
* 100% code coverage
* Complete doc blocks for EVERY function
* CLI tool for visualizing the isBalanced function in action (omgz wow)

### Implementation
Please see the `isBalanced` function doc block for all of the info regarding the implementation of the function.  It includes details such as assumptions, time complexity, and space complexity.

To get started simply do the following:

1. Make sure Node is installed
2. `npm install` - installs dependencies (only jasmine/sinon for testing and istanbul for code coverage)
3. `npm start` - runs a script that stdouts all of the provided test cases (plus a few more)

### Specs
The specs are created using the **Jasmine** testing framework and **Sinon** for stubs and spies.  **Istanbul** is also used to analyze code coverage.  To run the suite do the following:

1. `npm test` - runs test suite and outputs code coverage results (**100%** across the board!)

### CLI tool
I created a CLI tool that allows you run the `isBalanced` function from the command line. Run it like this:

* `./cli/is-balanced.js '{{{foo();}}}{}'`
  * Runs the `isBalanced` function in standard mode, taking `'{{{foo();}}}{}'` as the string parameter
* `./cli/is-balanced.js '{}{foo{}' -p`
  * runs the `isBalanced` function in render mode (b/c of the `-p` flag), taking `'{}{foo{}'` as the string parameter.  Stdouts every `1000ms` (default value, but this can also be specified)
* `./cli/is-balanced.js '{{{}' 2000 -p`
  * runs the `isBalanced` function in render mode, taking `'{{{}'` as the string parameter.  Stdouts every `2000ms` (instead of `1000ms` from the previous example)

