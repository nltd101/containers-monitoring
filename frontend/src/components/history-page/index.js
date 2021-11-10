import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

import { useForm } from "react-hook-form";
import { Redirect } from "react-router-dom";

import Header from "../common/header";
import Footer from "../common/footer";
// import Input from "components/common/inputs/input";
// import Button from "components/common/buttons/button";

import "./container.css";
import { FRONT_PAGE_PATH } from "../../constants/paths";
import Button from "react-bootstrap/Button";
import ContainerRow from "../common/container-row";
// const Login = ({
//   isLoggedIn,
//   isLoginFailed,
//   performLogin,
//   previousLocation,
// }) => {
//   const { register, handleSubmit } = useForm();

//   if (isLoggedIn) {
//     return <Redirect to={previousLocation || FRONT_PAGE_PATH} />;
//   }

//   const onSubmit = (data) => {
//     performLogin(data);
//   };

//   return (
//     <>
//       <Header />
//       <div className="login-page">
//         <div className="content-container">
//           <form className="login-form" onSubmit={handleSubmit(onSubmit)}>
//             <Input
//               iconSrc={EmailSVG}
//               placeholder="username"
//               type="text"
//               name="username"
//               ref={register}
//               className={cx("email-input", { error: isLoginFailed })}
//             />
//             <Input
//               iconSrc={LockSVG}
//               placeholder="password"
//               type="password"
//               name="password"
//               ref={register}
//               className={cx("password-input", { error: isLoginFailed })}
//             />
//             <Button type="submit">Sign in</Button>
//             {isLoginFailed && (
//               <div className="error-message">
//                 Password/email combination aren’t recognized
//               </div>
//             )}
//           </form>
//         </div>
//       </div>
//       <Footer />
//     </>
//   );
// };

// Login.propTypes = {
//   isLoggedIn: PropTypes.bool,
//   isLoginFailed: PropTypes.bool,
//   performLogin: PropTypes.func,
//   previousLocation: PropTypes.object,
// };

// Login.defaultProps = {
//   isLoggedIn: false,
//   isLoginFailed: false,
//   performLogin: noop,
// };

// export default Login;
import axios from "axios";
import Table from "../common/table";
const labels= ["ID","Name","Custumer's Name","Arrival day","Priority"]  
const Container = () => {
  const [data, setData] = useState([]);
  const [showNew, setShowNew] = useState(false);
  console.log("render");
  useEffect(() => {
    axios 
      .get("/api/v1/order")
      .then((res) => {
        return res.data;
      })
      .then((res) => {
        setData(res.data);
      });
  }, []);
  const handleClose = () => {
    setShowNew(false);
  };

  return (
    <div className="main-content">
      <Header label={"History"} />
      <div className="container-main">
      <Table page={"history"} setShowNew={setShowNew} labels={labels}>{data}</Table>
      </div>
      <Footer />
    </div>
  );
};
export default Container;
