import {
  DELETE_LAST_DATA,
  DELETE_ALL_DATA,
  SLICE_10_FROM_FRONT,
  SET_DATA_FROM_DATABASE
} from "../constants";

const initialState = [];


export const databaseReducer = (state = initialState, action) => {
  switch (action.type) {

    case SET_DATA_FROM_DATABASE:
      return action.data;

    
    default:
      return state;
  }
};
