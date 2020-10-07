import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import style from './styles/dashboard.module.css';
import Paper from '@material-ui/core/Paper';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import { Link, Redirect,useHistory } from 'react-router-dom';
const CategoryItem = ({name,img,keyword}) => {


    let history = useHistory();
    return (
            <Grid   item xs={12} sm={6}>
                <div className={style.cardslist}>
                    <div onClick={ () => history.push(`/showParty/${keyword}`)} className={style.card}>
                        <div className={style.cardImage}> 
                            <img src={img} /> 
                        </div>
                        <div className={style.cardTitle}>
                            <p>{name}</p>
                        </div>
                    </div>
                </div>
            </Grid>
    )
}

export default CategoryItem
