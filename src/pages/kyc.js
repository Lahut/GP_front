import React from 'react'


//MUI
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import DateFnsUtils from '@date-io/date-fns';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import {
    MuiPickersUtilsProvider,
    KeyboardTimePicker,
    KeyboardDatePicker,
  } from '@material-ui/pickers';



const useStyles = makeStyles({
    form:{
        textAlign:"center",
        margin:"10rem auto"
    },
    TextField:{
        fontSize:"2rem"
    },input2: {
        height: 200,
        fontSize: "3em"
    },Contact :{
        fontFamily: [
            'Kumbh Sans',
            'Prompt'].join(','),
        fontSize: '2rem'
    }
});

export default function Kyc() {

    const classes = useStyles();
    return (
        
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <h1 style={{textAlign:'center',fontSize:'4rem'}}>ยืนยันตัวตน</h1>
                </Grid>
                <Grid item xs={6}>
                    <TextField
                    id="outlined-full-width"
                    label="ชื่อจริง"
                    style={{ margin: 8 }}

                    fullWidth
                    placeholder="ชื่อจริง"
                    margin="normal"
                    InputLabelProps={{
                        shrink: true,
                        style:{fontSize:'2rem',color:'black',fontWeight:'bold'}
                    }}
                    InputProps={{
                        style:{fontSize:'2rem'}
                    }}
                    variant="outlined"
                    />
                    <TextField
                    id="outlined-full-width"
                    label="ชื่อจริง (ภาษาอังกฤษ)"
                    style={{ margin: 8 }}

                    fullWidth
                    placeholder="ชื่อจริง (ภาษาอังกฤษ)"
                    margin="normal"
                    InputLabelProps={{
                        shrink: true,
                        style:{fontSize:'2rem',color:'black',fontWeight:'bold'}
                    }}
                    InputProps={{
                        style:{fontSize:'2rem'}
                    }}
                    variant="outlined"
                    />
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        
                            <KeyboardDatePicker
                                style={{marginLeft:'1rem'}}
                                disableToolbar
                                variant="inline"
                                format="MM/dd/yyyy"
                                margin="normal"
                                id="date-picker-inline"
                                label="วันเกิด"
                                InputLabelProps={{
                                    style:{fontSize:'2rem',color:'black',fontWeight:'bold'}
                                }}
                                InputProps={{
                                    style: { fontSize : '2rem'}
                                }}
                                //value={selectedDate}
                                //onChange={handleDateChange}
                                KeyboardButtonProps={{
                                    'aria-label': 'change date',
                                }}
                                />
                                
                    </MuiPickersUtilsProvider>
                    <br/>
                    <br/>
                    <TextField
                    id="outlined-full-width"
                    label="เลขบัตรประชาชน (13หลัก)"
                    style={{ margin: 8}}

                    fullWidth
                    placeholder="เลขบัตรประชาชน (13หลัก)"
                    margin="normal"
                    InputLabelProps={{
                        shrink: true,
                        style:{fontSize:'2rem',color:'black',fontWeight:'bold'}
                    }}
                    InputProps={{
                        style:{fontSize:'2rem'}
                    }}
                    variant="outlined"
                    />
                
                    
                </Grid>
                
                <Grid item xs={6}>
                <TextField
                    id="outlined-full-width"
                    label="นามสกุล"
                    style={{ margin: 8 }}

                    fullWidth
                    placeholder="นามสกุล"
                    margin="normal"
                    InputLabelProps={{
                        shrink: true,
                        style:{fontSize:'2rem',color:'black',fontWeight:'bold'}
                    }}
                    InputProps={{
                        style:{fontSize:'2rem'}
                    }}
                    variant="outlined"
                    />
                    <TextField
                    id="outlined-full-width"
                    label="นามสกุล (ภาษาอังกฤษ)"
                    style={{ margin: 8 }}

                    fullWidth
                    placeholder="นามสกุล (ภาษาอังกฤษ)"
                    margin="normal"
                    InputLabelProps={{
                        shrink: true,
                        style:{fontSize:'2rem',color:'black',fontWeight:'bold'}
                    }}
                    InputProps={{
                        style:{fontSize:'2rem'}
                    }}
                    variant="outlined"
                    />
                    <p style={{fontSize:'2rem',display:'inline',position:'relative',right:'22rem'}}>เพศ</p>
                    <Select
                        labelId="demo-simple-select-outlined-label"
                        id="demo-simple-select-outlined"
                        //value={age}
                        //onChange={handleChange}
                        label="เพศ"
                        style={{fontSize:'2rem',width:'10rem',marginTop:'3rem',position:'relative',right:'20rem'}}
                        
                        
                        >
                       
                        <MenuItem style={{fontSize: "2rem"}} value={'M'}>ชาย</MenuItem>
                        <MenuItem style={{fontSize: "2rem"}} value={'F'}>หญิง</MenuItem>
                        
                    </Select>
                </Grid>
                <Grid item xs={12}>
                        <p style={{fontSize:'2rem',marginLeft:'1rem'}}>ที่อยู่ปัจจุบัน</p>
                        <textarea className={classes.Contact} placeholder="บ้านเลขที่/ถนน/ซอย/เขต/แขวง/จังหวัด" style={{width:"100%",height:"10rem",borderRadius:'1rem',marginLeft:'1rem',fontSize:'2rem'}}></textarea>
                </Grid>
                
                
                
                
            </Grid>
        
    )
}

//export default kyc
