import AWS from "aws-sdk";
//If DynamoDb is in a different reigon than the Lambda, mention reigon :
//AWS.config.update({ region: "my-region" });

export function call(action, params) {
  let options = {}

  // connect to local DB if running offline
  if (process.env.IS_OFFLINE) {
    options = {
      region: 'localhost',
      endpoint: 'http://localhost:8000',
    };
  }

  const dynamoDb = new AWS.DynamoDB.DocumentClient(options);

  return dynamoDb[action](params).promise();
}
