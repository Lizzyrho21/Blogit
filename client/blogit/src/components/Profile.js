import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import { useState, useEffect } from "react";
import FormHandler from "./FormHandler";
import Update from "./Update";
import Delete from "./Delete";
import Logout from "./Logout";
import '../profile.css';
import {Card, Button} from 'react-bootstrap';
import { AppBar, Toolbar, Container } from "@mui/material";
import {
  Link
} from "react-router-dom";

const Profile = ({ handlePost, posts }) => {
  const { isAuthenticated, user } = useAuth0();
  const [userposts, setUserPosts] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_SERVER_URL}/all-posts?author=${user.name}`
        );

        setUserPosts(response.data);
      } catch (e) {
        console.log(e.response);
      }
    };

    fetchData();
  }, [user.name]);

  // console.log(user);

  return (
    isAuthenticated && (
      <div>
        <header>
          <AppBar>
            <Toolbar className="toolbar">
      <Link className="home" to="/">Home</Link>
          <Logout />
          </Toolbar>
          </AppBar>
        </header>
 
          <Container maxWidth='200' sx={{height:300, mt:10}} className="user-info">
        <img className="profile-picture" src={user.picture} alt={user.name}/>
        <h2 className="username">{user.name}</h2>
        </Container>
        <div className="my-posts">
          
          {userposts.length === 0 ? (
            <>
              <h1>No posts found</h1>
              <FormHandler user={user} />
            </>
          ) : (
            
              
              <div className="all-posts">
                {
                userposts.map((el) => {
                  return(
                  <Card  style={{ width: '18rem' }}>
                  <Card.Img variant="top" src="https://images.unsplash.com/photo-1531256379416-9f000e90aacc?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1674&q=80" />
                  <Card.Body>
                  <Card.Title>{el.title}</Card.Title>
                  <Card.Text>
                    {el.body}
                  </Card.Text>
                    <Button>Read More</Button>

                    <Update id={el._id} />

                    <Delete id={el._id} />
                    
                    </Card.Body>
                    </Card>
                    )
                })
              }
                </div>
                
              
              
            )
            

          //end of conditional
          }
          <section className="form-section">
          
          <FormHandler user={user} className="form-handler" />
          </section>
        </div>
      
      </div>
    )
  );
};

export default Profile;
