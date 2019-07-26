import uuid from "uuid";
import * as dynamoDbLib from "../libs/dynamodb-lib";

class TodoService {
  constructor() {
    this.todoTable = process.env.tableName;
  }

  async get(userId, taskId) {
    const params = {
      TableName: this.todoTable,
      // 'Key' defines the partition key and sort key of the item to be updated
      // - 'userId': Identity Pool identity id of the authenticated user
      // - 'taskId': path parameter
      Key: {
        userId: userId,
        taskId: taskId
      }
    };

    try {
      const result = await dynamoDbLib.call("get", params);
      console.log(result);
      if (result.Item) {
        // Return the retrieved item
        return { status: true, payload: result.Item };
      } else {
        return { status: false, payload: { message: "Item not found !" } };
      }
    } catch (e) {
      return {
        status: false,
        payload: { message: "Retreiving item failed !", error: e }
      };
    }
  }

  async getAll(userId) {
    const params = {
      TableName: this.todoTable,
      // 'KeyConditionExpression' defines the condition for the query
      // - 'userId = :userId': only return items with matching 'userId'
      //   partition key
      // 'ExpressionAttributeValues' defines the value in the condition
      // - ':userId': defines 'userId' to be Identity Pool identity id
      //   of the authenticated user
      KeyConditionExpression: "userId = :userId",
      ExpressionAttributeValues: {
        ":userId": userId
      }
    };

    try {
      const result = await dynamoDbLib.call("query", params);
      // Return the matching list of items in response body
      return { status: true, payload: result.Items };
    } catch (e) {
      return {
        status: false,
        payload: { message: "Failed getting items !", error: e }
      };
    }
  }

  async save(cognitoIdentityId, item) {
    const todo = {
      userId: cognitoIdentityId,
      taskId: uuid.v1(),
      description: item.description,
      completed: item.completed,
      createdAt: Date.now()
    };

    const params = {
      TableName: this.todoTable,
      Item: todo
    };

    try {
      await dynamoDbLib.call("put", params);
      return { status: true, payload: todo };
    } catch (e) {
      return {
        status: false,
        payload: { message: "Saving task failed !", error: e }
      };
    }
  }

  async update(userId, taskId, item) {
    const params = {
      TableName: this.todoTable,
      // 'Key' defines the partition key and sort key of the item to be updated
      // - 'userId': Identity Pool identity id of the authenticated user
      // - 'taskId': path parameter
      Key: {
        userId: userId,
        taskId: taskId
      },
      // 'UpdateExpression' defines the attributes to be updated
      // 'ExpressionAttributeValues' defines the value in the update expression
      UpdateExpression:
        "SET description = :description, completed = :completed",
      ExpressionAttributeValues: {
        ":description": item.description || null,
        ":completed":
          typeof item.completed === "boolean" ? item.completed : false
      },
      // 'ReturnValues' specifies if and how to return the item's attributes,
      // where ALL_NEW returns all attributes of the item after the update; you
      // can inspect 'result' below to see how it works with different settings
      ReturnValues: "ALL_NEW"
    };

    try {
      const result = await dynamoDbLib.call("update", params);
      return { status: true, payload: result.Attributes };
    } catch (e) {
      return {
        status: false,
        payload: { message: "Updating task failed !", error: e }
      };
    }
  }

  async delete(userId, taskId) {
    const params = {
      TableName: this.todoTable,
      // 'Key' defines the partition key and sort key of the item to be removed
      // - 'userId': Identity Pool identity id of the authenticated user
      // - 'taskId': path parameter
      Key: {
        userId: userId,
        taskId: taskId
      }
    };

    try {
      const result = await dynamoDbLib.call("delete", params);
      return { status: true, payload: { status: true } };
    } catch (e) {
      return {
        status: false,
        payload: { message: "Could not delete the item !", error: e }
      };
    }
  }
}
module.exports = new TodoService();
