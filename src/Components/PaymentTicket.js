import React from 'react'
import classes from '../pages/styles/PaymentTicket.module.css'
import { useHistory } from 'react-router-dom';
//MUI
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';


const PaymentTicket = ({fname,lname,payerImg,payerId,partyImg,partyId,proofImg}) => {

    let history = useHistory();
    return (
        <Grid   item xs={12} sm={6}>
            <div className={classes.card}>
                <div className={classes.cardImage}>
                    <img style={{cursor:'pointer'}} src={partyImg} onClick={() => history.push(`/showParty/party/${partyId}`)} />
                </div>
                <div style={{width:'200px',height:'10px'}}>
                    <h1 style={{position:'relative',left:'23rem',bottom:'25rem'}}>ผู้ส่ง</h1>
                    <h2 style={{position:'relative',left:'33rem',bottom:'25rem'}}>{`${fname} ${lname}`}</h2>
                    <a style={{position:'relative',left:'30rem',bottom:'22rem',fontSize:'2rem'}} href={proofImg}>หลักฐานการชำระเงิน</a>
                </div>
                <div className={classes.dot} >
                    <img src={payerImg}/>
                </div>
                <div className={classes.btnGroup}>
                    <Button  style={{margin: '5px',fontSize:'1.5rem'}} variant="outlined" color="primary">
                        อนุมัติ
                    </Button>
                    <Button style={{margin: '5px',fontSize:'1.5rem'}} variant="outlined" color="secondary">
                        ปฏิเสธ
                    </Button>
                </div>
            </div>
        </Grid>
    )
}

export default PaymentTicket
