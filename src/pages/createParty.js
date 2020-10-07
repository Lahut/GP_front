import React, { useEffect, useState } from 'react'

//MUI
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { Label } from '@material-ui/icons';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import Button from '@material-ui/core/Button';

//Redux
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { loadBank } from '../redux/actions/bankingActions';
import bankingReducer from '../redux/reducers/bankingReducer';



const  CreateParty = ({bank,loadBank}) => {


    useEffect( () =>{
            loadBank()
        },[])

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

    const [formData,SetformData] = useState({
        name: '',
        t_member:0,
        category:'',
        price:0,
        bankDetail:'',
        desc:'',
        thumbnail:{}
    })

    const handleTextChange  = (e) => {
        SetformData({...formData,[e.target.name]: e.target.value});
        console.log(e.target.value)
    }

    const handleImageChange = (e) => {
        const image = e.target.files[0];
        SetformData({...formData,[e.target.name]: image});
        console.log(e.target.value)
    }

    const handleSubmit = (e) => {

        e.preventDefault();

        console.log(formData)
        const DataForm = new FormData();
        //append field here
        DataForm.append('','');

        


    }

    

    const classes = useStyles();

    return (
            <Grid className={classes.form} item xs={6}>
                    <form onSubmit={(e) => handleSubmit(e)} >
                        <TextField 
                            fullWidth= {true}
                            required id="standard-required" 
                            label="ชื่อปาตี้"
                            name="name"
                            onChange = { (e) => handleTextChange(e)}
                            value={formData.name}
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
                                name="t_member"
                                required id="standard-required"
                                onChange={ (e) => handleTextChange(e)}
                                value={ formData.t_number }
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
                            <h2 style={{fontSize:'1.5rem',display:'inline-block',paddingRight:'1rem'}}>ประเภท</h2>
                            <Select
                                labelId="demo-simple-select-filled-label"
                                id="demo-simple-select-filled"
                                style={{width:'20rem'}}
                                name="category"
                                required id="standard-required" 
                                InputProps={{
                                    classes:{
                                        input : classes.select
                                    }
                                }}
                                onChange={ (e) => handleTextChange(e)}
                                value={formData.category}
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
                            label="ราคา/คน (บาท)"
                            name="price"
                            onChange={ (e) => handleTextChange(e)}
                            value={formData.price}
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
                        <h2 style={{fontSize:'1.5rem',display:'inline-block',paddingRight:'1rem'}}>ช่องทางการรับเงิน</h2>
                        <br/>
                        <p style={{fontSize:'1.5rem',display:'inline-block',paddingRight:'1rem',marginLeft:'3rem'}}>ธนาคาร</p>
                        <Select
                                labelId="demo-simple-select-filled-label"
                                id="demo-simple-select-filled"
                                style={{width:'20rem'}}
                                name="bankDetail"
                                onChange={ (e) => handleTextChange(e)}
                                value={formData.bankDetail}
                                InputProps={{
                                    classes:{
                                        input : classes.select
                                    }
                                }}
                                >             
                                {
                                    bank.map((ebank) => {
                                        return <MenuItem style={{fontSize: "2rem"}} value={`${ebank.bankNum} ${ebank.bankName} ${ebank.nameHolder}`}>{`${ebank.bankNum} ${ebank.bankName} ${ebank.nameHolder}`}</MenuItem>
                                    })
                                }
                        </Select>
                        <br/>
                        <h2 style={{fontSize:'1.5rem',display:'inline-block',paddingRight:'1rem'}}>รายละเอียด</h2>
                        <br/>
                        <TextField
                            placeholder="MultiLine with rows: 2 and rowsMax: 4"
                            multiline
                            rows={2}
                            rowsMax={4}
                            fullWidth={true}
                            name="desc"
                            onChange={ (e) => handleTextChange(e)}
                            value={formData.desc}
                            
                            
                        />
                        <br/>
                        <br/>
                        <h2 style={{fontSize:'1.5rem',display:'inline-block',paddingRight:'1rem'}}>เพิ่มรูปหน้าปกปาตี้</h2>
                        <input type="file" 
                            name="thumbnail"
                             onChange={ (e) => handleImageChange(e)}
                             style={{marginLeft:'8rem'}}
                             />
                        <Button type="submit" style={{fontSize:'2rem',margin:'3rem 23rem'}} variant="contained" color="primary">
                             สร้างปาตี้
                        </Button>
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
