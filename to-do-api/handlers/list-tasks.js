import TodoService from '../services/todo.service';
import { success, failure } from "../libs/response-lib";

export async function main(event, context) {

  const userId = event.requestContext.identity.cognitoIdentityId;

  const result = await TodoService.getAll(userId);

  if(result.status){
    return success(result.payload);
  }else{
    return failure(result.payload);
  }
}
