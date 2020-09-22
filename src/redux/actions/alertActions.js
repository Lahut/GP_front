import {SET_ALERT, REMOVE_ALERT} from '../type';
const {v4 : uuidv4} = require('uuid');


export const setAlert = (msg,alertType,timeout =  5000 /* default parameter*/) => dispatch => {
    const id = uuidv4();
    dispatch({
        type: SET_ALERT,
        payload: { msg, alertType, id}
    });
    
    setTimeout(()=> dispatch({ type: REMOVE_ALERT,payload:id}), timeout); 
    
};