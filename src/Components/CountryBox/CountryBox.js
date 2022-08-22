import React from "react";
import "./CountryBox.scss";
import { Link } from "react-router-dom";

function CountryBox({ country }) {
  return (
    <div className="CountryBox">
      <div className="CountryBox__img-container">
        <img src={country.flags.png} />
      </div>
      <div className="CountryBox__about-container">
        <h3>
          <Link to={`/country/${country.name.common}`}>
            {country.name.official}
          </Link>
        </h3>
        <p>
          Population: <span>{country.population.toLocaleString("en-US")}</span>
        </p>
        <p>
          Region: <span>{country.region}</span>
        </p>
        <p>
          Capital: <span>{country.capital}</span>
        </p>
      </div>
    </div>
  );
}

export default CountryBox;