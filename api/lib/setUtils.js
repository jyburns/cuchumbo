const _getDifference = (s1, s2) => {
  return new Set([...s1].filter(value => !s2.has(value)));
};

const _getUnion = (s1, s2) => {
  const union = new Set(s1);

  s2.forEach(item => union.add(item));

  return union;
};

module.exports = {
  getDifference: _getDifference,
  getUnion: _getUnion
}
