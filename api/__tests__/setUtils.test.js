const sut = require('../lib/setUtils');

test('is non empty when a subset of all items match', () => {
  const s1 = new Set(['a', 'b', 'c', 'd']);
  const s2 = new Set(['b', 'd']);

  const difference = sut.getDifference(s1, s2);

  expect(difference).toStrictEqual(new Set(['a', 'c']));
});

test('is empty when all items match', () => {
  const s1 = new Set(['b', 'd']);
  const s2 = new Set(['a', 'b', 'c', 'd']);

  const difference = sut.getDifference(s1, s2);

  expect(difference).toStrictEqual(new Set([]));
});

test('is identity of s1 for disjoint sets', () => {
  const s1 = new Set(['a', 'c']);
  const s2 = new Set(['b', 'd']);

  const difference = sut.getDifference(s1, s2);

  expect(difference).toStrictEqual(s1);
});

test('getDifference returns new object', () => {
  const s1 = new Set(['a', 'c']);
  const s2 = new Set(['b', 'd']);

  const difference = sut.getDifference(s1, s2);

  expect(difference).not.toBe(s1);
  expect(difference).not.toBe(s2);
});

test('is combination of both sets', () => {
  const s1 = new Set(['a', 'c']);
  const s2 = new Set(['b', 'd']);

  const union = sut.getUnion(s1, s2);

  expect(union).toStrictEqual(new Set(['a', 'b', 'c', 'd']));
});