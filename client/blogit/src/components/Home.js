import { useAuth0 } from "@auth0/auth0-react";
import Logout from "./Logout";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import { AppBar, Toolbar } from "@mui/material";
import "../header.css";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Computer from "../puter.jpg";

const Home = ({ user }) => {
  const { getAccessTokenSilently } = useAuth0();
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = await getAccessTokenSilently({
          audience: process.env.REACT_APP_AUDIENCE,
          scope: "read:current_user",
        });

        const response = await axios.get(
          `${process.env.REACT_APP_SERVER_URL}/home`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setPosts(response.data);
      } catch (e) {
        console.log(e.response);
      }
    };

    fetchData();
  }, [getAccessTokenSilently]);

  // const detailedView = (id) => {
  //   try {
  //     posts.map(async (el) => {
  //       if (id === el._id) {
  //         const response = await axios.get(
  //           `${process.env.REACT_APP_SERVER_URL}/posts/${el._id}`
  //         );
  //           // setDescription(response.data.body);
          
  //       }
  //     });
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  return (
    <div>
      <header>
        <AppBar>
          <Toolbar className="toolbar">
            <h3>Blogit</h3>
            <h5>Welcome {user.name}.</h5>
            <Link className="profile" to="profile">
              Profile
            </Link>
            <Logout />
          </Toolbar>
        </AppBar>
      </header>
      <div className="home-container">
        <h2>Featured Posts</h2>
        {/* <Users posts={posts} /> */}
        <div className="allposts">
          {posts.map((post) => {
            return (
              <Card sx={{}} className="cards">
                <CardMedia
                  component="img"
                  alt="green iguana"
                  height="100"
                  image={Computer}
                />
                <CardContent>
                  <Typography gutterBottom variant="h4" component="div">
                    {post.title}
                  </Typography>
                  <Typography variant="h5" color="text.secondary">
                    {post.author}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button size="small">Share</Button>
                  <Button onClick={() => console.log('hello')}>
                    Read more
                  </Button>
                </CardActions>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Home;
