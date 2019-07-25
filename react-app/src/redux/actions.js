import { ADD_TODO, TOGGLE_TODO, SET_FILTER, LOAD_TODOS, SET_USER, REMOVE_TODO } from "./actionTypes";
import _ from "lodash";
import axios from "axios";
import { API } from "aws-amplify";

let nextTodoId = 0;

// export const addTodo = description => ({
//   type: ADD_TODO,
//   payload: {
//     taskId: 55,
//     description
//   }
// });

// export const toggleTodo = (id, completed) => ({
//   type: TOGGLE_TODO,
//   payload: { id, completed }
// });

export const setFilter = filter => ({
  type: SET_FILTER,
  payload: { filter }
});

export const setUser = user => ({
  type: SET_USER,
  payload: { user }
});

// export const loadTodos = () => (dispatch, getState) => {

// }

//  function fetchProducts() {

//             return res.json();
//         })
// }

export const  loadTodos = () => dispatch => {
   API.get("tasks", "/tasks").then(res => {
    console.log(res)
    dispatch({ type: LOAD_TODOS, payload: res });
  });
};

export const addTodo = (description) => dispatch => {
 
  let apiName = 'tasks'; 
  let path = '/tasks'; 
  let myInit = {
    body: {description: description, completed: false}, 
    
}

API.post(apiName, path, myInit).then(response => {
  dispatch({ type: ADD_TODO, payload: { taskId: response.taskId, description } });
}).catch(error => {
    console.log(error.response)
});

};


export const toggleTodo = (id, completed, description) => dispatch => {
 
  let apiName = 'tasks'; 
  let path = '/tasks/'+id; 
  let myInit = {
    body: {description: description, completed: !completed}, 
    
}

API.put(apiName, path, myInit).then(response => {
  dispatch({ type: TOGGLE_TODO,  payload: { id, completed } });
}).catch(error => {
    console.log(error.response)
});

};

export const removeTodo = (id) => dispatch => {
  let apiName = 'tasks';
  let path = '/tasks/'+id; 

  API.del(apiName, path).then(response => {
    dispatch({ type: REMOVE_TODO,  payload: { id } });
  }).catch(error => {
      console.log(error.response)
  });
}
