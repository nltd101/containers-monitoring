import {Modal, Form, Button} from "react-bootstrap";
import React, { useState, useEffect } from "react";

import "./newmodal.css";

const NewModal = (props) => {
  let showNew = props.showNew,
    handleClose = props.handleClose;
  const createNew = () => {
    // post form data len server
    console.log("click", formData);
  };
  const [formData, setFormData] = useState({ email: null, password: null });
  console.log("chua mount")

  return (
    <Modal show={showNew} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>New order</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Name </Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter your name"
            />
          </Form.Group>
          <div className="id-cate-container">
            <div>
            <Form.Group>
              <Form.Label>ID</Form.Label>
              <Form.Control
                type="text"
                placeholder=""
              />
            </Form.Group>
            </div>
            <div className="cate">
            <Form.Group>
              <Form.Label>Category</Form.Label>
              <Form.Select defaultChecked={null}>
                <option>Apple</option>
                <option>Orange</option>
                <option>Fish</option>
                <option>Beef</option>
              </Form.Select>
            </Form.Group>
            </div>
          </div>

         <div className="route-time-container">
         <Form.Group>
          <Form.Label>Route</Form.Label>
            <Form.Control
              type="text"
              placeholder=""
            />
          </Form.Group>

          <Form.Group>
          <Form.Label>Time Start</Form.Label>
            <Form.Control
              type="text"
              placeholder=""
            />
          </Form.Group>
        </div>

          <Form.Group>
            <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                placeholder=""
                row={3}
              />
          </Form.Group>

        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancel
        </Button>
        <Button variant="primary" onClick={createNew}>
           Start 
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
export default NewModal;