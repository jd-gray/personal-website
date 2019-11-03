import React from "react";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";
import Section from "./Section";

library.add(fab);

const App: React.FC = () => {
  return <Section />;
};

export default App;
