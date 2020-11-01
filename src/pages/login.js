import React, { useState } from 'react'
import { Link, Redirect, useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
// MUI Stuff
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

//Redux
import { connect } from 'react-redux';
import { login } from '../redux/actions/authActions';
const Login = ({login, isAuthenticated,loading}) => {

    const [userForm , setUserForm ] = useState({
        email:'',
        password: ''
    })
    
    const useStyles = makeStyles({
        TextField: {
            fontSize: "2rem"
        },
        form: {
            textAlign : 'center'
        },
        button: {
            margin: "2rem auto",
            fontSize: "1.5rem"
        }
    })
    
    
    
    const onChangeValue = (e) => {
        setUserForm({...userForm, [e.target.name] : e.target.value});
    }
    
    
      
    
    const handleSubmit = (e) => {
        e.preventDefault();

        
       const {email,password} = userForm;

        login({email,password});
    }
    


    const classes = useStyles();
    if(isAuthenticated){
        return <Redirect to='/dashboard'/>
    }
    return (
        
        <Grid container className={classes.form}>
            <Grid item sm />
            <Grid item sm >
                <form onSubmit={e => handleSubmit(e)}>
                  <TextField 
                    id="email"
                    name="email"
                    label="Email"
                    type="email"
                    variant="outlined"
                    //error={UI.errors ? true : false}
                    //helperText={UI.errors ? UI.errors.email : ""}
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
                    //error={UI.errors ? true : false}
                    //helperText={UI.errors ? UI.errors.password : ""}
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
                    <Button color="primary" variant="contained" type='submit'size="large" className={classes.button} >Login</Button>
                </form>
                
                </Grid>
            <Grid item sm />
        </Grid>
    )
}

Login.propTypes = {
    login: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool
}

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated
    
})

export default connect(mapStateToProps,{ login })(Login)


