import React from "react";
import "./factor.css";

const FactorArea = ({ data, factor, label }) => {
  return (
    <div>
      <h5>{label}</h5>
      <p className="value">
        {Math.round(data[data.length - 1].data[factor].mean * 1000) / 1000}
      </p>
    </div>
  );
};
export default FactorArea;
