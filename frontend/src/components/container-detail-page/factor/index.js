import React from "react";
import "./factor.css";
import { covertValue } from "../../../utils/covert.value.utils";
const FactorArea = ({ data, factor, label }) => {
  return (
    <div>
      <h5>{label}</h5>
      <p className="value">
        {covertValue(data[data.length - 1].data[factor].mean, factor)}
      </p>
    </div>
  );
};
export default FactorArea;
