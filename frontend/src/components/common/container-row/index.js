import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Button from "react-bootstrap/Button";
import { covertDatetime } from "../../../utils/time.utils";
const ContainerRow = (props) => {
  let container = props.container;
  console.log(props);
  const history = useHistory();

  const handleDetailClick = () => {
    history.push("/order/" + container.order_id);
  };

  return (
    <tr>
      <td>{container.id}</td>
      <td>{container.name}</td>
      <td>{covertDatetime(container.start_time)}</td>
      <td>{covertDatetime(container.last_update)}</td>
      <td>
        {container.free ? (
          <Button
            variant="success"
            onClick={() => props.setShowNew(container.id)}
          >
            New
          </Button>
        ) : (
          <Button variant="warning" onClick={handleDetailClick}>
            Detail
          </Button>
        )}
      </td>
    </tr>
  );
};
export default ContainerRow;
