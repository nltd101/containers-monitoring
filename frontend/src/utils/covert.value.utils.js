const factorUnit = {
  temperature: "°C",
  humidity: "%",
  co2: "ppm",
  vibration: "cm/s",
};
const covertValue = (value, factorType=null) => {
  value = Math.round(value * 1000) / 1000;
  if (!factorType) return value
  return value + " " + factorUnit[factorType];
};
export { covertValue };
