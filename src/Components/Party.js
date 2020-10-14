import React from 'react'
import PropTypes from 'prop-types'
import classes from '../pages/styles/PartyCard.module.css';
import { useHistory } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
const Party = ({partyTitle,hostImg,thumbnailImg,createAt}) => {

    let history = useHistory();
    const date  = new Date().getTime(createAt);
    
    return (
        <Grid   item xs={12} sm={6}>
            <div className={classes.cardslist}>
                <div className={classes.card}>
                    <div className={classes.card_image}>
                        <img src={thumbnailImg} />
                    </div>
                    <div className={classes.card_title}>
                        <p>{partyTitle}</p>
                        <div className={classes.dot}>
                            <img  src={hostImg} />
                        </div>
                        <div className="">
                            <i class="fas fa-users"><h> 0/4</h></i>
                            <br/>
                            <br/>
                            <i class="far fa-clock">{date}</i>
                        </div>
                    </div>
                </div>
            </div>
        </Grid>
    )
}

Party.propTypes = {

}

export default Party
