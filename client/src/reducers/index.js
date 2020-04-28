import {combineReducers} from "redux";
import authReducer from "./authreducer";

const reducer = combineReducers({
    auth:authReducer
});

export default reducer;