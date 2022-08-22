import React, { useState, useEffect, useRef } from "react";
import "./HomePage.scss";
import moonFilled from "../../images/moon.svg";
import moon from "../../images/moon-outline.svg";
import { CountryBox } from "../../Components";

function HomePage({ theme, setTheme }) {
  const url = "https://restcountries.com/v3.1/all";
  const [region, setRegion] = useState("Filter by region");
  const [allCountries, setAllCountries] = useState([]);
  const [sortedCountries, setSortedCountries] = useState([]);
  const [searchCountries, setSearchCountries] = useState([]);
  const inputEl = useRef(null);

  useEffect(() => {
    fetch(url)
      .then((response) => response.json())
      .then((res) => {
        console.log(res);
        setAllCountries(res);
        setSortedCountries(res);
        setSearchCountries(res);
      });
  }, []);

  function handleChangeRegion(region1) {
    let newRegion;
    if (region1 === "All") {
      newRegion = allCountries;
    } else {
      newRegion = allCountries.filter((item) => item.region === region1);
    }
    setSortedCountries(newRegion);
    if (region1 !== region) {
      setSearchCountries(newRegion);
    }
    setRegion(region1);
  }

  useEffect(() => {
    handleInputChange();
  }, [region]);

  function handleInputChange() {
    const newRegion = sortedCountries.filter((country) =>
      country.name.official.toLowerCase().includes(inputEl.current.value)
    );
    setSearchCountries(newRegion);
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
          <input
            onChange={() => handleInputChange()}
            ref={inputEl}
            type="text"
            placeholder="Search for a country..."
          />
        </div>
        <div className="HomePage__select-region">
          <div className="HomePage__options-container">
            <div className="HomePage__option">{region}</div>
            <div
              className="HomePage__option"
              onClick={() => handleChangeRegion("All")}
            >
              All
            </div>
            <div
              className="HomePage__option"
              onClick={() => handleChangeRegion("Africa")}
            >
              Africa
            </div>
            <div
              className="HomePage__option"
              onClick={() => handleChangeRegion("Americas")}
            >
              Americas
            </div>
            <div
              className="HomePage__option"
              onClick={() => handleChangeRegion("Asia")}
            >
              Asia
            </div>
            <div
              className="HomePage__option"
              onClick={() => handleChangeRegion("Europe")}
            >
              Europe
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
      <div className="HomePage__countries">
        {searchCountries.map((country, index) => (
          <CountryBox key={index} country={country} />
        ))}
      </div>
    </div>
  );
}

export default HomePage;
