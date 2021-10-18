import "./styles/base.css";
import AppRoutes from "./routes";
import { BrowserRouter as Router } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
const App = () => {
  return (
    <Router>
      <AppRoutes />
    </Router>
  );
};

export default App;
