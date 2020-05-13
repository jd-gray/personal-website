import React, { ReactElement } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub, faStackOverflow } from "@fortawesome/free-brands-svg-icons";

const Section = (): ReactElement => {
  return (
    <section className="hero is-fullheight is-dark is-bold">
      <div className="hero-body">
        <div className="container has-text-centered">
          <h1 className="title is-2">Hello I'm Jared Gray</h1>
          <h2 className="subtitle">Software Engineer</h2>
          <div className="subtitle is-3">
            <a
              href="https://stackoverflow.com/users/4735914/jdgray"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FontAwesomeIcon icon={faStackOverflow} />
            </a>{" "}
            <a
              href="https://github.com/jd-gray"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FontAwesomeIcon icon={faGithub} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Section;
