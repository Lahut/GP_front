import axios from 'axios';  

export const setAuthToken = token => {
    if(token){

        axios.defaults.headers.common['Authorization'] = token; // for set to global header
    } else {
        delete axios.defaults.headers.common['Authorization'];
    } 
}
