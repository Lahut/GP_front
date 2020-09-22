import React, { useState } from 'react'
import { Link, Redirect, useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
// MUI Stuff
import axios from 'axios';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';


//Rrdux
import { connect } from 'react-redux';
import { setAlert } from '../redux/actions/alertActions';
import { signUp } from '../redux/actions/authActions';
const Signup = ({ setAlert, signUp }) => {

    const [userData,setUserData ] = useState({
        email: '',
        fname: '',
        lname: '',
        password: '',
        password2: ''
    })
    const history = useHistory();

    const onChangeValue = (e) => {
        setUserData({...userData, [e.target.name] : e.target.value});
    }
    
    const useStyles = makeStyles({
        TextField: {
            fontSize: "2rem"
        },
        form: {
            textAlign : 'center',
            margin: '12rem auto'
        },
        button: {
            margin: "2rem auto",
            fontSize: "1.5rem",
            display: 'inline-block'
        },
        small: {
            fontSize: "1.2rem"
        }
    })

    const handleSubmit = (e) => {
        e.preventDefault();

       

        const newUser = {
            fname: userData.fname,
            lname: userData.lname,
            email : userData.email,
            password: userData.password,
            password2: userData.password2
        }
        console.log(newUser);
        if( newUser.password !== newUser.password2) {
            setAlert('Password do not match','error')
        }
        const {fname,lname,email,password,password2} = newUser
        
        signUp({fname,lname,email,password,password2});


        // axios.post('https://asia-southeast2-graduation-project-cs-32.cloudfunctions.net/api/signup', newUser )
        // .then( (res) => {
        //     console.log(res.data);
        //     localStorage.setItem('FBIdToken',`Bearer ${res.data.token_}`)
        //     setUserData({ ...userData,loading: false})
        //     history.push("/login");
            
        // }).catch((err) => {
        //     //console.log(err.response.data)
        //     setUserData({...userData,
        //         errors : err.response.data,
        //         loading : false
        //     })

        //     console.log(userData)
            
        // })


        

        //console.log("Submit!")
    }

    const classes = useStyles();
    return (
        <Grid container xs={12} className={classes.form}>
        <Grid item sm={3} />
        <Grid item xs={6} >
            <form onSubmit={e => handleSubmit(e)}>
            <TextField 
                id="fname"
                name="fname"
                label="First name"
                type="text"
                variant="outlined"
                //helperText={errors}
                //error={errors ? true : false}
                onChange={ (e) => onChangeValue(e)}
                InputProps={{
                    classes:{
                        input : classes.TextField
                    }
                }}
                InputLabelProps={{
                    style: {fontSize: "1.5rem"}
                }}
                className={classes.TextField} fullWidth/>
                <br/>
                <br/>
                <TextField 
                id="lname"
                name="lname"
                label="Last name"
                type="text"
                variant="outlined"
                //helperText={errors}
                //error={errors ? true : false}
                onChange={ (e) => onChangeValue(e)}
                InputProps={{
                    classes:{
                        input : classes.TextField
                    }
                }}
                InputLabelProps={{
                    style: {fontSize: "1.5rem"}
                }}
                className={classes.TextField} fullWidth/>
                <br/>
                <br/>    
              <TextField 
                id="email"
                name="email"
                label="Email"
                type="email"
                variant="outlined"
                //helperText={errors}
                //error={errors ? true : false}
                onChange={ (e) => onChangeValue(e)}
                InputProps={{
                    classes:{
                        input : classes.TextField
                    }
                }}
                InputLabelProps={{
                    style: {fontSize: "1.5rem"}
                }}
                className={classes.TextField} fullWidth/>
                <br/>
                <br/>

                 <TextField 
                id="password"
                name="password"
                label="Password"
                // helperText={userForm.errors.email}
                // error={userForm.errors.email ? true : false}
                onChange={ (e) => onChangeValue(e)}
                type="password"
                variant="outlined"
                InputProps={{
                    classes:{
                        input : classes.TextField
                    }
                }}
                InputLabelProps={{
                    style: {fontSize: "1.5rem"}
                }}
                className={classes.TextField} fullWidth/>
                <br/>
                <br/>
                <TextField 
                id="password2"
                name="password2"
                label="Confirm Password"
                // helperText={userForm.errors.email}
                // error={userForm.errors.email ? true : false}
                onChange={ (e) => onChangeValue(e)}
                type="password"
                variant="outlined"
                InputProps={{
                    classes:{
                        input : classes.TextField
                    }
                }}
                InputLabelProps={{
                    style: {fontSize: "1.5rem"}
                }}
                className={classes.TextField} fullWidth/>
                <Button color="primary" variant="contained" type='submit'size="large" className={classes.button} >Register</Button>
                <br/>
                <small className={classes.small}>
                    มีผู้ใช้งานอยู่แล้วหรือป่าว? login <Link to='login'>คลิกที่นี่</Link>
                </small>
            </form>
            </Grid>
            <Grid item sm={3} />

    </Grid>
    )
}

Signup.propTypes = {
    setAlert : PropTypes.func.isRequired,
    signUp: PropTypes.func.isRequired,
}

export default connect(
    null,
    { setAlert , signUp}
)(Signup);
