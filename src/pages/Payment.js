import React, { useEffect } from 'react'
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import classes from './styles/Payment.module.css';
import TextField from '@material-ui/core/TextField';
import { useLocation, useParams } from 'react-router-dom';

const Payment = () => {
    const { partyId } = useParams();
    const location = useLocation();

    const { hostId , bankDetail , price_} = location.state.paymentDetail;
    console.log(hostId,price_,bankDetail)

    

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
                    <form>
                        <input type='file'/>
                        <br/>
                        <br/>
                        <TextField style={{width:'80%',textAlign:'left',marginLeft:'2rem'}} 
                            id="outlined-basic"
                            name="fname"
                            label="ชื่อ" 
                            variant="outlined"
                            InputProps={{style:{fontSize:'1.5rem'}}}
                            InputLabelProps={{style: {fontSize:'1.5rem'}}} />
                        <br/>
                        <br/>
                        <TextField style={{width:'80%',textAlign:'left',marginLeft:'2rem'}} 
                            id="outlined-basic"
                            name="lname"
                            label="นามสกุล" 
                            variant="outlined"
                            InputProps={{style:{fontSize:'1.5rem'}}}
                            InputLabelProps={{style: {fontSize:'1.5rem'}}} />
                        <br/>
                        <br/>
                        <Button variant="contained" color="primary" style={{fontSize:'2rem'}}>
                            ส่ง
                        </Button>
                    </form>
                </div>
            </Grid>
        </Grid>
    )
}


export default Payment
