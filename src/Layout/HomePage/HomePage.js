import React, { useState, useEffect } from "react";
import "./HomePage.scss";
import moonFilled from "../../images/moon.svg";
import moon from "../../images/moon-outline.svg";

function HomePage({ theme, setTheme }) {
  const url = "https://restcountries.com/v3.1/all";
  const [region, setRegion] = useState("Filter by region");
  useEffect(() => {
    fetch(url)
      .then((response) => response.json())
      .then((res) => {
        console.log(res);
      });
  }, []);

  function handleChangeRegion(region) {
    setRegion(region);
  }

  return (
    <div className="HomePage">
      <div className="HomePage__nav">
        <h1>Where in the world?</h1>
        <div
          className="HomePage__darkMode"
          onClick={() => {
            setTheme((prevValue) => !prevValue);
          }}
        >
          <div className="HomePage__img-container">
            <img src={theme ? moon : moonFilled} alt="" />
          </div>
          Dark Mode
        </div>
      </div>
      <div className="HomePage__searchBar">
        <div className="HomePage__input-container">
          <input type="text" placeholder="Search for a country..." />
        </div>
        <div className="HomePage__select-region">
          <div className="HomePage__options-container">
            <div className="HomePage__option">{region}</div>
            <div
              className="HomePage__option"
              onClick={() => handleChangeRegion("Africa")}
            >
              Africa
            </div>
            <div
              className="HomePage__option"
              onClick={() => handleChangeRegion("America")}
            >
              America
            </div>
            <div
              className="HomePage__option"
              onClick={() => handleChangeRegion("Asia")}
            >
              Asia
            </div>
            <div
              className="HomePage__option"
              onClick={() => handleChangeRegion("Europa")}
            >
              Europa
            </div>
            <div
              className="HomePage__option"
              onClick={() => handleChangeRegion("Oceania")}
            >
              Oceania
            </div>
          </div>
        </div>
      </div>
      <div className="HomePage__countries"></div>
    </div>
  );
}

export default HomePage;
