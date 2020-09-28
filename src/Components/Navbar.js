import React, { useState } from 'react';
import Link from 'react-router-dom/Link';
// MUI stuff
import AppBar from '@material-ui/core/AppBar';
import ToolBar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import { Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import PersonIcon from '@material-ui/icons/Person';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';


//Redux
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../redux/actions/authActions';
const Navbar = ({isAuthenticated , logout, user}) => {

    const [anchorEl, setAnchorEl] = useState(false);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
      };
    
      const handleClose = () => {
        setAnchorEl(false);
      };

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
                        component={Link} to='/dashboard'>หาปาตี้</Button>
                        <Button 
                        className={classes.Button}
                        component={Link} to='/createParty'>หาคนช่วยแชร์</Button>
                    </Box>
                    
        <Button className={classes.Button}  aria-controls="simple-menu" aria-haspopup="true" onClick={ (e) => handleClick(e) }><PersonIcon fontSize="large"/>{user && user.fname}</Button>
                    <Menu
                        id="simple-menu"
                        anchorEl={ anchorEl}
                        open={ Boolean(anchorEl) }
                        onClose={ handleClose }
                    >
                        <MenuItem style={{fontSize: "2rem"}} component={Link} to='/profile' onClick={ handleClose }>โปรไฟล์</MenuItem>
                        <MenuItem style={{fontSize: "2rem"}} component={Link} to='/showBank' onClick={ handleClose }>สมุดบัญชี</MenuItem>
                        <MenuItem style={{fontSize: "2rem"}} component={Link} to='/addBank' onClick={ handleClose }>เพิ่มสมุดบัญชี</MenuItem>
                        <MenuItem style={{fontSize: "2rem"}} component={Link} to='/kyc' onClick={ handleClose }>ยืนยันตัวตน</MenuItem>
                        <MenuItem style={{fontSize: "2rem"}} onClick={ ()=> {logout(); handleClose();} }>Logout</MenuItem>
                        
                    </Menu>
                   
                    
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
    user: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated,
    user: state.auth.user
})

export default connect(mapStateToProps,{ logout })(Navbar);
