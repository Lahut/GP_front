import React,{ useState , useEffect} from 'react'
import classes from '../pages/styles/MemberTicket.module.css'
import { useHistory  } from 'react-router-dom';
import { DecryptMessage } from '../redux/actions/userActions';
import { connect } from 'react-redux';
import axios from 'axios';
//MUI
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Backdrop from '@material-ui/core/Backdrop';
import { makeStyles } from '@material-ui/core/styles';

const MemberTicket = ({hostId,status,
                       partyId,partyImg,hostImg,
                       payment,timeLeft,price,
                       paymentId,message,DecryptMessage,
                       lineId,tel}) => {

    
    let history = useHistory();
    let color = "";
    const [open,Setopen] = useState(false)
    const [text,SetText] = useState("");


    useEffect(() => {
        if(message){
            
           const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
            const {iv,content}  = message;
            
            const body = JSON.stringify({iv,content});
            axios.post('http://localhost:5000/graduation-project-cs-32/asia-southeast2/api/decrptMessage',body,{
                headers : {
                    'Content-Type': 'application/json'
                }
            })
            .then((doc) => {
                
                SetText(doc.data.message)
            }).catch((err) => {
                console.log(err);
            }) 
        }
    })

    const useStyles = makeStyles((theme) => ({
        backdrop: {
          zIndex: theme.zIndex.drawer +1,
          color: '#fff'
        },
        message:{
            width: '100%',
            height: '50rem',
            padding: '12px 20px',
            display :'inline-block',
            boxSizing:'border-box',
            fontFamily: [
                'Kumbh Sans',
                'Prompt'].join(','),
            fontSize: '2rem',
            borderRadius:'2rem'
        },
        Contact :{
            width: '100%',
            padding: '12px 20px',
            display :'inline-block',
            boxSizing:'border-box',
            fontFamily: [
                'Kumbh Sans',
                'Prompt'].join(','),
            fontSize: '2rem',
            borderRadius:'2rem'

        }
    }));

    if(status === 'waiting' || status === 'pending') color = "#ECFF00"
    if(status === 'accept') color = "#0AD306"
    if(status === 'reject') color  = "#EA1702"

    const classesM = useStyles();

    const deletePaymentThenReAssign = () => {
        axios.delete(`http://localhost:5000/graduation-project-cs-32/asia-southeast2/api//justdelPayment/${paymentId}`)
        .then(() => {
            history.push(`/showParty/party/${partyId}`)
        }).catch((err) =>{
            console.log(err)
        })
    }

    


    return (
        <Grid   item xs={12} sm={6}>
            <Backdrop className={classesM.backdrop}  open={open} >
            <div  style={{textAlign:'center',width:'50rem',marginBottom:'10rem'}}>
                    <h1  onClick={ () => Setopen(!open)} style={{color:'red',cursor:'pointer'}}>X</h1> 
                    <h1>รายละเอียด</h1>
                    <textarea disabled={true} style={{backgroundColor:'white'}} className={classesM.message} value={text} type="text"></textarea>  
                    <h2 style={{textAlign:'left'}}>เบอร์ติดต่อ</h2>
                    <input disabled={true} style={{backgroundColor:'white'}} value={tel} className={classesM.Contact} type="text"></input>
                    <h2 style={{textAlign:'left'}}>Line ID</h2>
                    <input disabled={true} style={{backgroundColor:'white'}} className={classesM.Contact} type="text" value={lineId}></input>
                  </div>
            </Backdrop>
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
                <div className={classes.dot}  >
                    <img  src={hostImg} />
                </div>
                {
                        status === 'accept' ? <Button variant="contained" color='primary' 
                                                     onClick={ () => Setopen(!open)}
                                                     style={{fontSize:'2rem',position:'relative',left:'32rem',bottom:'22rem'}}>ตรวจสอบ</Button> : null
                }
                 {
                        status === 'reject' ? <Button variant="contained" color='primary' 
                                                     onClick={ () => deletePaymentThenReAssign()}
                                                     style={{fontSize:'2rem',position:'relative',left:'30rem',bottom:'22rem'}}>เข้าร่วมปาตี้อีกครั้ง</Button> : null
                }
            </div>
        </Grid>
    )
}

export default connect(null,DecryptMessage)(MemberTicket)
