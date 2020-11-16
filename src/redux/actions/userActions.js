import axios from 'axios';
import { setAlert } from './alertActions';
import swal from 'sweetalert';
import { useHistory  } from 'react-router-dom';
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
        'http://localhost:5000/graduation-project-cs-32/asia-southeast2/api/addBank',DataForm,config)
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

        const res = await axios.post(
        'http://localhost:5000/graduation-project-cs-32/asia-southeast2/api/createhome',
        DataForm,config);

        if(res){
            dispatch(setAlert("สร้างปาตี้เรียบร้อย!","success"));
            return res.data.message
            
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

        const res = await axios.get(`http://localhost:5000/graduation-project-cs-32/asia-southeast2/api/getparty/${category}`);

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
        const res = await axios.post(`http://localhost:5000/graduation-project-cs-32/asia-southeast2/api/createPayment/${partyId}`,
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

export const UploadImgProof =  ({FormData_,paymentId}) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    }

    try{
        const res = await axios.post(`http://localhost:5000/graduation-project-cs-32/asia-southeast2/api/uploadImgProof/${paymentId}`,
        FormData_,config);

        if(res.data.message === "ส่งหลักฐานชำระเงินเรียบร้อย") {
            swal(res.data.message,"รอหัวหน้าปาตี้ตรวจสอบสามารถดูสถานะการชำระเงินได้ที่หน้าปาตี้ของฉัน","success");
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

export const DecryptMessage = ({iv,content}) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    

    try{

        const body = JSON.stringify({iv,content});
        const res = await axios.post('http://localhost:5000/graduation-project-cs-32/asia-southeast2/api/decrptMessage',body,config);
        if(res) {
            return res.data.message ;
        }

    }catch(err)  {
        console.log(err)
    }
}


