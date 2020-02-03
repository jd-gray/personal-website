import React, { ReactElement } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub, faStackOverflow } from "@fortawesome/free-brands-svg-icons";

const stravaLinkStyles = {
  display: "inline-block",
  backgroundColor: "#FC5200",
  color: "#fff",
  padding: "5px 10px 5px 30px",
  fontSize: "11px",
  fontFamily: "Helvetica, Arial, sans-serif",
  textDecoration: "none",
  backgroundRepeat: "no-repeat",
  backgroundPosition: "10px center",
  borderRadius: "3px",
  backgroundImage: "url('http://badges.strava.com/logo-strava-echelon.png')"
};

const stravaImgStyles = {
  marginLeft: "2px",
  verticalAlign: "text-bottom"
};

const Section = (): ReactElement => {
  return (
    <section className="hero is-fullheight is-dark is-bold">
      <div className="hero-body">
        <div className="container has-text-centered">
          <h1 className="title is-2">Hello I'm Jared Gray</h1>
          <h2 className="subtitle">Software Engineer + Hobbyist Triathlete</h2>
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
          <div>
            <a
              style={stravaLinkStyles}
              href="https://strava.com/athletes/jaredgray"
              target="_clean"
            >
              Follow me on
              <img
                src="http://badges.strava.com/logo-strava.png"
                alt="Strava"
                style={stravaImgStyles}
                height={13}
                width={51}
              />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Section;
