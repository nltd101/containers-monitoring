import React, { useState, useEffect } from "react";
import ContainerRow from "../container-row";

// import Input from "components/common/inputs/input";
// import Button from "components/common/buttons/button";

import "./table.css";



const Table = (props) => {

    let data = props.children
    console.log(data)
  return (
    <>
      <table className="container-table">
        <tr>
            {props.labels.map((e) => <th>{e}</th>)} 
        </tr>
         {data.map((e) => (
          <ContainerRow container={e} setShowNew={ props.setShowNew} />
        ))} 
      </table>
    </>
  );
};
export default Table;
