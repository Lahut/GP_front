import React, { useEffect, useState } from 'react'
import classes from '../pages/styles/Profile.module.css';
import { useHistory, useParams } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import DateFnsUtils from '@date-io/date-fns';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import axios from 'axios';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const Profile = ({user_}) => {
    const { userId } = useParams();
    const [userObject,SetUserObject] = useState({});
    
    let status = '';
    let color_ = '';
    useEffect(() => {
        
        if(userId){
            axios.get(`http://localhost:5000/graduation-project-cs-32/asia-southeast2/api/getProfileById/${userId}`)
            .then((doc) => {
                SetUserObject(doc.data.profile)
            }).catch((err) => {
                console.log(err)
            })
        }else{
            console.log(user_)
            if(user_) SetUserObject(user_)
            
        }
    })

    if(userObject){
        //console.log(userObject.status)
        if(userObject.kycStatus === 'none'){
            status = 'ยังไม่ได้ยืนยันตัวตน'
            color_ = '#000000'
        }
        if(userObject.kycStatus === 'waiting'){
            status = 'รออนุมัติ'
            color_ = '#fcdb03'
        }
        if(userObject.kycStatus === 'reject'){
            status = 'การยืนยันตัวตนไม่สำเร็จ'
            color_= '#d92b09'
        }
        if(userObject.kycStatus === 'approve'){
            status = 'ยืนยันตัวตนแล้ว'
            color_= '#37bd02'
        }
    }
    
    
    return (
        <Grid container spacing={3}>
            <Grid style={{textAlign:'center'}} item xs={12}>
               <div className={classes.dot}>
                   <img src={userObject.avartar}/>
               </div> 
               <h1><i class="fas fa-user-alt"></i> Profile detail </h1>
               <TextField
                    id="outlined-full-width"
                    label="ชื่อจริง"
                    style={{ margin: 8 ,width:'50%'}}
                    disabled={true}
                    value={userObject.fname}
                    
                    placeholder="ชื่อจริง"
                    margin="normal"
                    InputLabelProps={{
                        shrink: true,
                        style:{fontSize:'2rem',fontWeight:'900',color:'black'}
                    }}
                    InputProps={{
                        style:{fontSize:'2rem',fontWeight:'900'}
                    }}
                    variant="outlined"
                    />
                <TextField
                    id="outlined-full-width"
                    label="นามสกุล"
                    style={{ margin: 8 ,width:'50%'}}
                    disabled={true}
                    value={userObject.lname}
                    
                    placeholder="นามสกุล"
                    margin="normal"
                    InputLabelProps={{
                        shrink: true,
                        style:{fontSize:'2rem',fontWeight:'900',color:'black'}
                    }}
                    InputProps={{
                        style:{fontSize:'2rem',fontWeight:'900'}
                    }}
                    variant="outlined"
                    />
                 
                <TextField
                    id="outlined-full-width"
                    label="Email"
                    style={{ margin: 8 ,width:'50%'}}
                    disabled={true}
                    value={userObject.email}
                    
                    placeholder="นามสกุล"
                    margin="normal"
                    InputLabelProps={{
                        shrink: true,
                        style:{fontSize:'2rem',fontWeight:'900',color:'black'}
                    }}
                    InputProps={{
                        style:{fontSize:'2rem',fontWeight:'900'}
                    }}
                    variant="outlined"
                    />

                <TextField
                    id="outlined-full-width"
                    label="ยืนยันตัวตน"
                    style={{ margin: 8 ,width:'50%'}}
                    disabled={true}
                    value={status}
                    
                    margin="normal"
                    InputLabelProps={{
                        shrink: true,
                        style:{fontSize:'2rem',fontWeight:'900',color: 'black'}
                    }}
                    InputProps={{
                        style:{fontSize:'2rem',fontWeight:'900',color : `${color_}`}
                    }}
                    variant="outlined"
                    />
                <h1>Soical Media</h1>
                <TextField
                    id="outlined-full-width"
                    placeholder="@Facebook"
                    label="Facebook"
                    style={{ margin: 8 ,width:'50%'}}
                    disabled={true}
                    value={userObject.facebook}
                    
                    margin="normal"
                    InputLabelProps={{
                        shrink: true,
                        style:{fontSize:'2rem',fontWeight:'900',color: 'black'}
                    }}
                    InputProps={{
                        style:{fontSize:'2rem',fontWeight:'900',color : 'black'}
                    }}
                    variant="outlined"
                    />

                
                
                <TextField
                    id="outlined-full-width"
                    placeholder="@LineID"
                    label="Line ID"
                    style={{ margin: 8 ,width:'50%'}}
                    disabled={true}
                    value={userObject.line}
                    margin="normal"
                    InputLabelProps={{
                        shrink: true,
                        style:{fontSize:'2rem',fontWeight:'900',color: 'black'}
                    }}
                    InputProps={{
                        style:{fontSize:'2rem',fontWeight:'900',color : 'black'}
                    }}
                    variant="outlined"
                    />
                {/* <i style={{position:'relative',right:'58rem',top:'2rem'}} class="fab fa-4x fa-line"></i> */}
                
            </Grid>
            
            
        </Grid>
    )
}

Profile.propTypes ={
    user_ : PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    user_ : state.auth.user
})

export default connect(mapStateToProps)(Profile)
