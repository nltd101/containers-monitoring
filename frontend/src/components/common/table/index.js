import React, { useState, useEffect } from "react";
import ContainerRow from "../container-row";
import HistoryRow from "../history-row";
// import Input from "components/common/inputs/input";
// import Button from "components/common/buttons/button";

import "./table.css";

const Table = (props) => {
  let data = props.children;
  console.log(data);
  return (
    <>
      <table className="container-table">
        <tr>
          {props.labels.map((e) => (
            <th>{e}</th>
          ))}
        </tr>
        {data.map((e) =>
          props.page == "container" ? (
            <ContainerRow
              key={e.id}
              container={e}
              setShowNew={props.setShowNew}
            />
          ) : (
            <HistoryRow container={e} key={e.id} />
          )
        )}
      </table>
    </>
  );
};
export default Table;
