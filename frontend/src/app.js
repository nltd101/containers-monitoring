import "./styles/base.css";
import React from "react";
import AppRoutes from "./routes";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./components/Navigation bar/Navbar";
import History from "./components/history-page";
import Container from "./components/container-page";
import ContainerDetail from "./components/container-detail-page";
import Support from "./components/support-page";
import Warning from "./components/login-page";
const App = () => {
  return (
    <Router>
      <div className="screen">
        <Navbar style={{ flex: 0.3 }} />

        <Switch>
          <Route path="/" exact component={AppRoutes} />
          <Route path="/containers" exact component={Container} />
          <Route path="/historys" exact component={History} />
          <Route path="/order/:id" exact component={ContainerDetail} />
          <Route path="/support" exact component={Support} />
          <Route path="/warning" exact component={Warning} />
        </Switch>
      </div>
    </Router>
  );
};

export default App;
