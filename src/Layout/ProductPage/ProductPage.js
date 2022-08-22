import React, { useState, useEffect } from "react";
import "./ProductPage.scss";
import { useParams, useNavigate } from "react-router-dom";
import arrow from "../../images/arrow-back-outline.svg";

function ProductPage({ allCountries }) {
  const [currentItem, setCurrentItem] = useState([]);
  const [currentLanguages, setCurrentLanguages] = useState([]);
  const navigate = useNavigate();
  let { name } = useParams();
  const url = "https://restcountries.com/v3.1/all";
  useEffect(() => {
    if (allCountries.length === 0) {
      fetch(url)
        .then((response) => response.json())
        .then((res) => {
          let country = res.filter((country) => country.name.common === name);

          for (const [key, value] of Object.entries(country[0].languages)) {
            setCurrentLanguages((prevValue) => [...prevValue, value]);
          }
          setCurrentItem(country);
        });
    } else {
      let country = allCountries.filter(
        (country) => country.name.common === name
      );
      for (const [key, value] of Object.entries(country[0].languages)) {
        setCurrentLanguages((prevValue) => [...prevValue, value]);
      }
      setCurrentItem(country);
    }
  }, []);

  return (
    <div className="ProductPage">
      <div
        className="ProductPage__button"
        onClick={() => {
          navigate(-1);
        }}
      >
        <div className="ProductPage__button-img-container">
          <img src={arrow} alt="" />
        </div>
        Back
      </div>
      <div className="ProductPage__container">
        <div className="ProductPage__img-container">
          <img src={currentItem[0]?.flags.png} />
        </div>
        <div className="ProductPage__about-container">
          <h2>{currentItem[0]?.name.common}</h2>
          <div className="ProductPage__about">
            <div className="ProductPage__about-left">
              <p>
                Native Name:{" "}
                <span>
                  {
                    currentItem[0]?.name.nativeName[
                      `${Object.keys(currentItem[0]?.name.nativeName)[0]}`
                    ].common
                  }
                </span>
              </p>
              <p>
                Population:{" "}
                <span>
                  {currentItem[0]?.population.toLocaleString("en-US")}
                </span>
              </p>
              <p>
                Region: <span>{currentItem[0]?.region}</span>
              </p>
              <p>
                Sub Region: <span>{currentItem[0]?.subregion}</span>
              </p>
              <p>
                Capital: <span>{currentItem[0]?.capital[0]}</span>
              </p>
            </div>
            <div className="ProductPage__about-right">
              <p>
                Top Level Domain: <span>{currentItem[0]?.tld[0]}</span>
              </p>
              <p>
                Currencies:{" "}
                <span>
                  {
                    currentItem[0]?.currencies[
                      `${Object.keys(currentItem[0]?.currencies)[0]}`
                    ].name
                  }
                </span>
              </p>
              <p>
                Languages: <span>{currentLanguages.join(", ")}</span>
              </p>
            </div>
          </div>
          <div className="ProductPage__border">
            Border Countries:{" "}
            <div className="ProductPage__border-container">
              {currentItem[0]?.borders.map((item) => (
                <div className="ProductPage__border-item">
                  <p>{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductPage;
