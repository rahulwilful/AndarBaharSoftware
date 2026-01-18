import {
  ADD_DATA,
  DELETE_LAST_DATA,
  DELETE_ALL_DATA,
  SLICE_10_FROM_FRONT
} from "../constants";

const initialState = [];


export const resultReducer = (state = initialState, action) => {
  switch (action.type) {

    case ADD_DATA:
      return [...state, action.data];

    case DELETE_LAST_DATA:
      return state.slice(0, -1);

    case DELETE_ALL_DATA:
      return [];

    case SLICE_10_FROM_FRONT:
      return state.slice(10); // ✅ remove first 10 items

    default:
      return state;
  }
};
