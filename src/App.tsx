import React, { ReactElement } from "react";
import Section from "./Section";
import ReactGA from "react-ga";

import "./Styles.scss";

ReactGA.initialize("UA-60775504-1");
ReactGA.pageview(window.location.pathname + window.location.search);

const App = (): ReactElement => {
  return <Section />;
};

export default App;
