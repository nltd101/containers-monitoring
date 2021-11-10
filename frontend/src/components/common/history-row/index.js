import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Button from "react-bootstrap/Button";
const HistoryRow = (props) => {
  let container = props.container;
  console.log(props);
  const history = useHistory();

  const handleDetailClick = () => {
    history.push('/detail')
  }

  return (
    <tr>
      <td>{container.id}</td>
      <td>{container.name}</td>
      <td>{container.route}</td>
      <td>{container.last_update}</td>
      <td>
        {/* {container.free ? (
          <Button variant="success" onClick={() => props.setShowNew(true)}>
            New
          </Button>
        ) : (
          <Button variant="warning" onClick={handleDetailClick}>Detail</Button>
        )} */}
      </td>
    </tr>
  );
};
export default HistoryRow;
