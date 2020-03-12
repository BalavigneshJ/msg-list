import { combineReducers } from 'redux';
import MsgReducer from "./MsgReducer" ;


const rootReducer = combineReducers({
  DATA : MsgReducer
});

export default rootReducer;
