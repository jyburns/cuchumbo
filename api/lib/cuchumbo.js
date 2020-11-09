const setUtils = require('./setUtils');

const MAX_PARTICIPANTS = 9;

const _generateCuchumbo = (seededRng, participants) => {
  if (participants.length > MAX_PARTICIPANTS) throw new Error(`too many participants, max is ${MAX_PARTICIPANTS}`);

  const formattedParticipants = _buildFormattedParticipants(participants);
  const orderedParticipants = _buildOrderedParticipants(formattedParticipants);
  const remainingParticipantEmails = new Set(orderedParticipants.map(participant => participant.email));
  const validDrawings = _generatePotentialCuchumbos(orderedParticipants, remainingParticipantEmails);

  if (validDrawings.size === 0) throw new Error('no combinations exist with the given the constraints');

  const participantMap = _buildParticipantMap(formattedParticipants);
  const draw = _chooseDrawing(seededRng, validDrawings);

  return _buildCuchumboResults(draw, participantMap);
}

const _buildFormattedParticipants = (participants) => {
  return participants.map((participant) => {
    return {
      email: participant.email,
      name: participant.name,
      exclusions: new Set([...participant.exclusions, participant.email])
    }
  });
};

const _buildOrderedParticipants = (participants) => {
  return [...participants].sort(_customCuchumboSorter);
};

const _customCuchumboSorter = (a, b) => {
  if (a.exclusions.size > b.exclusions.size) return 1;
  if (a.exclusions.size < b.exclusions.size) return -1;

  return a.email.localeCompare(b.email);
};

const _buildParticipantMap = (participants) => {
  return new Map(
    participants.map((participant) => {
      return [
        participant.email,
        participant.name
      ]
    })
  );
};

const _chooseDrawing = (rng, validDrawings) => {
  const rand = Math.floor(rng() * validDrawings.size);

  return [...validDrawings][rand];
};

const _buildCuchumboResults = (draw, participantMap) => {
  return JSON.parse(draw).map(([sendTo, targetEmail]) => {
    return {
      sendTo: sendTo,
      sendToName: participantMap.get(sendTo),
      targetEmail: targetEmail,
      targetName: participantMap.get(targetEmail)
    };
  });
};

// this is insanely inefficient 🙃, hence the current limit of 9.
const _generatePotentialCuchumbos = (orderedParticipants, remainingParticipantEmails) => {
  return _searchSubtree([...orderedParticipants], new Set(remainingParticipantEmails), new Map([]));
};

const _searchSubtree = (orderedParticipants, remainingParticipantEmails, currentWalk) => {
  const participant = orderedParticipants.pop();
  const possibleTargets = setUtils.getDifference(remainingParticipantEmails, participant.exclusions);
  let viablePaths = new Set([]);

  if (possibleTargets.size === 0) return viablePaths;

  if (remainingParticipantEmails.size === 1) {
    const lastTarget = [...possibleTargets][0];

    currentWalk.set(participant.email, lastTarget);

    viablePaths.add(_buildSuccessfulDraw(currentWalk));

    return viablePaths;
  }

  possibleTargets.forEach((target) => {
    let subtreeCurrentWalk = new Map(currentWalk);
    let subtreeRemainingParticipants = new Set(remainingParticipantEmails);

    subtreeCurrentWalk.set(participant.email, target);
    subtreeRemainingParticipants.delete(target);

    const foundPaths = _searchSubtree([...orderedParticipants], subtreeRemainingParticipants, subtreeCurrentWalk);

    viablePaths = setUtils.getUnion(viablePaths, foundPaths);
  });

  return viablePaths;
};

const _buildSuccessfulDraw = (currentDraw) => {
  return JSON.stringify(
    [...currentDraw.entries()].sort()
  );
};

module.exports = {
  buildCuchumboResults: _buildCuchumboResults,
  buildFormattedParticipants: _buildFormattedParticipants,
  buildOrderedParticipants: _buildOrderedParticipants,
  buildParticipantMap: _buildParticipantMap,
  generateCuchumbo: _generateCuchumbo,
  generatePotentialCuchumbos: _generatePotentialCuchumbos
};