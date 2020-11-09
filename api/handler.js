'use strict';

const aws = require('aws-sdk');
const ses = new aws.SES({region: 'us-east-1'});
const seedrandom = require('seedrandom');
const cuchumbo = require('./lib/cuchumbo');

module.exports.create = async (event, context) => {

  const superSecretSecret = process.env.SEED_SALT;
  const notSecretRequestId = context.awsRequestId;
  const rng = seedrandom(superSecretSecret + notSecretRequestId);

  const requestParticipants = JSON.parse(event.body);

  console.log('requestData', {...requestParticipants, requestId: notSecretRequestId});

  const cuchumboDraw = cuchumbo.generateCuchumbo(rng, familyParticipants);

  const bulkDestinations = cuchumboDraw.map((drawing) => {
    return {
      Destination: {
        ToAddresses: [
          drawing.sendTo
        ]
      },
      ReplacementTemplateData: JSON.stringify({giverName: drawing.sendToName, receiverName: drawing.targetName})
    }
  });

  var params = {
    Destinations: bulkDestinations,
    Source: 'Cuchumbo <mail@cuchumbo.io>',
    Template: 'CuchumboParticipant',
    DefaultTemplateData: JSON.stringify({ giverName: "friend", targetName: "unknown" })
  };

  await ses.sendBulkTemplatedEmail(params).promise();

  return JSON.stringify({
    message: JSON.stringify({requestId: notSecretRequestId}),
    input: event,
  });
};
