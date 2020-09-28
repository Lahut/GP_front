import {
    BANK_LOADED,
    BANK_LOADED_ERROR
}from '../type';

const initialState = {
    Allbank: [],
    loading: true
}

export default function (state = initialState,action) {
    const { type , payload } = action ;

    switch (type) {
        case BANK_LOADED:
            return{
                ...state,
                Allbank: payload,
                loading: false
            }
        case BANK_LOADED_ERROR:
            return{
                ...state,
                Allbank: []
            }
        default:
            return state;
    }
    
}