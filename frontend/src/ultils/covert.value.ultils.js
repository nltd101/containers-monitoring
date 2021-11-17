const factorUnit = {
  temperature: "°C",
  humidity: "%",
  co2: "ppm",
  vibration: "cm/s",
};
const covertValue = (value, factorType) => {
  value = Math.round(value * 1000) / 1000;
  return value + " " + factorUnit[factorType];
};
export { covertValue };
