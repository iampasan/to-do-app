import { ADD_TODO, TOGGLE_TODO, LOAD_TODOS } from "../actionTypes";
let dotProp = require("dot-prop-immutable");

const initialState = {
  allIds: [],
  byIds: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case ADD_TODO: {
      const { id, content } = action.payload;
      return {
        ...state,
        allIds: [...state.allIds, id],
        byIds: [
          ...state.byIds,
          {
            id: id,
            content,
            completed: false
          }
        ]
      };
    }
    case TOGGLE_TODO: {
      const { id } = action.payload;
      return {
        ...state,
        byIds: state.byIds.map((item, index) => {
          if (item["taskId"] === id) {
            return {
              ...item,
              completed: !state.byIds[index].completed
            };
          }
          return item;
        })
      };
    }
    case LOAD_TODOS: {
      return {
        ...state,
        byIds: action.payload,
        allIds: [...state.allIds, action.payload[1]["taskId"]]
      };
    }
    default:
      return state;
  }
}
