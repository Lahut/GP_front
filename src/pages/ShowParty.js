import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Party from '../Components/Party';
//MUI
import Grid from '@material-ui/core/Grid';
//Redux

const ShowParty = (props) => {
    const [partys,setParty] = useState({
        Allparty : []
    });
    const { category } = useParams();

    useEffect(  () => {
        ( async () => {
            const res = await axios.get(`https://asia-southeast2-graduation-project-cs-32.cloudfunctions.net/api/getparty/${category}`)
            if(res){
                //console.log(res) //got it
                setParty({
                    Allparty : res.data
                })
            }
        })();
    },[])


    // if(partys.length === 0){
    //    return <div><h1>ยังไม่มีใครสร้างปาตี้ในหมวดนี้</h1></div> 
    // } 
    if(partys.Allparty.length === 0) {
        return <h1 style={{textAlign:'center'}}>ยังไม่มีใครสร้างปาตี้ในหมวดนี้ :(</h1>
    }

    console.log(partys)
    return (
        <Grid container spacing={3}>
            <Grid item xs={12}>
                <h1 style={{textAlign:'center',fontSize:'5rem'}}>หมวด {category}</h1> 
            </Grid>
            {
                partys.Allparty.map((party) => {
                    return <Party
                                key={party.partyId}
                                partyTitle={party.name}
                                hostImg={party.host_img}
                                thumbnailImg={party.thumbnailUrl}
                                createAt={party.createdAt}    />
                })
            }

        </Grid>
    )
}

ShowParty.propTypes = {

}

export default ShowParty
