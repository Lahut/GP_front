import React from 'react';
import Link from 'react-router-dom/Link';
// MUI stuff
import AppBar from '@material-ui/core/AppBar';
import ToolBar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import { Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';


//Redux
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../redux/actions/authActions';
const Navbar = ({isAuthenticated , logout}) => {
    const useStyles = makeStyles({
        Button: {
            fontSize: "1.8rem",
            color:"white",
            fontWeight:100
        },
        LOGO:{
            fontSize: "2.5rem",
            color:"white",
            fontWeight:100,
            marginRight: "5rem"
        }
    });

    const classes = useStyles();
    if(isAuthenticated){
        return (
            <AppBar >
                <ToolBar>
                    <Box display='flex' flexGrow={1}>
                        <Button 
                        className={classes.LOGO}
                        component={Link} to='/'>Dozen</Button>
                        <Button 
                        className={classes.Button}
                        component={Link} to='/dashboard'>หาบ้าน</Button>
                        <Button 
                        className={classes.Button}
                        component={Link} to='/dashboard'>หาคนช่วยแชร์</Button>
                        <Button 
                        className={classes.Button}
                        component={Link} to='/dashboard'>ยืนยันตัวตน</Button>
                    </Box>
                    <Button className={classes.Button} onClick={ logout } >LOGOUT</Button>
                </ToolBar>
            </AppBar>
    )}else{
        return (
            <AppBar >
                <ToolBar>
                    <Box display='flex' flexGrow={1}>
                        <Button 
                        className={classes.Button}
                        component={Link} to='/'>Dozen</Button>
                    </Box>
                    <Button className={classes.Button} component={Link} to='/login'>Login</Button>
                    <Button className={classes.Button} component={Link} to='/signup'>Register</Button>
                </ToolBar>
            </AppBar>
        ) 
    }
}

Navbar.propTypes = {
    isAuthenticated: PropTypes.bool,
    logout: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps,{ logout })(Navbar);
