import React, { useState } from 'react'
import PropTypes from 'prop-types'

//MUI stuff
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';

//REDUX
import { addBank } from '../redux/actions/userActions';
import { connect } from 'react-redux';
const AddBank = ({addBank}) => {

    const [formData,setFormData] = useState({
        bankName:'',
        bankHolder:'',
        bankNum:'',
        photoBank:{}
    })

    const useStyles = makeStyles({
        form:{
            margin:"2rem auto",
            textAlign:"center"
        },
        select:{
            fontSize:"2rem",
            
        }
    })

    const handleImageChange = (e) => {
        const image = e.target.files[0];
        setFormData({...formData,photoBank: image});
    }

    const handleSelectedChange = (e) => {
        setFormData({...formData,bankName: e.target.value});
    }

    const handleTextChange = (e) => {
        setFormData({...formData,[e.target.name]: e.target.value});
    }

    const handleSubmit = (e) => {

        e.preventDefault();
        const DataForm = new FormData();
        DataForm.append('file',formData.photoBank,formData.photoBank.name);
        DataForm.append('bankName',formData.bankName);
        DataForm.append('bankNum',formData.bankNum);
        DataForm.append('nameHolder',formData.bankHolder);
        DataForm.append('','');
        addBank({DataForm})
    }




    const classes = useStyles();
    return (
        <Grid container spacing={3}>
            <Grid item xs={3}/>
            <Grid className={classes.form} item xs={6}>
                <h1 style={{fontSize:'4rem'}}>เพิ่มบัญชีธนาคาร</h1>
                <div>
                    <form onSubmit={(e) => handleSubmit(e)}>
                    <h2 style={{display:'inline',paddingRight:'2rem'}}>ธนาคาร</h2>
                    <Select
                        labelId="demo-simple-select-filled-label"
                        id="demo-simple-select-filled"
                        style={{width:'20rem'}}
                        InputProps={{
                            classes:{
                                input : classes.select
                            }
                        }}
                        onChange={ (e) => handleSelectedChange(e)}
                        value={formData.bankName}
                        >
                       
                        <MenuItem style={{fontSize: "2rem"}} value={'กสิกรไทย'}>กสิกรไทย</MenuItem>
                        <MenuItem style={{fontSize: "2rem"}} value={'กรุงไทย'}>กรุงไทย</MenuItem>
                        <MenuItem style={{fontSize: "2rem"}} value={'ทหารไทย'}>ทหารไทย</MenuItem>
                        <MenuItem style={{fontSize: "2rem"}} value={'ไทยพาณิชย์'}>ไทยพาณิชย์</MenuItem>
                        <MenuItem style={{fontSize: "2rem"}} value={'ซีไอเอ็มบี ไทย'}>ซีไอเอ็มบี ไทย</MenuItem>
                        <MenuItem style={{fontSize: "2rem"}} value={'กรุงศรีอยุธยา'}>กรุงศรีอยุธยา</MenuItem>
                    </Select>
                    <br/>
                    <br/>
                    <br/>
                    <h2 style={{paddingRight:'2rem',display:'inline'}}>ชื่อบัญชี</h2>
                    <TextField
                        className={classes.margin}
                        id="input-with-icon-textfield"
                        InputProps={{
                        classes:{
                            input : classes.select
                        }
                        }}
                        name="bankHolder"
                        onChange={(e) => handleTextChange(e)}
                        value={formData.bankHolder}
                        
                    />
                    <br/>
                    <br/>
                    <br/>
                    <h2 style={{paddingRight:'2rem',display:'inline'}}>เลขบัญชี</h2>
                    <TextField
                        className={classes.margin}
                        id="input-with-icon-textfield"
                        InputProps={{
                        classes:{
                            input : classes.select
                        }
                        }}
                        name="bankNum"
                        onChange={(e) => handleTextChange(e)}
                        value={formData.bankNum}

                    />
                    <br/>
                    <br/>
                    <br/>
                    <h2>สำเนาหน้าแรกสมุดบัญชี</h2>
                    <input type="file" 
                    onChange={ (e) => handleImageChange(e)}
                    style={{marginLeft:'8rem'}}
                    />
                    <br/>
                    <br/>
                    <br/>
                    <Button type='submit' style={{margin:'auto',fontSize:'1.5rem'}} variant="contained" color="primary">
                        Submit
                    </Button>
                    </form>
                </div>
            </Grid>
            <Grid item xs={3}/>
        </Grid>
    )
}

AddBank.propTypes = {
    addBank : PropTypes.func.isRequired
}

export default connect(null,{addBank})(AddBank)
