import { ADD_TODO, TOGGLE_TODO, SET_FILTER, LOAD_TODOS } from "./actionTypes";
import _ from "lodash";
import axios from "axios";

let nextTodoId = 0;

export const addTodo = content => ({
  type: ADD_TODO,
  payload: {
    id: ++nextTodoId,
    content
  }
});

export const toggleTodo = id => ({
  type: TOGGLE_TODO,
  payload: { id }
});

export const setFilter = filter => ({
  type: SET_FILTER,
  payload: { filter }
});

// export const loadTodos = () => (dispatch, getState) => {

// }

//  function fetchProducts() {

//             return res.json();
//         })
// }

export const loadTodos = () => dispatch => {
  axios.get("http://www.mocky.io/v2/5d2f113f3400005a0064d5a2").then(res => {
    dispatch({ type: LOAD_TODOS, payload: res.data });
  });
};
