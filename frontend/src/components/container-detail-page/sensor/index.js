import React from "react";
import "./sensor.css";
const FactorTag = ({ humidity, temperature, co2, vibration }) => {
  return (
    <div className="sensor-container">
      <div>
        <p> {`Nhiệt độ: ${Math.round(temperature * 1000) / 1000}`}</p>
        <p> {`Độ ẩm: ${Math.round(humidity * 1000) / 1000}`}</p>
      </div>
      <div>
        <p> {`CO2: ${Math.round(co2 * 1000) / 1000}`}</p>
        <p> {`Rung lắc: ${Math.round(vibration * 1000) / 1000}`}</p>
      </div>
    </div>
  );
};

const SensorArea = ({ data }) => {
  return (
    <FactorTag
      co2={data[data.length - 1].data.co2.mean}
      temperature={data[data.length - 1].data.temperature.mean}
      humidity={data[data.length - 1].data.humidity.mean}
      vibration={data[data.length - 1].data.vibration.mean}
    />
  );
};
export default SensorArea;
