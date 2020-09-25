import React from 'react'


//MUI
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles({
    form:{
        textAlign:"center",
        margin:"10rem auto"
    },
    TextField:{
        fontSize:"2rem"
    }
});

export default function Kyc() {

    const classes = useStyles();
    return (
        
            <Grid className={classes.form} item xs={12}>
                <h1>KYC page</h1>
            </Grid>
        
    )
}

//export default kyc
