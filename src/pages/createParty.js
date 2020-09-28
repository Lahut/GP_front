import React, { useEffect } from 'react'

//MUI
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { Label } from '@material-ui/icons';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';

//Redux
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { loadBank } from '../redux/actions/bankingActions';
import bankingReducer from '../redux/reducers/bankingReducer';



const  CreateParty = ({bank,loadBank}) => {


    const useStyles = makeStyles({
        form:{
            textAlign:"left",
            margin:"10rem auto",
            
            fontSize:"2rem"
        },
        TextField:{
            fontSize:"2rem",
            maxWidth:"1000rem"
        },
        fontAh:{
            fontSize: '1.4rem'
        }
    });

    useEffect( () =>{
        loadBank()
    },[])

    const classes = useStyles();
    return (
            <Grid className={classes.form} item xs={6}>
                    <form >
                        <TextField 
                            fullWidth= {true}
                            required id="standard-required" 
                            label="ชื่อปาตี้"
                            InputProps={{
                                classes:{
                                    input : classes.TextField
                                }
                            }}
                            InputLabelProps={{
                                style: {fontSize: "1.5rem"}
                            
                            }} />
                            <br/>
                            <br/>
                            <TextField 
                                id="standard-basic" 
                                label="จำนวนสมาชิก"
                                InputProps={{
                                    classes:{
                                        input : classes.TextField
                                    },
                                    inputProps: { min: 1 }
                                    
                                }}
                                InputLabelProps={{
                                    style: {fontSize: "1.5rem"}
                                
                                }}
                                type="number"   
                            />
                            <br/>
                            <br/>
                            <p style={{fontSize:'1.5rem',display:'inline-block',paddingRight:'1rem'}}>ประเภท</p>
                            <Select
                                labelId="demo-simple-select-filled-label"
                                id="demo-simple-select-filled"
                                style={{width:'20rem'}}
                                InputProps={{
                                    classes:{
                                        input : classes.select
                                    }
                                }}
                                //onChange={ (e) => handleSelectedChange(e)}
                                //value={formData.bankName}
                                >             
                                <MenuItem style={{fontSize: "2rem"}} value={'cloth'}>เสื้อผ้า</MenuItem>
                                <MenuItem style={{fontSize: "2rem"}} value={'food'}>อาหาร</MenuItem>
                                <MenuItem style={{fontSize: "2rem"}} value={'travel'}>ท่องเที่ยว</MenuItem>
                                <MenuItem style={{fontSize: "2rem"}} value={'platforms/software'}>แพลตฟอร์ม หรือ ซอฟแวร์</MenuItem>
                                <MenuItem style={{fontSize: "2rem"}} value={'education'}>คอร์สเรียน</MenuItem>
                                <MenuItem style={{fontSize: "2rem"}} value={'general'}>ของใช้ทั่วไป</MenuItem>
                                <MenuItem style={{fontSize: "2rem"}} value={'etc'}>อื่นๆ</MenuItem>
                        </Select>
                        <br/>
                        <br/>

                        <TextField 
                            fullWidth= {true}
                            required id="standard-required" 
                            label="ราคา/คน"
                            InputProps={{
                                classes:{
                                    input : classes.TextField
                                }
                            }}
                            InputLabelProps={{
                                style: {fontSize: "1.5rem"}
                            }}
                            type="number"   
                        />
                        <br/>
                        <br/>
                        <p style={{fontSize:'1.5rem',display:'inline-block',paddingRight:'1rem'}}>ช่องทางการรับเงิน</p>
                        <br/>
                        <p style={{fontSize:'1.5rem',display:'inline-block',paddingRight:'1rem',marginLeft:'3rem'}}>ธนาคาร</p>
                        <Select
                                labelId="demo-simple-select-filled-label"
                                id="demo-simple-select-filled"
                                style={{width:'20rem'}}
                                InputProps={{
                                    classes:{
                                        input : classes.select
                                    }
                                }}
                                //onChange={ (e) => handleSelectedChange(e)}
                                //value={formData.bankName}
                                >             
                                {
                                    bank.map((ebank) => {
                                        return <MenuItem style={{fontSize: "2rem"}} value={`${ebank.bankNum} ${ebank.bankName}`}>{`${ebank.bankNum} ${ebank.bankName} | ${ebank.nameHolder}`}</MenuItem>
                                    })
                                /* <MenuItem style={{fontSize: "2rem"}} value={'cloth'}>เสื้อผ้า</MenuItem>
                                <MenuItem style={{fontSize: "2rem"}} value={'food'}>อาหาร</MenuItem>
                                <MenuItem style={{fontSize: "2rem"}} value={'travel'}>ท่องเที่ยว</MenuItem>
                                <MenuItem style={{fontSize: "2rem"}} value={'platforms/software'}>แพลตฟอร์ม หรือ ซอฟแวร์</MenuItem>
                                <MenuItem style={{fontSize: "2rem"}} value={'education'}>คอร์สเรียน</MenuItem>
                                <MenuItem style={{fontSize: "2rem"}} value={'general'}>ของใช้ทั่วไป</MenuItem>
                                <MenuItem style={{fontSize: "2rem"}} value={'etc'}>อื่นๆ</MenuItem> */}
                        </Select>
                        <br/>
                        <p style={{fontSize:'1.5rem',display:'inline-block',paddingRight:'1rem'}}>รายละเอียด</p>
                        <br/>
                        {/* <TextField
                            id="outlined-multiline-static"
                            
                            multiline
                            rows={4}
                            variant="outlined"
                            style={{marginLeft:'3rem',maxWidth:'57rem',padding:'1rem'}}
                            InputProps={{
                                classes:{
                                    input : classes.fontAh
                                }
                                
                            }}
                            
                            fullWidth={true}
                        /> */}
                        <TextField
                            placeholder="MultiLine with rows: 2 and rowsMax: 4"
                            multiline
                            rows={2}
                            rowsMax={4}
                            fullWidth={true}
                         
                            
                        />


                        


                        
                        
                        
                        

                        

                    </form>
            </Grid>
    )

}

CreateParty.propTypes = {
    bank : PropTypes.array.isRequired,
    loadBank : PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
    bank : state.bank.Allbank
})

export default connect(mapStateToProps,{loadBank})(CreateParty)
