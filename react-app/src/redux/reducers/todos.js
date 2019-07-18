import { ADD_TODO, TOGGLE_TODO, LOAD_TODOS } from '../actionTypes';

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
        byIds: [
          ...state.byIds,
          {
            ...state.byIds[id],
            completed: !state.byIds[id].completed
          }
        ]
      };
    }
    case LOAD_TODOS: {
      return { ...state, byIds: action.payload };
    }
    default:
      return state;
  }
}
