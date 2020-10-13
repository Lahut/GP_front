import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { loadParty } from '../redux/actions/userActions';
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
                console.log(res) //got it
            }
        })();
        
    },[])


    // if(partys.length === 0){
    //    return <div><h1>ยังไม่มีใครสร้างปาตี้ในหมวดนี้</h1></div> 
    // } 

    console.log(partys)
    return (
        <div>
            <h1>หมวด {category}</h1>
            {console.log(partys.Allparty)}
        </div>
    )
}

ShowParty.propTypes = {

}

export default ShowParty
