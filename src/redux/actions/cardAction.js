import { SET_STATES, DELETE_STATES } from "../constants";

export function setStates(item) {
  return {
    type: SET_STATES,
    data: item,
  };
}

export function deleteStates() {
  return {
    type: DELETE_STATES,
  };
}
