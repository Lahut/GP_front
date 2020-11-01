import axios from 'axios';
import { setAlert } from './alertActions';
import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    USER_LOADED,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT

}from '../type';
import { setAuthToken } from '../../Utils/setAuthToken';

//Login User

export const login = ({email,password}) => async dispatch =>{
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    const body = JSON.stringify({email,password});
    axios.post('https://asia-southeast2-graduation-project-cs-32.cloudfunctions.net/api/login',body,config)
    .then( (res) => {
        dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data
        })
        dispatch(setAlert("Login successfully.",'success'))
        dispatch(loadUser());
    })
    .catch((err) => {
        const errors = err.response.data.errors;
        console.log(err.response.data.errors)
        if(errors){
            errors.forEach(error =>{
                 
                 dispatch(setAlert(error,'error'))
            }
            );
        }
        dispatch({
            type: LOGIN_FAIL
        })

    })
}

//Register User

export const signUp = ({fname,lname,email,password,password2}) => async dispatch =>{
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    const body = JSON.stringify({fname,lname,email,password,password2});
    axios.post('https://asia-southeast2-graduation-project-cs-32.cloudfunctions.net/api/signup',body,config)
    .then( (res) => {
        dispatch({
            type: REGISTER_SUCCESS,
            payload: res.data
        })
        dispatch(setAlert("Register successfully.",'success'))
        dispatch(loadUser());
    })
    .catch((err) => {
        const errors = err.response.data.errors;
        if(errors){
            errors.forEach(error =>
                 dispatch(setAlert(error,'error'))
            );
        }
        dispatch({
            type: REGISTER_FAIL
        })

    })
}

//Load User put to global headers
export const loadUser = () => async dispatch => {
    if(localStorage.token){
        setAuthToken(localStorage.token);
    }

    try{
        const res = await axios.get('https://asia-southeast2-graduation-project-cs-32.cloudfunctions.net/api/user');

        dispatch({
            type: USER_LOADED,
            payload: res.data
        })


    }catch(err) {
        dispatch({
            type: AUTH_ERROR
        })
    }
}

//logout
export const logout = () => dispatch => {
    dispatch({
        type: LOGOUT
    });
}