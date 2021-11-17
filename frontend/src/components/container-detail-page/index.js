import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

import { useForm } from "react-hook-form";
import { Redirect } from "react-router-dom";

import Header from "../common/header";
import Footer from "../common/footer";
import axios from "axios";
import { DotsItem, useTheme } from "@nivo/core";
import { FRONT_PAGE_PATH } from "../../constants/paths";
import Button from "react-bootstrap/Button";
import { ResponsiveLine } from "@nivo/line";
import SensorArea from "./sensor";
import FactorArea from "./factor";
import "./container-detail-page.css";
// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
// website examples showcase many properties,
// you'll often use just a few of them.
const MyResponsiveLine = ({ data /* see data tab */ }) => (
  <ResponsiveLine
    data={data}
    margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
    xScale={{ type: "point" }}
    yScale={{
      type: "linear",
      min: "auto",
      max: "auto",
      stacked: true,
      reverse: false,
    }}
    yFormat=" >-.2f"
    axisTop={null}
    axisRight={null}
    axisBottom={{
      format: function (value) {
        return value % 100 == 0 ? value : null; // Date.parse(value).getHour();
      },
      orient: "bottom",
      tickSize: 5,
      tickPadding: 5,
      tickRotation: 0,
      legend: "transportation",
      legendOffset: 36,
      legendPosition: "middle",
    }}
    axisLeft={{
      orient: "left",
      tickSize: 5,
      tickPadding: 5,
      tickRotation: 0,
      legend: "count",
      legendOffset: -40,
      legendPosition: "middle",
    }}
    pointSize={5}
    pointColor={{ theme: "background" }}
    pointBorderWidth={2}
    pointBorderColor={{ from: "serieColor" }}
    pointLabelYOffset={-12}
    useMesh={true}
    legends={[
      {
        anchor: "bottom-right",
        direction: "column",
        justify: false,
        translateX: 100,
        translateY: 0,
        itemsSpacing: 0,
        itemDirection: "left-to-right",
        itemWidth: 80,
        itemHeight: 20,
        itemOpacity: 0.75,
        symbolSize: 12,
        symbolShape: "circle",
        symbolBorderColor: "rgba(0, 0, 0, .5)",
        effects: [
          {
            on: "hover",
            style: {
              itemBackground: "rgba(0, 0, 0, .03)",
              itemOpacity: 1,
            },
          },
        ],
      },
    ]}
  />
);
const StatisticTag = (props) => {
  return (
    <div className="statistic-tag">
      <h5>{props.label}</h5>
      <p>{Math.round(props.value * 1000) / 1000}</p>
    </div>
  );
};
const ContainerDetail = (props) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get("/api/v1/order", { params: { order_id: props.match.params.id } })
      .then((res) => {
        return res.data;
      })
      .then((res) => {
        setData(res.data);
        console.log(data);
      });
  }, []);
  console.log(props.match.params.id);

  function getDataFormat(factor) {
    let step = Math.floor(data.length / 20);
    let meanArray = [];
    for (let i = 0; i < data.length; i += step) {
      let sum = 0;
      for (let j = 0; j < step; j++) {
        if (j + i < data.length && data[i + j].data[factor])
          sum += data[i + j].data[factor].mean;
      }
      console.log(sum, step);
      meanArray.push({ x: i, y: sum / step, low: 75.4, high: 78.4 });
    }
    let result = [
      {
        id: "mean",
        data: meanArray,
        color: "hsl(351, 70%, 50%)",
      },
    ];

    return result;
  }
  let scene = [1, 2, 3, 4];

  const factors = [
    { id: "temperature", label: "Nhiệt độ" },
    { id: "co2", label: "CO2" },
    { id: "humidity", label: "Độ ẩm" },
    { id: "vibration", label: "Rung lắc" },
  ];
  const statistic = [
    { id: "max", label: "Max" },
    { id: "min", label: "Min" },
    { id: "mean", label: "Mean" },
    { id: "variance", label: "Variacne" },
  ];
  const [indexArea, setIndexArea] = useState(1);
  const [factor, setFactor] = useState("co2");
  return (
    <div className="content">
      <Header />
      <div className="area-container">
        {data.length != 0
          ? scene.map((e) =>
              e == indexArea ? (
                <div
                  className="chosen"
                  onClick={() => {
                    setIndexArea(e);
                  }}
                >
                  <SensorArea data={data} />
                </div>
              ) : (
                <div
                  onClick={() => {
                    setIndexArea(e);
                  }}
                >
                  <SensorArea data={data} />
                </div>
              )
            )
          : null}
      </div>
      <div className="factor-container">
        {data.length != 0 &&
          factors.map((e) => (
            <div
              onClick={() => setFactor(e.id)}
              className={e.id == factor ? "chosen-factor" : ""}
            >
              <FactorArea data={data} factor={e.id} label={e.label} />
            </div>
          ))}
      </div>
      <div className="graph-container">
        <div className="graph">
          <MyResponsiveLine data={getDataFormat(factor)} />
        </div>
        <div className="graph-statistic">
          {data.length != 0 &&
            statistic.map((e) => (
              <StatisticTag
                label={e.label}
                value={data[data.length - 1].data[factor][e.id]}
              />
            ))}
        </div>
      </div>
    </div>
  );
};
export default ContainerDetail;
