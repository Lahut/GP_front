import React from 'react'
//MUI
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
//Redux
import { connect } from 'react-redux';
import { login } from '../redux/actions/authActions';
const Dashboard = ({user}) => {


    const useStyles = makeStyles({
        helloText: {
            fontSize: "5rem",
            margin: "0 auto",
            textAlign:"center"
        }
    })

    const classes = useStyles();

    return (
        <div>
            <h1 className={classes.helloText}>สวัสดี {user && user.fname}</h1>
        </div>
    )


    
}
Dashboard.propTypes = {
    user : PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    user : state.auth.user
})

export default connect(mapStateToProps)(Dashboard)
