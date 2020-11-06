import React, { useEffect, useState } from 'react'
import axios from 'axios';
//MUI
import Grid from '@material-ui/core/Grid';

//Component
import PaymentTicket from '../Components/PaymentTicket';

//Redux
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
const MyParty = () => {

    const [Allticket,SetAllticket] = useState({
        hostTicket_ : [],
        memberTicket_ : []
    });

    useEffect ( () => {

        const fetchData = async () => {
            const res = await axios.get('https://asia-southeast2-graduation-project-cs-32.cloudfunctions.net/api/gethostTicketNmemberTicket')
            if(res){
                SetAllticket({
                    hostTicket_ : res.data.hostTicket,
                    memberTicket_ : res.data.MemberTicket
                })
            }
        }
        fetchData();

    },[])

    console.log(Allticket)
    return (
        
        <Grid container spacing={3}>
            
        <Grid item xs={12}>
            <h1>
                คำขอร่วมปาตี้
            </h1>
        </Grid>
        {
            Allticket.hostTicket_.length === 0 ? <Grid item xs={12}><h1 style={{textAlign:'center'}}>คุณยังไม่มีคำขอเข้าร่วมปาตี้ :(</h1></Grid> : Allticket.hostTicket_.map(() => {
                return <PaymentTicket />
            })
        }
        <Grid item xs={12}>
            <h1>
                สถานะการชำระเงิน
            </h1>
        </Grid>
        {
            Allticket.memberTicket_.length === 0 ? <Grid item xs={12}><h1 style={{textAlign:'center'}}>คุณยังไม่ได้ขอเข้าร่วมปาตี้ใดๆ :(</h1></Grid> : Allticket.memberTicket_.map(() => {
                return <PaymentTicket />
            })
        }
        
        </Grid>
        
    )
}

export default connect(null)(MyParty)
