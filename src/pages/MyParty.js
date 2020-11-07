import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Spinner from '../layouts/Spinner';
//MUI
import Grid from '@material-ui/core/Grid';

//Component
import PaymentTicket from '../Components/PaymentTicket';
import MemberTicket from '../Components/MemberTicket';
//Redux
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
const MyParty = () => {

    const [loading,Setloading] = useState(true)
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
                Setloading(false)
            }
        }
        fetchData();

    },[])

    console.log(Allticket)
    if(loading) return <Spinner />
    return (
        
        <Grid container spacing={3}>
            
        <Grid item xs={12}>
            <h1>
                คำขอร่วมปาตี้
            </h1>
        </Grid>
        {
            Allticket.hostTicket_.length === 0 ? <Grid item xs={12}><h1 style={{textAlign:'center'}}>คุณยังไม่มีคำขอเข้าร่วมปาตี้ :(</h1></Grid> : Allticket.hostTicket_.map((doc,index) => {
                return <PaymentTicket
                            key={index} 
                            fname={doc.fname}
                            lname={doc.lname}
                            payerImg={doc.payer_img}
                            payerId={doc.payerId}
                            partyImg={doc.thumbnail}
                            partyId={doc.partyId}
                            proofImg={doc.img_proof}/>
            })
        }
        <Grid item xs={12}>
            <h1>
                สถานะการชำระเงิน
            </h1>
        </Grid>
        {
            Allticket.memberTicket_.length === 0 ? <Grid item xs={12}><h1 style={{textAlign:'center'}}>คุณยังไม่ได้ขอเข้าร่วมปาตี้ใดๆ :(</h1></Grid> : Allticket.memberTicket_.map((doc,index) => {
                return <MemberTicket 
                            key={index}
                            hostId={doc.hostId}
                            status={doc.status}
                            message={doc.message}
                            partyImg={doc.thumbnail}
                            partyId={doc.partyId}/>
                            
            })
        }
        
        </Grid>
        
    )
}

export default connect(null)(MyParty)
