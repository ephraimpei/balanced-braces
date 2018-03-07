const { isValidBrace, areCompleteBraces, getNumberOfBraces } = require('../src/helpers');

describe('isValidBrace function', () => {
  it('returns true if input is a valid bracket', () => {
    expect(isValidBrace('{')).toBe(true);
    expect(isValidBrace('}')).toBe(true);
  });

  it('returns false if input is NOT a valid bracket', () => {
    expect(isValidBrace({})).toBe(false);
    expect(isValidBrace(null)).toBe(false);
    expect(isValidBrace('(')).toBe(false);
    expect(isValidBrace(')')).toBe(false);
    expect(isValidBrace('{{')).toBe(false);
  });
});

describe('areCompleteBraces function', () => {
  it('returns true if source and target inputs are complete brackets', () => {
    expect(areCompleteBraces('{', '}')).toBe(true);
  });

  it('returns false if source and target inputs are complete brackets but in the wrong order', () => {
    expect(areCompleteBraces('}', '{')).toBe(false);
  });

  it('returns false if source and target inputs are NOT complete brackets', () => {
    expect(areCompleteBraces('(', ')')).toBe(false);
    expect(areCompleteBraces('[', ']')).toBe(false);
    expect(areCompleteBraces('{', null)).toBe(false);
    expect(areCompleteBraces(0, '}')).toBe(false);
    expect(areCompleteBraces('a', 'b')).toBe(false);
    expect(areCompleteBraces(2, 2)).toBe(false);
  });
});

describe('getNumberOfBraces function', () => {
  it('correctly returns the number of valid braces in a string', () => {
    expect(getNumberOfBraces('123')).toEqual(0);
    expect(getNumberOfBraces('abc{efg}lol{')).toEqual(3);
    expect(getNumberOfBraces('{{{{{{}}}}}}{{{{')).toEqual(16);
  });
});