const unformattedParticipants = [
  {
    email: 'a@example.com',
    name: 'a',
    exclusions: ['b@example.com']
  },
  {
    email: 'b@example.com',
    name: 'b',
    exclusions: []
  },
  {
    email: 'c@example.com',
    name: 'c',
    exclusions: ['a@example.com', 'd@example.com']
  },
  {
    email: 'd@example.com',
    name: 'd',
    exclusions: []
  }
];

const overConstrainedParticipants = [
  {
    email: 'a@example.com',
    name: 'a',
    exclusions: ['b@example.com', 'd@example.com']
  },
  {
    email: 'b@example.com',
    name: 'b',
    exclusions: ['d@example.com']
  },
  {
    email: 'c@example.com',
    name: 'c',
    exclusions: ['a@example.com', 'd@example.com']
  },
  {
    email: 'd@example.com',
    name: 'd',
    exclusions: []
  }
];

const formattedParticipants = [
  {
    email: 'a@example.com',
    name: 'a',
    exclusions: new Set(['b@example.com', 'a@example.com'])
  },
  {
    email: 'b@example.com',
    name: 'b',
    exclusions: new Set(['b@example.com'])
  },
  {
    email: 'c@example.com',
    name: 'c',
    exclusions: new Set(['a@example.com', 'd@example.com', 'c@example.com'])
  },
  {
    email: 'd@example.com',
    name: 'd',
    exclusions: new Set(['d@example.com'])
  }
];

const sortByExclusions = [
  {
    email: 'a@example.com',
    name: 'a',
    exclusions: new Set(['b@example.com'])
  },
  {
    email: 'b@example.com',
    name: 'b',
    exclusions: new Set([])
  },
  {
    email: 'c@example.com',
    name: 'c',
    exclusions: new Set(['a@example.com', 'd@example.com'])
  },
  {
    email: 'd@example.com',
    name: 'd',
    exclusions: new Set([])
  }
];

const sortByAlpha = [
  {
    email: 'c@example.com',
    name: 'c',
    exclusions: new Set(['a@example.com', 'd@example.com'])
  },
  {
    email: 'a@example.com',
    name: 'a',
    exclusions: new Set(['b@example.com'])
  },
  {
    email: 'd@example.com',
    name: 'd',
    exclusions: new Set([])
  },
  {
    email: 'b@example.com',
    name: 'b',
    exclusions: new Set([])
  }
];

const drawObject = JSON.stringify(
  [
    [
      'a@example.com',
      'b@example.com'
    ],
    [
      'b@example.com',
      'a@example.com'
    ],
    [
      'c@example.com',
      'd@example.com'
    ],
    [
      'd@example.com',
      'c@example.com'
    ]
  ]
);

const _buildLargeParticipantList = (count) => {
  return [...Array(count).keys()].map((entry) => {
    return {
      email: entry + '@example.com',
      name: entry + '-example',
      exclusions: []
    }
  });
};

module.exports = {
  unformattedParticipants,
  overConstrainedParticipants,
  formattedParticipants,
  sortByExclusions,
  sortByAlpha,
  drawObject,
  familyParticipants,

  buildLargeParticipantList: _buildLargeParticipantList
}