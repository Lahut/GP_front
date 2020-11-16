import axios from 'axios';
import {
    BANK_LOADED,
    BANK_LOADED_ERROR

}from '../type';

export const loadBank = () => async dispatch => {
    try{

        const res = await axios.get('http://localhost:5000/graduation-project-cs-32/asia-southeast2/api/getBankByid')

        if(res){
            dispatch({
                type: BANK_LOADED,
                payload: res.data
            })
        }
    }catch(err){
        dispatch({
            type: BANK_LOADED_ERROR
        })
    }

}