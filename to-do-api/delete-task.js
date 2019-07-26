import TodoService from "./services/todo-service";
import { success, failure } from "./libs/response-lib";

//Create todoService
let todoService = new TodoService();

export async function main(event) {
  const userId = event.requestContext.identity.cognitoIdentityId;
  const taskId = event.pathParameters.id;

  const result = await todoService.delete(userId, taskId);

  if (result.status) {
    return success(result.payload);
  } else {
    return failure(result.payload);
  }
}
