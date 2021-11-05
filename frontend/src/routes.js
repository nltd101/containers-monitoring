import React from "react";
import { Switch, Route } from "react-router-dom";

import * as paths from "./constants/paths";
import ContainerPage from "./components/container-page";
import HistoryPage from "./components/history-page"
const AppRoutes = () => {
  return (
    <Switch>
      <Route path={paths.CONTAINER_PATH} component={ContainerPage} />
      <Route path={paths.FRONT_PAGE_PATH} component={ContainerPage} exact />
      <Route path={'/history'} component={HistoryPage} exact />
      <Route path={'/detail'} component={HistoryPage} exact />

    </Switch>
  );
};

export default AppRoutes;
