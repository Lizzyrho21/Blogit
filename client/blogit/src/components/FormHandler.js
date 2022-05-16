import React from "react";
import { InputGroup, FormControl } from "react-bootstrap";
import { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useAuth0 } from "@auth0/auth0-react";

import axios from "axios";

const FormHandler = ({ user }) => {
  const { getAccessTokenSilently } = useAuth0();
  const [post, setPost] = useState({
    title: "",
    author: "",
    body: "",
  });

  const handleChange = (e) => {
    setPost({
      ...post,
      author: user.name,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    handlePost(post);
    window.location.reload();
  };

  const handlePost = async (...formdata) => {
    //post submission!
    try {
      const data = formdata[0]; //state is an object

      const token = await getAccessTokenSilently({
        audience: process.env.REACT_APP_AUDIENCE,
        scope: "create:post",
      });
      await axios.post(`${process.env.REACT_APP_SERVER_URL}/newpost`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    } catch (error) {
      console.log(error.response);
    }
  };

  return (
    <>
      <h1>Create A Post</h1>
      <Form onSubmit={handleSubmit}>
        <InputGroup
          className="mb-3"
          style={{ width: "30vw", paddingTop: "20px" }}
        >
          <InputGroup.Text>Title</InputGroup.Text>
          <FormControl
            onChange={handleChange}
            aria-label="title"
            name="title"
            value={post.title}
          />
        </InputGroup>

        <InputGroup style={{ width: "30vw", paddingTop: "20px" }}>
          <InputGroup.Text>Body</InputGroup.Text>
          <FormControl
            onChange={handleChange}
            as="textarea"
            aria-label="body"
            name="body"
            value={post.body}
          />
        </InputGroup>
        <Button className="submit" type="submit">
          Create Post
        </Button>
      </Form>
    </>
  );
};

export default FormHandler;
