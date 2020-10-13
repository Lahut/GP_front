import React from 'react'
import CategoryItem from './CategoryItem';
//MUI
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
//Redux
import { connect } from 'react-redux';


const Dashboard = ({user}) => {


    const useStyles = makeStyles({
        helloText: {
            fontSize: "5rem",
            margin: "0 auto",
            textAlign:"center"
        }
    })

    



    const Categorys = [
        {
            name: 'เสื้อผ้า',
            img: 'https://i.redd.it/b3esnz5ra34y.jpg',
            keyword: 'cloth'
        },{
            name: 'อาหาร',
            img: 'https://i.redd.it/b3esnz5ra34y.jpg',
            keyword: 'food'
        },{
            name: 'ท่องเที่ยว',
            img: 'https://i.redd.it/b3esnz5ra34y.jpg',
            keyword: 'travel'
        },{
            name: 'Platforms/Software',
            img: 'https://i.redd.it/b3esnz5ra34y.jpg',
            keyword: 'platform-software'

        },{
            name: 'คอร์สเรียน',
            img: 'https://i.redd.it/b3esnz5ra34y.jpg',
            keyword: 'education'
        },{
            name: 'อื่นๆ',
            img: 'https://i.redd.it/b3esnz5ra34y.jpg',
            keyword: 'etc'
        }
    ]

    const classes = useStyles();
    
    return (
        <Grid container spacing={3}>
            <Grid item xs={12}>
                <h1 className={classes.helloText}>สวัสดี {user && user.fname}</h1> 
            </Grid>
            {
                Categorys.map((category,index) => {
                    return <CategoryItem 
                                name={category.name} 
                                img={category.img} 
                                keyword={category.keyword}
                                key={index} />
                })
            }

        </Grid>
    )


    
}
Dashboard.propTypes = {
    user : PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    user : state.auth.user
})

export default connect(mapStateToProps)(Dashboard)
