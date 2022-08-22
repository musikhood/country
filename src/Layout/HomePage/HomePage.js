import React, { useState, useEffect, useRef } from "react";
import "./HomePage.scss";
import { CountryBox } from "../../Components";

function HomePage({
  allCountries,
  sortedCountries,
  setSortedCountries,
  searchCountries,
  setSearchCountries,
}) {
  const [region, setRegion] = useState("Filter by region");

  const inputEl = useRef(null);

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
      country.name.official
        .toLowerCase()
        .includes(inputEl.current.value.toLowerCase())
    );
    setSearchCountries(newRegion);
  }

  return (
    <div className="HomePage">
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
