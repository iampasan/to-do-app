import TodoService from '../services/todo.service';
import { success, failure } from "../libs/response-lib";

export async function main(event) {
  // Request body is passed in as a JSON encoded string in 'event.body'
  const data = JSON.parse(event.body);
  const cognitoIdentityId = event.requestContext.identity.cognitoIdentityId;

  const result = await TodoService.save(cognitoIdentityId,data);

  if(result.status){
    return success(result.payload);
  }else{
    return failure(result.payload);
  }
  
}
