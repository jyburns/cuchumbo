const sut = require('../lib/cuchumbo');
const seedrandom = require('seedrandom');

const participantsFixture = require('./__fixtures__/participants');

const _getSeededRng = () => {
  return seedrandom('superSecretSecret' + 'notSecretRequestId');
};

test('builds formatted particpant object', () => {
  const formattedParticipants = sut.buildFormattedParticipants(participantsFixture.unformattedParticipants);

  expect(formattedParticipants).toStrictEqual(participantsFixture.formattedParticipants);
});

test('sorts participants by exclusion size first', () => {
  const orderedParticipants = sut.buildOrderedParticipants(participantsFixture.sortByExclusions);

  expect(orderedParticipants).toMatchSnapshot();
});

test('sorts participants alphabetically by email second', () => {
  const orderedParticipants = sut.buildOrderedParticipants(participantsFixture.sortByAlpha);

  expect(orderedParticipants).toMatchSnapshot();
});

test('builds participant map', () => {
  const participantMap = sut.buildParticipantMap(participantsFixture.formattedParticipants);

  expect(participantMap).toMatchSnapshot();
});

test('generates all viable cuchumbos given a data set', () => {
  const formattedParticipants = sut.buildFormattedParticipants(participantsFixture.unformattedParticipants);
  const orderedParticipants = sut.buildFormattedParticipants(formattedParticipants);
  const remainingParticipantEmails = new Set(orderedParticipants.map(participant => participant.email));

  const potentialCuchumbos = sut.generatePotentialCuchumbos(orderedParticipants, remainingParticipantEmails);

  expect(potentialCuchumbos).toMatchSnapshot();
});

test('builds result object from participant map', () => {
  const participantMap = sut.buildParticipantMap(participantsFixture.formattedParticipants);
  const resultsObject = sut.buildCuchumboResults(participantsFixture.drawObject, participantMap);

  expect(resultsObject).toMatchSnapshot();
});

test('throw when there are over maximum participants', () => {
  const rng = _getSeededRng();
  const longList = [...Array(101).keys()];

  const generateForLongList = () => {
    sut.generateCuchumbo(rng, longList);
  };

  expect(generateForLongList).toThrowErrorMatchingSnapshot();
});

test('throw when there are no viable solutions', () => {
  const rng = _getSeededRng();
  const participants = participantsFixture.overConstrainedParticipants;

  const attemptToGenerate = () => {
    sut.generateCuchumbo(rng, participants);
  }

  expect(attemptToGenerate).toThrowErrorMatchingSnapshot();
});

test('generate cuchumbo is a pure function', () => {
  const resultsObject1 = sut.generateCuchumbo(_getSeededRng(), participantsFixture.unformattedParticipants);
  const resultsObject2 = sut.generateCuchumbo(_getSeededRng(), participantsFixture.unformattedParticipants);
  const resultsObject3 = sut.generateCuchumbo(_getSeededRng(), participantsFixture.unformattedParticipants);

  expect(resultsObject1).toMatchSnapshot();
  expect(resultsObject1).toStrictEqual(resultsObject2);
  expect(resultsObject2).toStrictEqual(resultsObject3);
});

test('generate cuchumbo matches snapshot battery', () => {
  const rng = _getSeededRng();

  for(let i = 0; i < 5; i++) {
    const resultsObject = sut.generateCuchumbo(rng, participantsFixture.unformattedParticipants);
    expect(resultsObject).toMatchSnapshot();
  }

});

test('generates large cuchumbo in reasonable amount of time', () => {
  const rng = _getSeededRng();
  const largeParticipantList = participantsFixture.buildLargeParticipantList(9);

  sut.generateCuchumbo(rng, largeParticipantList);
});
