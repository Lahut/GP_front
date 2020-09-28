import axios from 'axios';
import { setAlert } from './alertActions';

export const addBank = ({DataForm}) => async dispatch =>{
    for (var pair of DataForm.entries()) {
        console.log(pair[0]+ ', ' + pair[1]); 
    }
    console.log('hit')
    const config = {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    }
    axios.post(
        'https://asia-southeast2-graduation-project-cs-32.cloudfunctions.net/api/addBank',DataForm,config)
        .then( () => {
            dispatch(setAlert("ส่งข้อมูลบัญชีธนาคารเรียบร้อยแล้วรอทำการยืนยัน2-3วัน","success"))
        })
        .catch( (err) => {
            const errors = err.response.data.errors;
            if(errors){
                errors.forEach(error =>
                    dispatch(setAlert(error,'error'))
                    );
                }
            })
        }