import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Button from "react-bootstrap/Button";
const HistoryRow = (props) => {
  let order = props.order;
  console.log(props);
  const history = useHistory();

  const handleDetailClick = () => {
    history.push('/order/'+order.id)
  }

  return (
    <tr>
      <td>{order.id}</td>
      <td>{order.name}</td>
      <td>{order.route}</td>
      <td>{order.last_update}</td>
      <td>
        {/* {container.free ? (
          <Button variant="success" onClick={() => props.setShowNew(true)}>
            New
          </Button>
        ) : (
          <Button variant="warning" onClick={handleDetailClick}>Detail</Button>
        )} */}
        <Button variant="warning" onClick={handleDetailClick}>Detail</Button>
      </td>
    </tr>
  );
};
export default HistoryRow;
