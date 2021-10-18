import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
const ContainerRow = (props) => {
  let container = props.container;
  console.log(props);
  return (
    <tr>
      <td>{container.id}</td>
      <td>{container.name}</td>
      <td>{container.start_time}</td>
      <td>{container.last_update}</td>
      <td>
        {container.free ? (
          <Button variant="success" onClick={() => props.setShowNew(true)}>
            New
          </Button>
        ) : (
          <Button variant="warning">Detail</Button>
        )}
      </td>
    </tr>
  );
};
export default ContainerRow;
