import uuid from "uuid";
import * as dynamoDbLib from "../libs/dynamodb-lib";

class TodoService {
  constructor() {
    this.todoTable = process.env.tableName;
  }

  async save(cognitoIdentityId,item) {
    const todo = {
      userId: cognitoIdentityId,
      taskId: uuid.v1(),
      description: item.description,
      completed: item.completed,
      createdAt: Date.now()
    }

    const params = {
      TableName: this.todoTable,
      Item: todo
    };

    try{
      await dynamoDbLib.call("put",params);
      return {status:true,payload:todo};
    }catch(e){
      console.log(e)
      return {status:false,payload:{error:"Saving to DB Failed"}};
    }
  }
}

module.exports = TodoService;