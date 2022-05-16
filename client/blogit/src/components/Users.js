import React from 'react'
// import Logout from "./Logout";
// import {axios} from 'axios';
import Girl from '../Girl.jpg';
import guy from '../guy.jpg';
import { Avatar } from '@mui/material';
  


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

    <div className="avatars">
    
        {posts.map((el => {
          
          return(
            re.test(el.author) ?
            <>
            <Avatar
  alt={el.author}
  src={Girl}
  sx={{ width: 56, height: 56 }}
/>
           
            </>  : <Avatar
  alt={el.author}
  src={guy}
  sx={{ width: 56, height: 56 }}
/>

          )
          
          
        }))}
        
        

      

    </div>
  )
}




 
export default Users