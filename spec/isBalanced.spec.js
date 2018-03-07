const sinon = require('sinon');
const Stack = require('../src/Stack');
const isBalanced = require('../src/isBalanced');

describe('isBalanced function', () => {
  it('returns 0 if the param is not a valid string', () => {
    expect(isBalanced(null)).toEqual(0);
    expect(isBalanced(123456)).toEqual(0);
    expect(isBalanced({})).toEqual(0);
    expect(isBalanced()).toEqual(0);
  });

  it('returns -1 if the param contains no brackets', () => {
    expect(isBalanced('hello world')).toEqual(-1);
  });

  it('returns -1 if the param is an empty string', () => {
    expect(isBalanced('')).toEqual(-1);
  });

  it('returns -1 if the param is balanced', () => {
    expect(isBalanced('{}')).toEqual(-1);
    expect(isBalanced('{{{foo();}}}{}')).toEqual(-1);
    expect(isBalanced('{{}{}}')).toEqual(-1);
    expect(isBalanced('{{{{{{{{{{{{}}}}}}}}}}}}')).toEqual(-1);
  });

  it('returns the correct index if the param is NOT balanced', () => {
    expect(isBalanced('{{{}')).toEqual(0);
    expect(isBalanced('}')).toEqual(0);
    expect(isBalanced('{}{foo{}')).toEqual(2);
    expect(isBalanced('{{{{{{{{{{{{}}}}}}}}}}}}}')).toEqual(24);
  });

  describe('when renderMode flag is set to true', () => {
    let braceDetectedStub;
    let braceNotDetectedStub;
    let braceResultStub;
    let clock;
    const strFixture = '{{{abc}';
    const timer = 2000;

    const loggers = {
      braceDetected: () => {},
      braceNotDetected: () => {},
      braceResult: () => {}
    };

    beforeEach(() => {
      braceDetectedStub = sinon.stub(loggers, 'braceDetected');
      braceNotDetectedStub = sinon.stub(loggers, 'braceNotDetected');
      braceResultStub = sinon.stub(loggers, 'braceResult');
      clock = sinon.useFakeTimers();
    });

    afterEach(() => {
      clock.restore();
      loggers.braceDetected.restore();
      loggers.braceNotDetected.restore();
      loggers.braceResult.restore();
    });

    describe('when NOT in Node runtime', () => {
      it('doesn\'t call the logger functions', () => {
        isBalanced(strFixture);
        clock.tick(strFixture.length * 1000);

        expect(braceDetectedStub.calledOnce).toBe(false);
        expect(braceNotDetectedStub.calledOnce).toBe(false);
        expect(braceResultStub.calledOnce).toBe(false);
      });
    })

    it('calls braceDetected logger the correct number of times', () => {
      isBalanced(strFixture, true, timer, loggers);
      clock.tick(strFixture.length * timer);

      expect(braceDetectedStub.callCount).toEqual(4);
    });

    it('calls braceDetected logger fn with the correct params', () => {
      isBalanced(strFixture, true, timer, loggers);
      clock.tick(strFixture.length * timer);

      expect(braceDetectedStub.firstCall.calledWith(
        new Stack(['{']), 4, 0, '{', false, 0, strFixture, timer
      )).toBe(true);
    });

    it('calls braceNotDetected logger the correct number of times', () => {
      isBalanced(strFixture, true, timer, loggers);
      clock.tick(strFixture.length * timer);

      expect(braceNotDetectedStub.callCount).toEqual(3);
    });

    it('calls braceNotDetected logger fn with the correct params', () => {
      isBalanced(strFixture, true, timer, loggers);
      clock.tick(strFixture.length * timer);

      expect(braceNotDetectedStub.firstCall.calledWith(
        3, strFixture[3], timer
      )).toBe(true);
    });

    it('calls braceResult logger fn with the correct params', () => {
      isBalanced(strFixture, true, timer, loggers);
      clock.tick(strFixture.length * timer);

      expect(braceResultStub.calledOnce).toBe(true);
      expect(braceResultStub.calledWith(
        strFixture.length, false, strFixture, 0, timer
      )).toBe(true);
    });
  });
});