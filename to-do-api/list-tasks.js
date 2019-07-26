import TodoService from './services/todo-service';
import { success, failure } from "./libs/response-lib";

//Create todoService
let todoService = new TodoService();

export async function main(event, context) {

  const userId = event.requestContext.identity.cognitoIdentityId;

  const result = await todoService.getAll(userId);

  if(result.status){
    return success(result.payload);
  }else{
    return failure(result.payload);
  }
}
