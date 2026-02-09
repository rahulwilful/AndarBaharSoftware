import { SET_LIMIT_FORM_FALSE, TOGGLE_LIMIT_FORM } from "../constants";

const initialState = false;

export const formReducer = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_LIMIT_FORM:
      return !state;
    case SET_LIMIT_FORM_FALSE:
      return false;

    default:
      return state;
  }
};
