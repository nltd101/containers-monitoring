import "./styles/base.css";
import React from "react" ;
import AppRoutes from "./routes";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./components/Navigation bar/Navbar";
import History from "./components/history-page";
import Container from "./components/container-page";
const App = () => {
  return (
    <Router>
      <Navbar />
        <Switch>
          <Route path="/" exact component={AppRoutes} />
          <Route path="/containers" exact component={Container} />
          <Route path="/historys" exact component={History} />
        </Switch>
    </Router>
  );
};

export default App;
