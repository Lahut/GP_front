import React, { useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom';
import axios from 'axios';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import classes from './styles/PartyDetail.module.css';
import Spinner from '../layouts/Spinner';
import swal from 'sweetalert';
import { connect } from 'react-redux';
import { CreatePayment } from '../redux/actions/userActions';
const PartyDetail = ({CreatePayment}) => {
    const { partyId } = useParams();
    const [loading,Setloading] = useState(true)
    const [paymentDetail , SetpaymentDetail] = useState({
        bankDetail: {},
        date:'',
        time:'',
        hostId:'',
        price_: 0,
        thumbnail: ''
    })
    let history = useHistory();

    const [partyDetail,setPartyDetail] = useState({})

    let dateInMillis,date_,time_,registed=0;

    const updatePartyDetail = () => {
        axios.get(`https://asia-southeast2-graduation-project-cs-32.cloudfunctions.net/api/getPartyById/${partyId}`)
        .then((doc) => {
            setPartyDetail(doc.data)
            //console.log(doc.data)
            dateInMillis = doc.data.createdAt._seconds * 1000
            date_  = new Date(dateInMillis).toDateString();
            time_ = new Date(dateInMillis).toLocaleTimeString();

            SetpaymentDetail({...paymentDetail,bankDetail : doc.data.paymentDetail,date : date_,time : time_, hostId : doc.data.host , price_ : doc.data.price, thumbnail : doc.data.thumbnailUrl})
            Setloading(false)
        })
        .catch((err) => {
            console.log(err)
        })
    }
    
    useEffect( () => {
        updatePartyDetail();
    },[])


    const onClickEnter = async (e) => {

        e.preventDefault();
        //FormData_.append("partyId",partyId);
        
       await CreatePayment({partyId})
        updatePartyDetail();

    }
    

    
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
                            <h2>{`ราคา : ${partyDetail.price} บาท/คน`}</h2>
                            <h2 style={{display:'inline'}}>{`วันที่สร้าง : ${paymentDetail.date}   เวลา : ${paymentDetail.time}`}</h2>
                            <hr style={{width:"80%",marginRight:"15rem"}}/>
                            <h1>{`ผู้สร้างปาตี้`}</h1>
                            <div  className={classes.dot}>
                                <img src={partyDetail.host_img} />
                            </div>
                            <h2 style={{margin:'-4rem 0 1rem 7rem'}}>{`${paymentDetail.bankDetail.bankFname} ${paymentDetail.bankDetail.bankLname} ` }<i class="fas fa-crown"></i></h2>
                            <br/>
                            <h1>สมาชิก</h1>
                            {partyDetail.members.lenght === 0 ? <h2>ยังไม่มีสมาชิก</h2> : partyDetail.members.map((doc,index) => {
                                return <div key={index} className={classes.dotM}><img src={doc.payerImg} /></div>
                            })}
                        </div>

                        <Button 
                            style={{fontSize:'2rem'}} 
                            variant="contained" 
                            color="primary"
                            // onClick ={ ()=> history.push({
                            //     pathname : `/payment/party/${partyId}`,
                            //     state : { paymentDetail : paymentDetail}
                            // })} 
                            onClick = { (e) => onClickEnter(e)}
                            >
                            เข้าร่วม
                        </Button>
                        
                    </div>
                    
                </Grid>
            </Grid>
        
    )
}


export default connect(null,{CreatePayment})(PartyDetail)
