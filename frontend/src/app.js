import "./styles/base.css";
import AppRoutes from "./routes";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./components/Navigation bar/Navbar.css";
import Navbar from "./components/Navigation bar/Navbar";
import Reports from "./components/Navigation bar/Reports";
const App = () => {
  return (
    <>
      <Router>
        <Navbar />
        <h1 className="title"> Detail</h1>
        <Switch>
          <Route path="/" exact component={AppRoutes} />
          <Route path="/reports" component={Reports} />
        </Switch>
      </Router>
    </>
  );
};

export default App;
