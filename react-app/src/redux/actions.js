import { ADD_TODO, TOGGLE_TODO, SET_FILTER, LOAD_TODOS, SET_USER } from "./actionTypes";
import _ from "lodash";
import axios from "axios";
import { API } from "aws-amplify";

let nextTodoId = 0;

export const addTodo = content => ({
  type: ADD_TODO,
  payload: {
    id: ++nextTodoId,
    content
  }
});

export const toggleTodo = (id, completed) => ({
  type: TOGGLE_TODO,
  payload: { id, completed }
});

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

export const loadTodos = () => dispatch => {
  API.get("tasks", "/tasks").then(res => {
    console.log("here"+res)
    dispatch({ type: LOAD_TODOS, payload: res });
  });
};
