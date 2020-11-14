import axios from 'axios';
import { setAlert } from './alertActions';
import swal from 'sweetalert';

export const addBank = ({DataForm}) => async dispatch =>{
    // for (var pair of DataForm.entries()) {
    //     console.log(pair[0]+ ', ' + pair[1]); 
    // }
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

export const CreatePartyy = ({DataForm}) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    }
    try{

        const res = axios.post(
        'https://asia-southeast2-graduation-project-cs-32.cloudfunctions.net/api/createhome',
        DataForm,config);

        if(res){
            dispatch(setAlert("สร้างปาตี้เรียบร้อย!","success"));
        }


    }catch(err){
        const errors = err.response.data.errors;
        if(errors){
            errors.forEach(error =>
                 dispatch(setAlert(error,'error'))
            );
        }
    }

    

}

export const loadParty = ({category}) => async dispatch => {

    try{

        const res = await axios.get(`https://asia-southeast2-graduation-project-cs-32.cloudfunctions.net/api/getparty/${category}`);

        if(res){
            return res.data();
        }


    }catch(err){
        const errors = err.response.data.errors;
        console.log(err);
        if(errors){
            errors.forEach(error =>
                 dispatch(setAlert(error,'error'))
            );
        }
    }
}

export const CreatePayment = ({partyId}) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    }

    try{
        const FormData_ = new FormData();
        const res = await axios.post(`https://asia-southeast2-graduation-project-cs-32.cloudfunctions.net/api/createPayment/${partyId}`,
        FormData_,config);

        if(res.data.message === "เข้าร่วมปาตี้สำเร็จ") {
            swal(res.data.message,"คุณสามารถชำระเงินได้ที่หน้าโปรไฟล์","success");
        }else{
            swal(res.data.message,"","error");
        }
        
    }catch(err) {
        const errors = err.response.data.errors;
        console.log(err)
        if(errors){
            errors.forEach(error =>
                 dispatch(setAlert(error,'error'))
            );
        }
    }

}


