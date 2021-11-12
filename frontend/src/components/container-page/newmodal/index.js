import { Modal, Form, Button } from "react-bootstrap";
import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-datepicker/dist/react-datepicker.css";

import "./newmodal.css";
import axios from "axios";
const NewModal = (props) => {
  let showNew = props.showNew,
    handleClose = props.handleClose;
  const createNew = () => {
    // post form data len server
    // axios
    //   .patch("/api/v1/container", formData)
    //   .then((res) => res.data)
    //   .then((res) => {
    //     console.log(res);
    //   });
    console.log("click", formData);
  };
  console.log(props.showNew);
  const [formData, setFormData] = useState({
    name: "",
    container: props.showNew,
    order_id: null,
    category: null,
    description: null,
    route: null,
    time_start: null,
  });

  return (
    <Modal show={!!showNew} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>New order</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Name </Form.Label>

            <Form.Control
              name="name"
              type="text"
              placeholder="Enter your name"
              value={formData.name}
              onChange={(e) => {
                console.log(e);
                setFormData({ ...formData, name: e.target.value });
              }}
            />
          </Form.Group>
          <div className="id-cate-container">
            <div>
              <Form.Group>
                <Form.Label>ID</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter your order ID"
                  value={formData.order_id}
                  onChange={(e) => {
                    setFormData({ ...formData, order_id: e.target.value });
                  }}
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
                value={formData.route}
                onChange={(e) => {
                  setFormData({ ...formData, route: e.target.value });
                }}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Time Start</Form.Label>
              <DatePicker
                className="form-control"
                selected={formData.time_start}
                onChange={(e) => {
                  setFormData({ ...formData, time_start: e });
                }}
                name="selectDate"
                showTimeSelect
                timeIntervals={15}
                timeFormat="HH:mm"
                timeCaption="time"
                dateFormat="MMMM d, yyyy h:mm aa"
              />
            </Form.Group>
          </div>

          <Form.Group>
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              placeholder=""
              row={3}
              value={formData.description}
              onChange={(e) => {
                setFormData({ ...formData, description: e.target.value });
              }}
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
