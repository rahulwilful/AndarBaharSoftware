import { combineReducers } from "redux";

import { resultReducer } from "./reducers/resultReducer";
import { cardReducer } from "./reducers/cardReducer";
import { formReducer } from "./reducers/FormReducer";
import { databaseReducer } from "./reducers/databaseReducer";

export default combineReducers({
    resultStore:resultReducer,
    cardStore:cardReducer,
    formStore:formReducer,
    databaseStore:databaseReducer
})