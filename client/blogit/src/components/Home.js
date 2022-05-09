import { useAuth0 } from "@auth0/auth0-react";
import Logout from "./Logout";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Update from './Update';
import Delete from './Delete';
import Form from './FormHandler';

// first thing user sees when they log in
// Has recent posts
// Has user name displayed
//NEXT STEP: ADD REACT ROUTER
//NEXT STEP: USER PROFILE WITH ALL POSTS


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
                // console.log(token);
    
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
    
        //   setPost(result.data);
        };
    
        fetchData();
        }, [getAccessTokenSilently]);


    if (!posts) {
        return <div>Loading...</div>;
    }

    // create a post 

    const handlePost = async (...formdata) => {
        //post submission!

        try { 
        const data = formdata[0]; //state is an object
        // console.log(data);
        const token = await getAccessTokenSilently({
            audience: process.env.REACT_APP_AUDIENCE,
            scope: "create:post",
        });
        // console.log(token)
            let response = await axios.post(
            `${process.env.REACT_APP_SERVER_URL}/newpost`,
            data,
            {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            }
        );
        setPosts(...posts, response.data);
        
    
        
        } catch (error) {
        console.log(error.response);
        }
        
    };

   
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


    const updatePost =  async(id, ...updatedBody) => {
        // console.log(`${id}, is going to be this:  ${updatedBody}`);
        // axios.put request
        try{
        const token = await getAccessTokenSilently({
            audience: process.env.REACT_APP_AUDIENCE,
            scope: "create:post",
        });
        
        let response =  await axios.put(`${process.env.REACT_APP_SERVER_URL}/update/${id}`,
        ...updatedBody,
        {
        headers: {
            Authorization: `Bearer ${token}`,
        },
        });
        console.log(response.data)
        window.location.reload()}catch(error){console.log(error.response)}

    }
    return (
        <div>
        <header>
            <h5>Welcome {user.name}.</h5>
            <Logout />
        </header>
        <section className="allposts">
            {posts.map((post) => {
            return (
                <div key={post._id} >
                <h2 >{post.title}</h2>
                <h5 
                    onClick={() => {
                    authorPosts(post.author);
                    }}
                >
                    {post.author}
                </h5>
                <Update id={post._id} updatePost={updatePost}/>

                <Delete id={post._id}  />
                </div>
            );
            })}
        </section>
        <Form handlePost={handlePost} user={user}/>
        </div>
    );
    };

export default Home;
