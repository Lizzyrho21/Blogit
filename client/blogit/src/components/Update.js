import React from "react";
import { Button, Modal } from "react-bootstrap";
import { useState } from "react";
// import Form from 'react-bootstrap/Form'
import { InputGroup, FormControl } from "react-bootstrap";

const Update = ({ id, updatePost }) => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [update, setUpdate] = useState(null);

    const handleChange = (e) => {
        console.log(e.target.id, ":", e.target.value);
        setUpdate({
        ...update,
        [e.target.id]: e.target.value,
        });
    };
    const handleSubmit = () => {
    updatePost(id, { title: update.updatedTitle, body: update.updatedBody });
    handleClose();
    //send a toast message!
    };
    return (
        <>
        <Button variant="warning" onClick={handleShow}>
            Update Post
        </Button>

        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
            <Modal.Title>Update Post</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <InputGroup className="mb-3">
                <InputGroup.Text>Title</InputGroup.Text>
                <FormControl
                onChange={handleChange}
                aria-label="title"
                id="updatedTitle"
                />
            </InputGroup>

            <InputGroup>
                <InputGroup.Text>Body</InputGroup.Text>
                <FormControl
                onChange={handleChange}
                as="textarea"
                aria-label="body"
                id="updatedBody"
                />
            </InputGroup>
            </Modal.Body>
            <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
                Close
            </Button>
            <Button variant="primary" onClick={handleSubmit}>
                Save Changes
            </Button>
            </Modal.Footer>
        </Modal>
        </>
    );
    };

export default Update;
