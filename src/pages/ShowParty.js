import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Party from '../Components/Party';
import Spinner from '../layouts/Spinner';
//MUI
import Grid from '@material-ui/core/Grid';
//Redux

const ShowParty = (props) => {
    const [loading,Setloading] = useState(true)
    const [partys,setParty] = useState({
        Allparty : []
    });
    const { category } = useParams();



    useEffect(  () => {
        axios.get(`http://localhost:5000/graduation-project-cs-32/asia-southeast2/api/getparty/${category}`)
        .then((res) => {
            if(res){
                Setloading(false)
                setParty({
                    Allparty : res.data
                })
            }
        })
        .catch((err) => {
            console.log(err)
        })
    },[])




    if(loading) return <Spinner />;
    if(partys.Allparty.length === 0) {
        return <h1 style={{textAlign:'center'}}>ยังไม่มีใครสร้างปาตี้ในหมวดนี้ :(</h1>
    }

    
    return (
        <Grid container spacing={3}>
            <Grid item xs={12}>
                <h1 style={{textAlign:'center',fontSize:'5rem'}}>หมวด {category}</h1> 
            </Grid>
            {
                partys.Allparty.map((party) => {
                    return <Party
                                key={party.partyId}
                                partyId={party.partyId}
                                partyTitle={party.name}
                                hostImg={party.host_img}
                                thumbnailImg={party.thumbnailUrl}
                                TimeStamp={party.createdAt}
                                cMember={party.c_member}
                                tMember={party.t_member}
                                status={party.status}
                                desc={party.desc}
                                price={party.price}
                                members={party.members}
                                category={party.category}
                                hostId={party.host}
                                    />
                })
            }

        </Grid>
    )
}

ShowParty.propTypes = {

}

export default ShowParty
