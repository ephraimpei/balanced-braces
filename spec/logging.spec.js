const sinon = require('sinon');
const Stack = require ('../src/Stack');
const { logBraceDetected, logBraceNotDetected, logBraceResult } = require('../src/logging');

const str = '{{{foo();}}}{';
const numBraces = 8;
const iteration = 3;
const complete = false;
const timer = 2000;
const idx = 0;
const char = str[iteration];
const returnValue = -1;

describe('logBraceDetected function', () => {
  let consoleStub;
  let stack;
  let stackRenderStub;
  let stdOutStub;
  let clock;

  beforeEach(() => {
    consoleStub = sinon.stub(console, 'log');
    stdOutStub = sinon.stub(process.stdout, 'write');
    stack = new Stack();
    stackRenderStub = sinon.stub(stack, 'render');
    clock = sinon.useFakeTimers();

    logBraceDetected(stack, numBraces, iteration, char, complete, idx, str, timer);
    clock.tick(iteration * timer);
  });

  afterEach(() => {
    console.log.restore();
    process.stdout.write.restore();
    clock.restore();
  });

  it('calls the setTimeout callback at the correct time', () => {
    expect(consoleStub.called).toBe(true);
  });

  it('stdouts \'\033c\'', () => {
    expect(stdOutStub.calledWith('\033c')).toBe(true);
  });

  it('calls console.log 5 times with the correct parameters', () => {
    expect(consoleStub.callCount).toEqual(4);
    expect(consoleStub.firstCall.calledWith(`Characters left to evaluate: '${str.slice(iteration + 1)}'`)).toBe(true);
    expect(consoleStub.secondCall.calledWith(`Brace character detected: '${char}'`)).toBe(true);
    expect(consoleStub.thirdCall.calledWith(`Imbalance detected! Setting breaking brace idx to: ${idx}`)).toBe(true);
    // This is actually the fourth call...
    expect(consoleStub.getCall(3).calledWith('Rendering the current stack...')).toBe(true);

    // Testing when complete flag is false...
    console.log.restore();
    consoleStub = sinon.stub(console, 'log');

    logBraceDetected(stack, numBraces, iteration, char, true, idx, str, timer);
    clock.tick(iteration * timer);

    expect(consoleStub.thirdCall.calledWith('Complete braces detected! Popping from the stack...')).toBe(true);
  });

  it('calls the stack#render method with the correct parameter', () => {
    expect(stackRenderStub.calledWith(numBraces)).toBe(true);
  });
});

describe('logBraceNotDetected function', () => {
  let consoleStub;
  let clock;

  beforeEach(() => {
    consoleStub = sinon.stub(console, 'log');
    clock = sinon.useFakeTimers();

    logBraceNotDetected(iteration, char, timer);

    clock.tick(iteration * timer);
  });

  afterEach(() => {
    console.log.restore();
    clock.restore();
  });

  it('calls the setTimeout callback at the correct time', () => {
    expect(consoleStub.called).toBe(true);
  });

  it('calls console.log once with the correct parameter', () => {
    expect(consoleStub.calledOnce).toBe(true);
    expect(consoleStub.calledWith(`Character '${char}' is not a brace. Skipping...`)).toBe(true);
  });
});

describe('logBraceResult function', () => {
  let consoleStub;
  let clock;

  beforeEach(() => {
    consoleStub = sinon.stub(console, 'log');
    clock = sinon.useFakeTimers();

    logBraceResult(iteration, complete, str, returnValue, timer);

    clock.tick(iteration * timer);
  });

  afterEach(() => {
    console.log.restore();
    clock.restore();
  });

  it('calls the setTimeout callback at the correct time', () => {
    expect(consoleStub.called).toBe(true);
  });

  it('calls console.log twice with the correct parameter', () => {
    expect(consoleStub.callCount).toEqual(2);
    expect(consoleStub.firstCall.calledWith(`The input '${str}' is NOT BALANCED!`)).toBe(true);
    expect(consoleStub.secondCall.calledWith(`The return value is ${returnValue}`)).toBe(true);

    // Testing when complete flag is false...
    console.log.restore();
    consoleStub = sinon.stub(console, 'log');

    logBraceResult(iteration, true, str, returnValue, timer);
    clock.tick(iteration * timer);

    expect(consoleStub.firstCall.calledWith(`The input '${str}' is BALANCED!`)).toBe(true);
  });
});