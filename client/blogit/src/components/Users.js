import React from 'react'
// import Logout from "./Logout";
// import {axios} from 'axios';
import Girl from '../Girl.jpg';
import guy from '../guy.jpg';


const Users = ({posts}) => {

    // const detailedView = (id) => {
    //     try {
    //     posts.map(async (el) => {
    //         if (id === el._id) {
    //         const response = await axios.get(
    //             `${process.env.REACT_APP_SERVER_URL}/posts/${el._id}`
    //         );
    //         console.log(response.data.body);
    //         }
    //     });
    //     } catch (error) {
    //     console.error(error);
    //     }
    // };
    // console.log(posts);
    let re = /([Lizzy])/;

  return (

    <div>
    
        {posts.map((el => {
          
          return(
            re.test(el.author) ?
            <>
            <img src={Girl} style={{paddingBottom: '20px', width:'15vw', height:'15vh', borderRadius: '50%', paddingLeft:'20px'}} alt="Woman headshot"/>
            </>  : <img src={guy} style={{paddingBottom: '20px', width:'15vw', height:'15vh', borderRadius: '50%', paddingLeft:'20px'}} alt="Woman headshot"/>

          )
          
          
        }))}
        
        

      

    </div>
  )
}

export default Users