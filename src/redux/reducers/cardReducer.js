import {
  ADD_DATA,
  DELETE_LAST_DATA,
  DELETE_ALL_DATA,
  SLICE_10_FROM_FRONT,
  SET_STATES,
  DELETE_STATES
} from "../constants";


const cardStates = [{ name: "0", value: 0, andarWins: 0, baharWins: 0 },
    { name: "1", value: 1, andarWins: 0, baharWins: 0 },
    { name: "2", value: 2, andarWins: 0, baharWins: 0 },
    { name: "3", value: 3, andarWins: 0, baharWins: 0 },
    { name: "4", value: 4, andarWins: 0, baharWins: 0 },
    { name: "5", value: 5, andarWins: 0, baharWins: 0 },
    { name: "6", value: 6, andarWins: 0, baharWins: 0 },
    { name: "7", value: 7, andarWins: 0, baharWins: 0 },
    { name: "8", value: 8, andarWins: 0, baharWins: 0 },
    { name: "9", value: 9, andarWins: 0, baharWins: 0 },
    { name: "10", value: 10, andarWins: 0, baharWins: 0 },
   { name: "J", value: 11, andarWins: 0, baharWins: 0 },
    { name: "Q", value: 12, andarWins: 0, baharWins: 0 },
     { name: "K", value: 13, andarWins: 0, baharWins: 0 }]

export const cardReducer = (state = cardStates, action) => {
  switch (action.type) {

    case SET_STATES:
     return action.data
    case DELETE_STATES:
      return cardStates

    default:
      return state;
  }
};
