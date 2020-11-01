import React from 'react'


import CircularProgress from '@material-ui/core/CircularProgress';
const Spinner = () => {
    return (
        <>
            <CircularProgress 
                        disableShrink
                        style={{margin:'10rem auto',display:'block'}}
                        size='5rem' />
        </>
    )
}

export default Spinner
