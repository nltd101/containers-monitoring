import React from "react";
import "./sensor.css";
import { covertValue } from "../../../ultils/covert.value.ultils";
const FactorTag = ({ humidity, temperature, co2, vibration }) => {
  return (
    <div className="sensor-container">
      <div>
        <p> {`Nhiệt độ: ${covertValue(temperature, "temperature")}`}</p>
        <p> {`Độ ẩm: ${covertValue(humidity, "humidity")}`}</p>
      </div>
      <div>
        <p> {`CO2: ${covertValue(co2, "co2")}`}</p>
        <p> {`Rung lắc: ${covertValue(vibration, "vibration")}`}</p>
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
