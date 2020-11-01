import React, { useState } from 'react'
import PropTypes from 'prop-types'
import classes from '../pages/styles/PartyCard.module.css';
import { useHistory } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';

const Party = ({partyTitle,hostImg,thumbnailImg,
                TimeStamp,cMember,tMember,
                status,partyId}) => {

    let history = useHistory();
    let color;
    const dateInMillis = TimeStamp._seconds * 1000
    const date  = new Date(dateInMillis).toDateString();
    const time = new Date(dateInMillis).toLocaleTimeString();
    //console.log(TimeStamp)


    if(status === 'available'){
        status = 'ว่าง';
        color = "#09de42";
    } 
    if(status === 'full'){
        status = 'เต็ม';
        color = "#cc0202";
    }
    
    


    return (
        <>
        <Grid   item xs={12} sm={6}>
            <div onClick={() => history.push(`/showParty/party/${partyId}`)} className={classes.cardslist}>
                <div className={classes.card}>
                    <div className={classes.card_image}>
                        <img src={thumbnailImg} />
                        <div className={classes.tab}  style={{backgroundColor: `${color}`}}>
                            <h>{status}</h>
                        </div>
                    </div>
                    <div className={classes.card_title}>
                        <p>{partyTitle}</p>
                        <div className={classes.dot}>
                            <img  src={hostImg} />
                        </div>
                        <div className={classes.detail}>
                            <i class="fas fa-users"></i><h> {` ${cMember}/${tMember}`}</h>
                            <br/>
                            <i class="fas fa-calendar-alt"></i><h>{` ${date}`}</h>
                            <br/>
                            <i class="far fa-clock"></i><h>{` ${time}`}</h>
                        </div>
                    </div>
                </div>
            </div>
        </Grid>
        </>
    )
}

Party.propTypes = {

}

export default Party
