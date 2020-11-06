import React from 'react'
import classes from '../pages/styles/PaymentTicket.module.css'
//MUI
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
const PaymentTicket = () => {
    return (
        <Grid   item xs={12} sm={6}>
            <div className={classes.card}>
                <div className={classes.cardImage}>
                    <img src="https://i.ibb.co/sJXZDWG/sushi-1.jpg" />
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
