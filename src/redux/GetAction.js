import {GET_DATA_REQUEST , GET_DATA_SUCCESS , GET_DATA_FAILURE } from "./actiontypes" ;
import axios from 'axios';

export const getDataRequest = () => ({
    type: GET_DATA_REQUEST
});

export const getDataSuccess = content => ({
    type: GET_DATA_SUCCESS,
    payload: content
});

export const getDataFailure = () => ({
    type: GET_DATA_FAILURE
});
  
  
export const getData = (key) => {

    let url = 'http://message-list.appspot.com/messages' ;
    if(key !== undefined){
      url = url + "?pageToken=" + key
    }

    return (dispatch) => {
        dispatch(getDataRequest());
        axios({
            method: 'get', 
            url: url,
          })
          .then(response => {
            dispatch(getDataSuccess(response.data));
          })
          .catch(error => {
            dispatch(getDataFailure());
          });
      }
}; 