import todoService from "../services/todo.service";
//import * as dynamoDbLib from "../libs/dynamodb-lib";
import * as AWSMock from "aws-sdk-mock";
import * as AWS from "aws-sdk";

const testParams = {
  userId: "testUser123",
  taskId: "testTask123",
  tableName: "TestTable"
};

beforeAll(async () => {
  //Initialize AWS MOCK
  AWSMock.setSDKInstance(AWS);
  AWS.config.update({ region: "ap-southeast-1" });

  //Set Env Variables
  process.env = Object.assign(process.env, { tableName: testParams.tableName });
});

describe("Todo Service", () => {
  /**----Get Item Test----**/

  it("Shold get Item", async () => {
    // Overwriting DynamoDB.DocumentClient.get()
    AWSMock.mock("DynamoDB.DocumentClient", "get", (params, callback) => {
      console.log("DynamoDB Document Client", "get", "mock called");
      callback(null, {
        Item: {
          description: "Test Task",
          createdAt: 1564374428310,
          completed: false,
          userId: params.Key.userId,
          taskId: params.Key.taskId
        }
      });
    });

    expect(await todoService.get(testParams.userId, testParams.taskId)).toEqual(
      {
        status: true,
        payload: {
          description: "Test Task",
          createdAt: 1564374428310,
          completed: false,
          userId: testParams.userId,
          taskId: testParams.taskId
        }
      }
    );
    AWSMock.restore("DynamoDB.DocumentClient");
  });

  /**----Get All Items Test----**/

  it("Shold Get All Items", async () => {
    // Overwriting DynamoDB.DocumentClient.query()
    AWSMock.mock("DynamoDB.DocumentClient", "query", (params, callback) => {
      console.log("DynamoDB Document Client", "query", "mock called");
      callback(null, {
        Items: [
          {
            description: "Test Task",
            createdAt: 1564374428310,
            completed: false,
            userId: params.ExpressionAttributeValues[":userId"],
            taskId: testParams.taskId
          }
        ]
      });
    });

    expect(await await todoService.getAll(testParams.userId)).toEqual({
      status: true,
      payload: [
        {
          description: "Test Task",
          createdAt: 1564374428310,
          completed: false,
          userId: testParams.userId,
          taskId: testParams.taskId
        }
      ]
    });
    AWSMock.restore("DynamoDB.DocumentClient");
  });

  /**----Save Item Test----**/

  it("Shold Save Item", async () => {
    // Overwriting DynamoDB.DocumentClient.put()
    AWSMock.mock("DynamoDB.DocumentClient", "put", (params, callback) => {
      console.log("DynamoDB Document Client", "put", "mock called");
      if (params.TableName && params.Item) {
        callback(null, "Successfully put item in database");
      } else {
        throw "Missing Parameters!";
      }
    });

    let testItem = {
      description: "Test Task",
      completed: false
    };

    expect(await todoService.save(testParams.userId, testItem)).toMatchObject({
      status: true,
      payload: {
        description: "Test Task",
        completed: false,
        userId: testParams.userId
      }
    });

    AWSMock.restore("DynamoDB.DocumentClient");
  });

  /**----Update Item Test----**/

  it("Should Update Item", async () => {
    // Overwriting DynamoDB.DocumentClient.update()
    AWSMock.mock("DynamoDB.DocumentClient", "update", (params, callback) => {
      console.log("DynamoDB Document Client", "update", "mock called");
      callback(null, {
        Attributes: {
          description: params.ExpressionAttributeValues[":description"],
          createdAt: 1564374428310,
          completed: params.ExpressionAttributeValues[":completed"],
          userId: params.Key.userId,
          taskId: params.Key.taskId
        }
      });
    });

    let testItem = {
      description: "Test Task",
      completed: false
    };

    expect(
      await todoService.update(testParams.userId, testParams.taskId, testItem)
    ).toEqual({
      status: true,
      payload: {
        description: "Test Task",
        createdAt: 1564374428310,
        completed: false,
        userId: testParams.userId,
        taskId: testParams.taskId
      }
    });

    AWSMock.restore("DynamoDB.DocumentClient");
  });

  /**----Delete Item Test----**/

  it("Should Update Item", async () => {
    // Overwriting DynamoDB.DocumentClient.delete()
    AWSMock.mock("DynamoDB.DocumentClient", "delete", (params, callback) => {
      console.log("DynamoDB Document Client", "delete", "mock called");
      if (params.TableName && params.Key) {
        callback(null, "Successfully deleted the item from database!");
      } else {
        throw "Missing Parameters!";
      }
    });

    expect(
      await todoService.delete(testParams.userId, testParams.taskId)
    ).toEqual({
      status: true,
      payload: {
        status: true
      }
    });

    AWSMock.restore("DynamoDB.DocumentClient");
  });
});
