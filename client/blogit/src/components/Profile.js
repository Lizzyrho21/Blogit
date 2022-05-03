import React, {useEffect, useState} from 'react';
import { useAuth0 } from '@auth0/auth0-react';


const Profile = () => {

    const {user, isAuthenticated, getAccessTokenSilently} = useAuth0();
    const [userMetadata, setUserMetadata] = useState(null);
useEffect(() => {
    const getUserMetadata = async () => {
        const domain = "dev-dub2pki9.us.auth0.com";
        try{
            const accessToken = await getAccessTokenSilently({
                audience: `https://${domain}/api/v2/`,
                scope: "read:current_user",
            });
            const userDetailsByIdUrl = `https://${domain}/api/v2/users/${user.sub}`;
            const metaDataResponse = await fetch(userDetailsByIdUrl, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                },
            });

            const {user_metadata} = await metaDataResponse.json();

            setUserMetadata(user_metadata);
                    
        }catch (e){
    console.error(e)

        }
    };
getUserMetadata();
}, [getAccessTokenSilently, user?.sub] )

  return (
      isAuthenticated && (
    <div>
        <h2>{user.name}</h2>
        <p>{user.email}</p>
        <h3>User Metadata</h3>
        {userMetadata ? (
            <pre>{JSON.stringify(userMetadata, null, 2)}</pre>
        ) : (
            "No user Metadata defined"
        )}
    </div>
    )
  )
}

export default Profile