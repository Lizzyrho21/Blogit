import React, {useEffect, useState} from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import axios from 'axios';

// NEXT => Read up on scopes, but for now, add a all POSTS page for when the user logs in!
const Profile = () => {

    const { isAuthenticated, user,  getAccessTokenSilently } = useAuth0();
    const [posts, setPosts] = useState([]);
    
        useEffect(() => {
        (async () => {
            try {
            const token = await  getAccessTokenSilently({
                audience: process.env.REACT_APP_AUDIENCE,
                scope: 'read:current_user',
            });
        
            //   const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/home`, {
            //     headers: {
            //         Authorization: `Bearer ${token}`,
            //     },
            const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/home`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
            });
            setPosts(response.data);
            
            } catch (e) {
            console.error(e);
            }
        })();
        }, [getAccessTokenSilently]);
    
        if (!posts) {
        return <div>Loading...</div>;
        }


  return (
      isAuthenticated && (
    <div>
        <h2>{user.name}</h2>
        <p>{user.email}</p>
        {posts.map((el) => {
            return (
            <>
            <h1>{el.title}</h1>
            <h2>{el.author}</h2>
            <p>{el.body}</p>
            </>)
        })}

    </div>
    )
  )
}

export default Profile