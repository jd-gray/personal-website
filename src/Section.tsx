import React, { ReactElement } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub, faStackOverflow } from "@fortawesome/free-brands-svg-icons";

const Section = (): ReactElement => {
  return (
    <div>
      <header>
        <h2>Hello I'm Jared Gray</h2>
        <FontAwesomeIcon icon={faStackOverflow} />
        <FontAwesomeIcon icon={faGithub} />
      </header>
    </div>
  );
};

export default Section;
