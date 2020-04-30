import {combineReducers} from "redux";
import authReducer from "./authreducer";
import {reducer as reduxForm} from "redux-form";

const reducer = combineReducers({
    auth:authReducer,
    form:reduxForm
});

export default reducer;