import {
  ADD_DATA,
  DELETE_LAST_DATA,
  DELETE_ALL_DATA,
  SLICE_10_FROM_FRONT,
  SET_STATES,
  DELETE_STATES,
  TOGGLE_LIMIT_FORM,
  SET_LIMIT_FORM_FALSE,
  SET_DATA
} from "../constants";

export function addData(item) {
  return {
    type: ADD_DATA,
    data: item
  };
}

export function setData(item) {
  return {
    type: SET_DATA,
    data: item
  };
}

export function addResult(item) {
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

export function deleteLastResult() {
  return {
    type: DELETE_LAST_DATA
  };
}

export function deleteAllData() {
  return {
    type: DELETE_ALL_DATA
  };
}

export function deleteAllResult() {
  return {
    type: DELETE_ALL_DATA
  };
}


export function slice10FromFront() {
  return {
    type: SLICE_10_FROM_FRONT
  };
}





export function toggleLimitForm () {
  return {
    type:TOGGLE_LIMIT_FORM,
  }
}

export function setLimitFormFalse () {
  return {
    type:SET_LIMIT_FORM_FALSE,
    
  }
}
