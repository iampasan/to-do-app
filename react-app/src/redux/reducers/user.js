import { SET_USER } from "../actionTypes";

const initialState = false;

const user = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER: {
      return action.payload.user;
    }
    default: {
      return state;
    }
  }
};

export default user;
