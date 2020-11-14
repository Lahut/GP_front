import React from 'react'
import classes from '../pages/styles/MemberTicket.module.css'
import { useHistory } from 'react-router-dom';
//MUI
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
const MemberTicket = ({hostId,status,message,partyId,partyImg,hostImg,payment,timeLeft,price,paymentId}) => {
    console.log(hostImg)
    let history = useHistory();
    let color = "";
    if(status === 'waiting' || status === 'pending') color = "#ECFF00"
    if(status === 'success') color = "#0AD306"
    if(status === 'reject') color  = "#EA1702"

    


    return (
        <Grid   item xs={12} sm={6}>
            <div className={classes.card}>
                <div className={classes.cardImage}>
                    <img style={{cursor:'pointer'}} src={partyImg} onClick={() => history.push(`/showParty/party/${partyId}`)} />
                </div>
                <div style={{width:'200px'}}>
                    <h1 style={{position:'relative',left:'23rem',bottom:'25rem'}}>เจ้าของปาตี้</h1>
                    <h1 style={{position:'relative',left:'23rem',bottom:'21rem'}}>สถานะ <span style={{marginLeft:'3rem',color:`${color}`}}>{status}</span></h1>
                    {
                        status === 'waiting' ? <a style={{fontSize:'1.5rem',position:'relative',bottom:'24.8rem',left:'40rem',color:'#ECFF00',cursor:'pointer'}}  onClick ={ ()=> history.push({
                            pathname : `/payment/party/${partyId}`,
                            state : { paymentDetail : payment , time: timeLeft, price: price , paymentId : paymentId }
                        })} >คลิกเพื่อชำระเงิน</a> : null
                    }
                </div>
                <div className={classes.dot} >
                    <img  src={hostImg} />
                </div>
                <div className={classes.btnGroup}>
                    {
                        status === 'success' || status === 'reject' ?<Button style={{backgroundColor:"white",fontSize:'1.5rem',position:'relative',left:'2rem'}} variant="outlined">ดูข้อมูล</Button> :
                        null
                    }
                    
                </div>
            </div>
        </Grid>
    )
}

export default MemberTicket
