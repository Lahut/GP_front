import React,{ useState } from 'react'
import classes from '../pages/styles/PaymentTicket.module.css'
import { useHistory } from 'react-router-dom';
//MUI
import axios from 'axios';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { Info } from '@material-ui/icons';
import Backdrop from '@material-ui/core/Backdrop';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import swal from 'sweetalert';

const PaymentTicket = ({fname,lname,payerImg,
                        payerId,partyImg,partyId,
                        proofImg,onShow,hostImg_,
                        status,paymentId},props) => {

    let history = useHistory();

    const [open,Setopen] = useState(false)
    const [DataForm,SetDataForm] = useState({
        message:'',
        tel:'',
        line_id:'',
        loading: true
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

      const classesM = useStyles();
      const text = 'รอชำระเงิน';
      if(status === 'waiting'){
          return  <Grid   item xs={12} sm={6}>
          <Backdrop className={classesM.backdrop} open={open} >
              <h1>ส่งรายละเอียด</h1>
          </Backdrop>
          <div className={classes.card}>
              <div className={classes.cardImage}>
                  <img style={{cursor:'pointer'}} src={partyImg} onClick={() => history.push(`/showParty/party/${partyId}`)} />
              </div>
              <div style={{width:'200px',height:'10px'}}>
                  <h1 style={{position:'relative',left:'23rem',bottom:'25rem'}}>สมาชิก</h1>
                  <h2 style={{position:'relative',left:'33rem',bottom:'25rem'}}>{`${fname} ${lname}`}</h2>
                  <h2 style={{position:'relative',left:'35rem',bottom:'25.5rem',fontSize:'2rem',color:'blueviolet'}}>รอชำระเงิน</h2>
              </div>
              <div className={classes.dot} >
                  <img src={payerImg}/>
              </div>
          </div>
      </Grid>
      }

      if(status === 'accept'){
        return  <Grid   item xs={12} sm={6}>
        <Backdrop className={classesM.backdrop} open={open} >
            <h1>ส่งรายละเอียด</h1>
        </Backdrop>
        <div className={classes.card}>
            <div className={classes.cardImage}>
                <img style={{cursor:'pointer'}} src={partyImg} onClick={() => history.push(`/showParty/party/${partyId}`)} />
            </div>
            <div style={{width:'200px',height:'10px'}}>
                <h1 style={{position:'relative',left:'23rem',bottom:'25rem'}}>สมาชิก</h1>
                <h2 style={{position:'relative',left:'33rem',bottom:'25rem'}}>{`${fname} ${lname}`}</h2>
                <h2 style={{position:'relative',left:'32.5rem',bottom:'23rem',fontSize:'2rem',color:'green'}}>ส่งข้อมูลเรียบร้อย</h2>
            </div>
            <div className={classes.dot} >
                <img src={payerImg}/>
            </div>
        </div>
    </Grid>
      }

      const handleChange = (e) => {
          SetDataForm({...DataForm, [e.target.name] : e.target.value})
      }

      const handleToSendMessage = (e) => {

        e.preventDefault();
        
        const DataForm_ = new FormData();
                 DataForm_.append("message",DataForm.message);
                 DataForm_.append("tel",DataForm.tel);
                 DataForm_.append("line_id",DataForm.line_id);
                 DataForm_.append("","");
        swal({
            title: "ยืนยันในการส่งรายละเอียดใช่หรือไม่",
            text: "กรุณาตรวจสอบข้อมูลให้ถูกต้องก่อนส่ง เมื่อส่งไปแล้วจะไม่สามารถแก้ไขได้",
            icon: "warning",
            buttons: true,
            dangerMode: true,
          })
          .then((willSend) => {
            if (willSend) {
              swal("ส่งรายละเอียดให้สมาชิกเรียบร้อย", {
                icon: "success",
                
              }).then(() => {
                  
                
                  axios.post(`http://localhost:5000/graduation-project-cs-32/asia-southeast2/api/sendMessageToMember/${paymentId}`,DataForm_,{
                      headers: {
                        'Content-Type': 'multipart/form-data'
                      }
                  })
                  .then(() => 
                      //props.newFetch()
                      window.location.reload()
                  ).catch((err) => {
                      console.log(err)
                  })
              });
            }
          });
      }

      const handleToReject = (e) => {
        e.preventDefault();
        swal({
            title: "ยืนยันที่จะปฏิเสธคำขอหรือไม่",
            text: "หากปฏิเสธแล้วจะไม่สามารถย้อนกลับไปแก้ไข้ได้",
            icon: "warning",
            buttons: true,
            dangerMode: true,
          })
          .then((willDelete) => {
            if (willDelete) {
                axios.post(`http://localhost:5000/graduation-project-cs-32/asia-southeast2/api/deletePayment/${paymentId}`)
                .then(() => {
                    console.log('เย้')
                })
            } else {
                //updatePartyDetail();
            }
          });
    }

      //onClick={ () => Setopen(!open)}
    return (
        <Grid   item xs={12} sm={6}>
            <Backdrop className={classesM.backdrop}  open={open} >
                <form onSubmit = { (e) => handleToSendMessage(e)}>
                  <div  style={{textAlign:'center',width:'50rem',marginBottom:'10rem'}}>
                    <h1 onClick={ () => Setopen(!open)} style={{color:'red',cursor:'pointer'}}>X</h1> 
                    <h1>ส่งรายละเอียด</h1>
                    <textarea name="message" onChange={ (e) => handleChange(e)} value={DataForm.message} className={classesM.message}  type="text"></textarea>  
                    <h2 style={{textAlign:'left'}}>เบอร์ติดต่อ</h2>
                    <input name="tel" onChange={ (e) => handleChange(e)} value={DataForm.tel} className={classesM.Contact} type="text"></input>
                    <h2 style={{textAlign:'left'}}>Line ID</h2>
                    <input name="line_id" onChange={ (e) => handleChange(e)} value={DataForm.line_id} className={classesM.Contact} type="text"></input>
                  </div>
                  <Button type="submit" onClick={ (e) => handleToSendMessage(e)} style={{fontSize:'2rem',marginLeft:'20rem',position:"relative",bottom:'5rem'}} variant="contained" color='primary'>ยืนยัน</Button> 
                </form>

            </Backdrop>
            <div className={classes.card}>
                <div className={classes.cardImage}>
                    <img style={{cursor:'pointer'}} src={partyImg} onClick={() => history.push(`/showParty/party/${partyId}`)} />
                </div>
                <div style={{width:'200px',height:'10px'}}>
                    <h1 style={{position:'relative',left:'23rem',bottom:'25rem'}}>สมาชิก</h1>
                    <h2 style={{position:'relative',left:'33rem',bottom:'25rem'}}>{`${fname} ${lname}`}</h2>
                    <a style={{position:'relative',left:'30rem',bottom:'22rem',fontSize:'2rem'}} href={proofImg}>หลักฐานการชำระเงิน</a>
                </div>
                <div className={classes.dot} >
                    <img src={payerImg}/>
                </div>
                <div className={classes.btnGroup}>
                    <Button  onClick={() => Setopen(!open)} style={{margin: '5px',fontSize:'1.5rem'}} variant="outlined" color="primary">
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
