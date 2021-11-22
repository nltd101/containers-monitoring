import React from "react";
import "./abnormal.css";
import { covertValue } from "../../../ultils/covert.value.ultils";
const Abnormal = ({ data ,factor}) => {
  return (
    <div>
    <table>
    <tr>
    <th>Time</th>
    <th>Mean</th>
    <th>Max</th>
    <th>Min</th>
    <th>Variance</th>
    </tr>

        {data.map(e=>  (<tr><th>{e.data_time}</th>
          <th>{covertValue(e.data.mean,factor)}</th>
          <th>{covertValue(e.data.max,factor)}</th>
          <th>{covertValue(e.data.min,factor)}</th>
          <th>{covertValue(e.data.variance)}</th>  </tr>))}


    </table>

    </div>
  );
};
export default Abnormal;
