import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

//MUI
import { makeStyles } from '@material-ui/core/styles';
import Alert from '@material-ui/lab/Alert';


  const useStyles = makeStyles({
      Alert : {
        margin: "1rem auto",
        fontSize: "1.5rem"
      }
    });

    const Alerted = ({ alerts }) => {
        const classes = useStyles();
        if(alerts !== null && alerts.length > 0){
            return alerts.map(alert => (
                <div key={alert.id}><Alert className={classes.Alert} severity={alert.alertType}>
                        {alert.msg}</Alert></div>
            ));
        }

        return (
            <div></div>
        );

    }

    
        
      
                        
  


    

Alert.propTypes = {
    alerts: PropTypes.array.isRequired,
}

const mapStateToProps = state => ({
    alerts : state.alert
})

export default connect(mapStateToProps)(Alerted);
