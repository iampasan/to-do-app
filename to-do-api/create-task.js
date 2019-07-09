import uuid from "uuid";
import * as dynamoDbLib from "./libs/dynamodb-lib";
import { success, failure } from "./libs/response-lib";

export async function main(event, context) {
  // Request body is passed in as a JSON encoded string in 'event.body'
  const data = JSON.parse(event.body);

  const params = {
    TableName: "tasks",
    // 'Item' contains the attributes of the item to be created
    // - 'userId': user identities are federated through the
    //             Cognito Identity Pool, we will use the identity id
    //             as the user id of the authenticated user
    // - 'taskId': a unique uuid
    // - 'task': Task description parsed from request body
    // - 'status': Done or pending, parsed from request body
    // - 'createdAt': current Unix timestamp
    Item: {
      userId: event.requestContext.identity.cognitoIdentityId,
      taskId: uuid.v1(),
      description:data.description,
      completed: data.completed,
      createdAt: Date.now()
    }
  };

  try{
    await dynamoDbLib.call("put",params);
    return success(params.Item);
  }catch(e){
      return failure({status: false})
  }
  
}
