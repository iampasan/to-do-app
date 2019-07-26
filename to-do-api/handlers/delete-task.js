import TodoService from "../services/todo.service";
import { success, failure } from "../libs/response-lib";

export async function main(event) {
  const userId = event.requestContext.identity.cognitoIdentityId;
  const taskId = event.pathParameters.id;

  const result = await TodoService.delete(userId, taskId);

  if (result.status) {
    return success(result.payload);
  } else {
    return failure(result.payload);
  }
}
