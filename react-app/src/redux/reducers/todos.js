import { ADD_TODO, TOGGLE_TODO, LOAD_TODOS, REMOVE_TODO } from "../actionTypes";
let dotProp = require("dot-prop-immutable");

const initialState = {
  allIds: [],
  byIds: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case ADD_TODO: {
      const { taskId, description } = action.payload;
      return {
        
        allIds: [...state.allIds, taskId],
        byIds: [
          ...state.byIds,
          {
            taskId: taskId,
            description,
            completed: false
          }
        ]
      };
    }
    case TOGGLE_TODO: {
      const { id, completed } = action.payload;
      return {
        ...state,
        byIds: state.byIds.map((item, index) => {
          if (item["taskId"] === id) {
            return {
              ...item,
              completed: !completed
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
        allIds: [action.payload.map(item => item.taskId)]
      };
    }

    case REMOVE_TODO: {
     
      return {
        ...state,
        byIds: state.byIds.filter((elem, idx) => { 
           if(elem.taskId !== action.payload.id){
            console.log(state.byIds)
            return elem;
          }
        }),
        allIds: state.allIds.filter((elem, idx) => { 
           if(elem !== action.payload.id){
             console.log(elem+" allIds "+action.payload.id)
            return elem;
          }
        })
      }
    }
    default:
      return state;
  }
}
