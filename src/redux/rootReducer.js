import { combineReducers } from "redux";

import { resultReducer } from "./reducers/resultReducer";
import { cardReducer } from "./reducers/cardReducer";

export default combineReducers({
    resultStore:resultReducer,
    cardStore:cardReducer
})