import {FETCH_USER} from "../actions/types";

export default (state=null,actions)=>{
    console.log(actions);
    switch (actions.type) {
        case FETCH_USER:
            return actions.payload || false;
        default:
            return state;
    }
}