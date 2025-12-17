import { combineReducers } from "redux";

import { resultReducer } from "./reducers/resultReducer";

export default combineReducers({
    resultStore:resultReducer
})