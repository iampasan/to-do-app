import AWS from "aws-sdk";
//If DynamoDb is in a different reigon than the Lambda, mention reigon :
//AWS.config.update({ region: "my-region" });

export function call(action, params) {
  const dynamoDb = new AWS.DynamoDB.DocumentClient();

  return dynamoDb[action](params).promise();
}
