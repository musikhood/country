import React from "react";
import "./CountryBox.scss";
import { Link } from "react-router-dom";

function CountryBox({ country }) {
  return (
    <div className="CountryBox">
      <div className="CountryBox__img-container">
        <Link
          to={`/country/${
            country.cca2 || country.cioc || country.cca3 || country.ccn3
          }`}
        >
          <img src={country.flags.png} alt="" />
        </Link>
      </div>
      <div className="CountryBox__about-container">
        <Link
          to={`/country/${
            country.cca2 || country.cioc || country.cca3 || country.ccn3
          }`}
        >
          {country.name.official}
        </Link>

        <p>
          Population: <span>{country.population.toLocaleString("en-US")}</span>
        </p>
        <p>
          Region: <span>{country.region}</span>
        </p>
        <p>
          Capital: <span>{country.capital ? country.capital : "none"}</span>
        </p>
      </div>
    </div>
  );
}

export default CountryBox;
