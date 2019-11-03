import React, { ReactElement } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Section = (): ReactElement => {
  return (
    <div>
      <header>
        <h2>Hello I'm Jared Gray</h2>
        <FontAwesomeIcon icon="stack-overflow" />
        <FontAwesomeIcon icon="apple" />
      </header>
    </div>
  );
};

export default Section;
