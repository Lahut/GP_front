import React, { useEffect, useState } from 'react'
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import classes from './styles/Payment.module.css';
import TextField from '@material-ui/core/TextField';
import { useLocation, useParams,useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { UploadImgProof } from '../redux/actions/userActions';


const Payment = ({UploadImgProof}) => {
    let history = useHistory();
    const calculateTimeLeft = () => {
        

        // getTime() + (h*60*60*1000)
        const { paymentDetail , price , time,paymentId   } = location.state;
        const difference = time - +new Date();
        // if(difference < 0){
        //     axios.post(`http://localhost:5000/graduation-project-cs-32/asia-southeast2/api/${paymentId}`)
        //     .then(() => console.log('success'))
        //     .catch((err) =>console.log(err) )
        // }
        let timeLeft = {};
    
        if (difference > 0) {
          timeLeft = {
            days: Math.floor(difference / (1000 * 60 * 60 * 24)),
            ชั่วโมง: Math.floor((difference / (1000 * 60 * 60)) % 24),
            นาที: Math.floor((difference / 1000 / 60) % 60),
            วินาที: Math.floor((difference / 1000) % 60),
          };
        }
    
        return timeLeft;
      };
    const { partyId } = useParams();
    const location = useLocation();
    //console.log(payerId && payerId.userId)

    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
    const { paymentDetail , price , time, paymentId   } = location.state;


      useEffect(() => {
        setTimeout(() => {
          setTimeLeft(calculateTimeLeft());
        }, 1000);
      });

      const timerComponents = [];

        Object.keys(timeLeft).forEach((interval) => {
            if (!timeLeft[interval]) {
            return;
            }

            timerComponents.push(
            <span>
                {timeLeft[interval]} {interval}{" "}
            </span>
            );
        });

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
    
    const handleFormSubmit = async (e) => {
        
        e.preventDefault();

        console.log(DataForm)

        const FormData_ = new FormData();
         FormData_.append("fname",DataForm.fname);
         FormData_.append("lname",DataForm.lname);
         FormData_.append("img_proof",DataForm.img_proof);
        // FormData_.append("lname",DataForm.lname);
        // //FormData_.append("partyId",partyId);
        // FormData_.append("thumbnail",thumbnail);
         FormData_.append("","");

        await UploadImgProof({FormData_,paymentId})

        history.push("/myparty");



        //UploadImgProof({DataForm})

    }

    return (
        <Grid container spacing={3}>
            {
                !timerComponents.length ? history.push("/myparty") : null
            }
            <Grid item xs={12}>
                <div className={classes.PaymentForm}>
                    <h1 style={{paddingTop:'1rem'}}>ชำระเงิน</h1>
                    <h1>กรุณาชำระเงินภายใน</h1>
                    <h1 style={{color:'red'}}>{timerComponents.length ? timerComponents : <span>Time's up!</span>}</h1>
                    <div className={classes.PaymentDetail}>
                        <h2>โอนเงินเข้าบัญชี</h2>
                        <h2>ธนาคาร : {paymentDetail.bankName}</h2>
                        <h2>เลขบัญชี : {paymentDetail.bankNumber}</h2>
                        <h2>{`ชื่อบัญชี : ${paymentDetail.bankFname} ${paymentDetail.bankLname}`}</h2>
                        <h2>{`จำนวนเงิน `}<span style={{color:'red'}}>{price}</span> บาท</h2> 
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


export default connect(null,{UploadImgProof})(Payment)
