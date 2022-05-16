import React from "react";
import { Button, Modal } from "react-bootstrap";
import { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";

const Delete = ({ id }) => {
  const { getAccessTokenSilently } = useAuth0();
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const deleteIt = async () => {
    try {
      const token = await getAccessTokenSilently({
        audience: process.env.REACT_APP_AUDIENCE,
        scope: "delete:post",
      });
      await axios.delete(`${process.env.REACT_APP_SERVER_URL}/delete/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      window.location.reload();
      //add a toast successful message
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <Button onClick={handleShow} variant="danger">
        Delete Post
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Post</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete this post? This action cannot be
          undone.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            No, take me back
          </Button>
          <Button variant="primary" onClick={deleteIt}>
            Yes, I'm sure
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Delete;
