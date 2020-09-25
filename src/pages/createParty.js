import React from 'react'

//MUI
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { Label } from '@material-ui/icons';

const useStyles = makeStyles({
    form:{
        textAlign:"left",
        margin:"10rem auto",
        backgroundColor:"red",
        fontSize:"2rem"

    },
    TextField:{
        fontSize:"2rem",
        maxWidth:"100000rem"
    }
});

export default function CreateParty() {

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


                        
                    </form>
            </Grid>
    )

}
