import React from "react";
import "./Nav.scss";
import moonFilled from "../../images/moon.svg";
import moon from "../../images/moon-outline.svg";

function Nav({ theme, setTheme }) {
  return (
    <div className="Nav">
      <h1>Where in the world?</h1>
      <div
        className="Nav__darkMode"
        onClick={() => {
          setTheme((prevValue) => !prevValue);
        }}
      >
        <div className="Nav__img-container">
          <img src={theme ? moon : moonFilled} alt="" />
        </div>
        Dark Mode
      </div>
    </div>
  );
}

export default Nav;
