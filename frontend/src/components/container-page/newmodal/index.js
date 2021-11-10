import Modal from "react-bootstrap/Modal";
import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
const NewModal = (props) => {
  let showNew = props.showNew,
    handleClose = props.handleClose;
  const createNew = () => {
    // post form data len server
    console.log("click", formData);
  };
  const [formData, setFormData] = useState({ email: null, password: null });
  return (
    <Modal show={showNew} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>New order</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              onChange={(e) => {
                setFormData({
                  email: e.target.value,
                  password: formData.password,
                });
              }}
              value={formData.email}
            />
            {/* <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text> */}
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              value={formData.password}
              onChange={(e) => {
                setFormData({
                  password: e.target.value,
                  email: formData.email,
                });
              }}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicCheckbox">
            <Form.Check type="checkbox" label="Check me out" />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" type="submit" onClick={createNew}>
          Submit
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
export default NewModal;
