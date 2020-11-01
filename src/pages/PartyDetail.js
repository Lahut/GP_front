import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import classes from './styles/PartyDetail.module.css';
import Spinner from '../layouts/Spinner';
const PartyDetail = () => {
    const { partyId } = useParams();
    const [loading,Setloading] = useState(true)
    const [paymentDetail , SetpaymentDetail] = useState({
        bankDetail: {},
        date:'',
        time:''
    })
    const [partyDetail,setPartyDetail] = useState({})

    let dateInMillis,date_,time_;

    
    useEffect( () => {
        console.log(partyId)
        axios.get(`https://asia-southeast2-graduation-project-cs-32.cloudfunctions.net/api/getPartyById/${partyId}`)
        .then((doc) => {
            
            setPartyDetail(doc.data)
            dateInMillis = doc.data.createdAt._seconds * 1000
            date_  = new Date(dateInMillis).toDateString();
            time_ = new Date(dateInMillis).toLocaleTimeString();

            SetpaymentDetail({...paymentDetail,bankDetail : doc.data.paymentDetail,date : date_,time : time_})
            Setloading(false)
        })
        .catch((err) => {
            console.log(err)
        })
    },[])
    

    
    if(loading) return <Spinner />;
    
    return (
            
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <div className={classes.PartyDetail}>
                        <h1>รายละเอียดปาตี้</h1>
                        <img src={partyDetail.thumbnailUrl} alt="thumnail"/>
                        <div className={classes.textDetail}>
                           <h1>{partyDetail.name}</h1>
                           <hr style={{width:"80%",marginRight:"15rem"}}/>
                            <h2>{`จำนวนสมาชิก ${partyDetail.c_member}/${partyDetail.t_member}  `}<i class="fas fa-users"></i></h2>
                            <h2>{`หมวดหมู่ : ${partyDetail.category}`}</h2>
                            <h2>{`รายละเอียด : ${partyDetail.desc}`}</h2>
                            <h2 style={{display:'inline'}}>{`วันที่สร้าง : ${paymentDetail.date}   เวลา : ${paymentDetail.time}`}</h2>
                            <hr style={{width:"80%",marginRight:"15rem"}}/>
                            <h1>{`ผู้สร้างปาตี้`}</h1>
                            <div  className={classes.dot}>
                                <img src={partyDetail.host_img} />
                            </div>
                            <h2 style={{margin:'-4rem 0 1rem 7rem'}}>{`${paymentDetail.bankDetail.bankFname} ${paymentDetail.bankDetail.bankLname} ` }<i class="fas fa-crown"></i></h2>
                            <br/>
                            <h1>สมาชิก</h1>
                            <h2 style={{margin:' 0 1rem 1rem'}} >{partyDetail.members ? `ยังไม่มีสมาชิก` : `มีละ map members มาโชว์`}</h2>
                        </div>
                        <Button style={{fontSize:'2rem'}} variant="contained" color="primary">
                            เข้าร่วม
                        </Button>
                        
                    </div>
                </Grid>
            </Grid>
        
    )
}

export default PartyDetail
