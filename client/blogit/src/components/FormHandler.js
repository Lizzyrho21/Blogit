import React from 'react'
import {InputGroup, FormControl} from 'react-bootstrap';
import {useState} from 'react';
import {Form, Button} from 'react-bootstrap';

const FormHandler = ({handlePost, user}) => {
  const [post, setPost] = useState({
    title:"",
    author:"",
    body:"",
  })
  const handleChange = (e) => {

    setPost({
      ...post,
      author: user.name,
      [e.target.name]: e.target.value,
      });
  }
  const handleSubmit = (e) => {
 handlePost(post)

  

  }
  return (
    <>
   <Form onSubmit={handleSubmit} >
    <InputGroup  className="mb-3" style={{width:'30vw', paddingTop:'20px'}}>
    <InputGroup.Text>Title</InputGroup.Text>
    <FormControl onChange={handleChange} aria-label="title"  name="title" value={post.title}/>
  </InputGroup>

  <InputGroup style={{width:'30vw', paddingTop:'20px'}}>
    <InputGroup.Text>Body</InputGroup.Text>
    <FormControl  onChange={handleChange} as="textarea" aria-label="body" name="body" value={post.body} />
  </InputGroup>
  <Button type="submit">Submit form</Button>

  </Form>
    </>
  )
}

export default FormHandler