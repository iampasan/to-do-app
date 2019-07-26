import { success, failure } from "../libs/response-lib";
import TodoService from '../services/todo.service';

export async function main(event) {

  const userId = event.requestContext.identity.cognitoIdentityId;
  const taskId = event.pathParameters.id

  const result = await TodoService.get(userId,taskId);

  if(result.status){
    return success(result.payload);
  }else{
    return failure(result.payload);
  }
}
