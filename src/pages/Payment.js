import React, { useEffect, useState } from 'react'
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import classes from './styles/Payment.module.css';
import TextField from '@material-ui/core/TextField';
import { useLocation, useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { CreatePayment } from '../redux/actions/userActions';


const Payment = ({CreatePayment}) => {
    const { partyId } = useParams();
    const location = useLocation();
    //console.log(payerId && payerId.userId)




    const { hostId , bankDetail , price_ , thumbnail} = location.state.paymentDetail;


    const [DataForm,SetDataform] = useState({
        fname: '',
        lname: '',
        img_proof: {}
    })


    const handleChange = (e) => {

        console.log(e.target.value)
        SetDataform({...DataForm,[e.target.name] : e.target.value})

    }

    const handleImageChange = (e) => {
        const image = e.target.files[0];
        SetDataform({...DataForm,[e.target.name]: image});
    }
    
    const handleFormSubmit = (e) => {
        
        e.preventDefault();

        console.log(DataForm)

        const FormData_ = new FormData();

        FormData_.append("fname",DataForm.fname);
        FormData_.append("hostId",hostId)
        FormData_.append("img_proof",DataForm.img_proof);
        FormData_.append("lname",DataForm.lname);
        FormData_.append("partyId",partyId);
        FormData_.append("thumbnail",thumbnail);
        FormData_.append("","");
        CreatePayment({FormData_})



        //CreatePayment({DataForm})

    }

    return (
        <Grid container spacing={3}>
            <Grid item xs={12}>
                <div className={classes.PaymentForm}>
                    <h1 style={{paddingTop:'1rem'}}>ชำระเงิน</h1>
                    <div className={classes.PaymentDetail}>
                       <h2>โอนเงินเข้าบัญชี</h2>
                        <h2>ธนาคาร : {bankDetail.bankName}</h2>
                        <h2>เลขบัญชี : {bankDetail.bankNumber}</h2>
                        <h2>{`ชื่อบัญชี : ${bankDetail.bankFname} ${bankDetail.bankLname}`}</h2>
                        <h2>{`จำนวนเงิน `}<span style={{color:'red'}}>{price_}</span> บาท</h2> 
                    </div>
                    
                    <h1 style={{textAlign:'left',marginLeft:'5rem'}}>อัปโหลดหลักฐานการชำระเงิน</h1>
                    <form onSubmit={(e) => handleFormSubmit(e)}>
                        <input required id="standard-required" type='file' name="img_proof"  onChange={ (e)=> handleImageChange(e)}/>
                        <br/>
                        <br/>
                        <TextField style={{width:'80%',textAlign:'left',marginLeft:'2rem'}}
                            required id="standard-required" 
                            id="outlined-basic"
                            name="fname"
                            label="ชื่อ" 
                            variant="outlined"
                            value={DataForm.fname}
                            onChange={ (e) => handleChange(e)}
                            InputProps={{style:{fontSize:'1.5rem'}}}
                            InputLabelProps={{style: {fontSize:'1.5rem'}}} />
                        <br/>
                        <br/>
                        <TextField style={{width:'80%',textAlign:'left',marginLeft:'2rem'}}
                            required id="standard-required" 
                            id="outlined-basic"
                            name="lname"
                            label="นามสกุล" 
                            variant="outlined"
                            value={DataForm.lname}
                            onChange={ (e) => handleChange(e)}
                            InputProps={{style:{fontSize:'1.5rem'}}}
                            InputLabelProps={{style: {fontSize:'1.5rem'}}} />
                        <br/>
                        <br/>
                        <Button type="submit" variant="contained" color="primary" style={{fontSize:'2rem'}}>
                            ส่ง
                        </Button>
                    </form>
                </div>
            </Grid>
        </Grid>
    )
}


export default connect(null,{CreatePayment})(Payment)
