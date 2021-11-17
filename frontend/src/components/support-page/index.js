import React, { useState, useEffect } from "react";
import Header from "../common/header";
import Footer from "../common/footer";
import Table from "react-bootstrap/Table";
import "./Support.css";
const Support = () => {
  return (
    <div className="main-content content">
      <Header label={"Support"} />
      <div>
        <Table class="center">
          <thead>
            <tr>
              <th>#</th>
              <th>Họ tên</th>
              <th>Đảm nhiệm</th>
              <th>Số điện thoại</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>Nguyễn Lê Trọng Đạt</td>
              <td>xxx</td>
              <td>0326637150</td>
            </tr>
            <tr>
              <td>2</td>
              <td>Lê Việt Hoàng</td>
              <td>xxx</td>
              <td>0333078334</td>
            </tr>
            <tr>
              <td>3</td>
              <td>Nguyễn Văn Minh</td>
              <td>xxx</td>
              <td>0964588522</td>
            </tr>
            <tr>
              <td>4</td>
              <td>Đào Trung Hiếu</td>
              <td>Lắp đặt phần cứng</td>
              <td>0966903716</td>
            </tr>
          </tbody>
        </Table>
      </div>
      <Footer />
    </div>
  );
};
export default Support;
