import React, { useState, useEffect } from "react";
import Header from "../common/header";
import Footer from "../common/footer";
import Table from "react-bootstrap/Table";
import "./warning.css";
const warnings = [
  {
    containerName: "Container so 1",
    title: "Nhiệt độ không ổn định",
    detail: "Nhiệt độ cảm biến trước và cảm biến sau chênh lệch bất thường",
    time: "12:00 12/12/2021 - 17:00 12/12/2021",
    reasons: [
      "Các thùng hàng xáp sắp xếp chưa tối ưu",
      "Thùng container bị rò rỉ không khí",
      "Hệ thống quạt gió bị lỗi",
    ],
  },
  {
    containerName: "Container so 2",
    title: "Nhiệt độ tăng bất thường",
    detail: "Nhiệt độ tất cả cảm biến đều tăng",
    time: "7:00 11/12/2021 - 14:00 11/12/2021",
    reasons: [
      "Thùng container bị rỏ rỉ không khí",
      "Hệ thống làm lạnh có vấn đề",
    ],
  },
];
const Warning = () => {
  return (
    <div className="main-content content">
      <Header label={"Warning"} />
      <div>
        {warnings.map((e) => (
          <WarningTag {...e}></WarningTag>
        ))}
      </div>
      <Footer />
    </div>
  );
};
const WarningTag = ({ time, title, containerName, reasons, detail }) => {
  return (
    <div className="warning-tag">
      <h3>{containerName}</h3>
      <h4>{title}</h4>
      <h5>{detail}</h5>
      <span>Thời gian: {time}</span>
      <p>
        <b>Nguyên nhân:</b>
      </p>
      <ul>
        {reasons.map((e) => (
          <li>{e}</li>
        ))}
      </ul>
    </div>
  );
};
export default Warning;
