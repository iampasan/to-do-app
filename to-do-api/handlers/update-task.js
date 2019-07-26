import TodoService from "../services/todo.service";
import { success, failure } from "../libs/response-lib";

export async function main(event) {
  const userId = event.requestContext.identity.cognitoIdentityId;
  const taskId = event.pathParameters.id;
  const data = JSON.parse(event.body);

  const result = await TodoService.update(userId, taskId, data);

  if (result.status) {
    return success(result.payload);
  } else {
    return failure(result.payload);
  }
}
