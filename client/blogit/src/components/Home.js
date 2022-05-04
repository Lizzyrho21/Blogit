import { useAuth0 } from "@auth0/auth0-react";
import Logout from "./Logout";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Create from './Create';
import {Button} from 'react-bootstrap';
// first thing user sees when they log in
// Has recent posts
// Has user name displayed

    const Home = ({ user }) => {
    const { getAccessTokenSilently } = useAuth0();
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        (async () => {
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
            console.error(e);
        }
        })();
    }, [getAccessTokenSilently]);

    if (!posts) {
        return <div>Loading...</div>;
    }
// reutrns all of specific author posts 
    const authorPosts = async (author) => {
        // axios get method to route with author parameters
        try {
        const response = await axios.get(
            `${process.env.REACT_APP_SERVER_URL}/all-posts?author=${author}`
        );
        console.log(response.data);
        } catch (error) {
        console.error(error);
        }
    };
// returns body message  of user post
    const detailedView = (id) => {
        try {
        posts.map(async (el) => {
            if (id === el._id) {
            const response = await axios.get(
                `${process.env.REACT_APP_SERVER_URL}/posts/${el._id}`
            );
            console.log(response.data.body);
            }
        });
        } catch (error) {
        console.error(error);
        }
    };

    return (
        <div>
        <header>
            <h5>Welcome {user.name}.</h5>
            <Logout />
        </header>
        <section className="allposts">
            {posts.map((post) => {
            return (
                <div key={post._id}>
                <h2>{post.title}</h2>
                <h5
                    onClick={() => {
                    authorPosts(post.author);
                    }}
                >
                    {post.author}
                </h5>
                <Button 
                    onClick={() => {
                    detailedView(post._id);
                    }}
                >
                    Click for a detailed view
                </Button>
                </div>
            );
            })}
        </section>
        <Create />
        </div>
    );
    };

export default Home;
