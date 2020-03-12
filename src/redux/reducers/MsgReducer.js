import {GET_DATA_REQUEST , GET_DATA_SUCCESS , GET_DATA_FAILURE, INIT } from "../actiontypes" ;

const initState = {
    msg : [] ,
    status : INIT ,
    pageToken : "" , 
    count : 0
} ;

function MsgReducer(state = initState , action) {

switch (action.type) {
    
    case GET_DATA_REQUEST:
        return {msg : state.msg , pageToken : state.pageToken , count: state.count , status : GET_DATA_REQUEST };
    case GET_DATA_SUCCESS:
        return {msg : [...state.msg , ...action.payload.messages] , 
        pageToken : action.payload.pageToken , count: state.count + action.payload.count, status : GET_DATA_SUCCESS};
    case GET_DATA_FAILURE:
        return {msg : state.msg , pageToken : state.pageToken , count: state.count, status : GET_DATA_FAILURE };
    default:
    return state;
}

};

export default MsgReducer;