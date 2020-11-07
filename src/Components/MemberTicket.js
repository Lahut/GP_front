import React from 'react'
import classes from '../pages/styles/MemberTicket.module.css'
//MUI
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
const MemberTicket = ({hostId,status,message,partyId,partyImg}) => {
    let color = "";
    if(status === 'waiting') color = "#ECFF00"
    if(status === 'success') color = "#0AD306"
    if(status === 'reject') color  = "#EA1702"


    return (
        <Grid   item xs={12} sm={6}>
            <div className={classes.card}>
                <div className={classes.cardImage}>
                    <img src={partyImg} />
                </div>
                <div style={{width:'200px'}}>
                    <h1 style={{position:'relative',left:'23rem',bottom:'25rem'}}>เจ้าของปาตี้</h1>
                    <h1 style={{position:'relative',left:'23rem',bottom:'21rem'}}>สถานะ <span style={{marginLeft:'3rem',color:`${color}`}}>รออนุมัติ</span></h1>
                </div>
                <div className={classes.dot} >
                    <img src="https://i.ibb.co/VTWnQmM/S-8937474.jpg"/>
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
