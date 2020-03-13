import {GET_DATA_REQUEST , GET_DATA_SUCCESS , GET_DATA_FAILURE, INIT , UPDATE_DATA , REMOVE_DATA } from "../actiontypes" ;

const initState = {
    msg : [] ,
    visibleMsg : [] ,
    vIndex : 0 ,
    status : INIT ,
    pageToken : "" , 
    count : 0
} ;

function MsgReducer(state = initState , action) {

    let vMsg ;
    switch (action.type) {
        
        case GET_DATA_REQUEST:
            return {msg : state.msg, visibleMsg : state.visibleMsg, vIndex :state.vIndex ,pageToken : state.pageToken , count: state.count , status : GET_DATA_REQUEST };
        
        case GET_DATA_SUCCESS:
            let msg = [...state.msg , ...action.payload.messages] ;
            vMsg = getVisibleMsg([...msg]);
            return {msg : msg , visibleMsg : vMsg.msg, vIndex :vMsg.index ,
            pageToken : action.payload.pageToken , count: state.count + action.payload.count, status : GET_DATA_SUCCESS};
        
        case GET_DATA_FAILURE:
            return {msg : state.msg , visibleMsg : state.visibleMsg, vIndex :state.vIndex , pageToken : state.pageToken , count: state.count, status : GET_DATA_FAILURE };
        
        case UPDATE_DATA :
            vMsg = getVisibleMsg([...state.msg] , state.vIndex);
            return {msg : state.msg , visibleMsg : vMsg.msg, vIndex :vMsg.index , pageToken : state.pageToken , count: state.count, status : GET_DATA_SUCCESS };

        case REMOVE_DATA : 
            let obj = getRemovedData(state , action.i);
            return {msg : obj.msg , visibleMsg : obj.vMsg, vIndex :state.vIndex , pageToken : state.pageToken , count: state.count, status : GET_DATA_SUCCESS };
        
        default:
            return state;
            
    }
};

function getRemovedData(state , i){
    let msg = [...state.msg] ;
    let vMsg = [...state.visibleMsg] ;
    vMsg.splice(i , 1);
    msg.splice(i+state.vIndex , 1);
    return {msg : msg , vMsg : vMsg} ;
}

function getVisibleMsg(msg , vIndex){

    if(msg.length > 50){
        if(vIndex !== undefined ){
            let newIndex =  vIndex > 11 ? vIndex - 1 - 10 : 0
            return {msg : msg.splice( newIndex , 50) , index : newIndex };
        } else {
            let i = msg.length - 1 - 50 ;
            return {msg : msg.splice(i ,50) , index : i};
        }
    }

    return {msg : msg , index : 0} ;
}

export default MsgReducer;