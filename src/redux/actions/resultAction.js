import {
  ADD_DATA,
  DELETE_LAST_DATA,
  DELETE_ALL_DATA,
  SLICE_10_FROM_FRONT
} from "../constants";

export function addData(item) {
  return {
    type: ADD_DATA,
    data: item
  };
}

export function deleteLastData() {
  return {
    type: DELETE_LAST_DATA
  };
}

export function deleteAllData() {
  return {
    type: DELETE_ALL_DATA
  };
}


export function slice10FromFront() {
  return {
    type: SLICE_10_FROM_FRONT
  };
}
