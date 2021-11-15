import { Modal, Form, Button } from "react-bootstrap";
import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-datepicker/dist/react-datepicker.css";
import { getCookie } from "../../../ultils/token.ultils";
import "./newmodal.css";
import axios from "axios";
var csrftoken = getCookie("csrftoken");
const NewModal = (props) => {
  let showNew = props.showNew,
    handleClose = props.handleClose;
  const createNew = () => {
    // post form data len server
    let body = { ...formData, container: showNew };
    if (formData.name == "") {
      alert("Please input the order name");
      return;
    }
    axios
      .patch("/api/v1/container", body, {
        headers: { "X-CSRFToken": csrftoken },
      })
      .then((res) => res.data)
      .then((res) => {
        console.log(res);
        if (res.data)
          props.setData((prevState) => {
            let newOrder = res.data;
            for (let i = 0; i < prevState.length; i++) {
              let container = prevState[i];
              if (container.id == showNew) {
                let newContainer = {
                  ...container,
                  order_id: newOrder.id,
                  start_time: newOrder.start_time,
                  last_update: newOrder.last_update,
                  free: false,
                };
                console.log(newContainer);
                return [
                  ...prevState.slice(0, i),
                  newContainer,
                  ...prevState.slice(i + 1, prevState.length),
                ];
              }
            }
            return prevState;
          });
        handleClose();
      })
      .catch((err) => {
        alert("error" + err);
        handleClose();
      });
    console.log("click", body);
  };
  console.log("continerid", props.showNew);
  const [formData, setFormData] = useState({
    name: "",

    order_id: "",
    category: 1,
    description: "",
    route: "",
    time_start: new Date(),
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
                <Form.Select
                  onChange={(e) => {
                    setFormData({ ...formData, category: e.target.value });
                  }}
                  defaultChecked={formData.category}
                >
                  <option value="1">Apple</option>
                  <option value="2">Orange</option>
                  <option value="3">Fish</option>
                  <option value="4">Beef</option>
                </Form.Select>
              </Form.Group>
            </div>
          </div>

          <div className="route-time-container">
            <div className="route-container">
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
            </div>
            <div className="time-container">
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
