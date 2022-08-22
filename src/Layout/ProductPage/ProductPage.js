import React, { useState, useEffect } from "react";
import "./ProductPage.scss";
import { useParams, useNavigate, Link } from "react-router-dom";
import arrow from "../../images/arrow-back-outline.svg";
import Loader from "../../images/Loader.svg";

function ProductPage({ allCountries }) {
  const [currentItem, setCurrentItem] = useState([]);
  const [currentLanguages, setCurrentLanguages] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const navigate = useNavigate();
  let { name } = useParams();
  const url = "https://restcountries.com/v3.1/all";
  useEffect(() => {
    load();
  }, []);
  useEffect(() => {
    load();
  }, [name]);

  function load() {
    setCurrentLanguages([]);
    if (allCountries.length === 0) {
      fetch(url)
        .then((response) => response.json())
        .then((res) => {
          let country = res.filter(
            (country) =>
              country?.cca2 === name ||
              country?.cioc === name ||
              country?.cca3 === name ||
              country?.ccn3 === name
          );
          if (country[0]?.languages) {
            for (const [key, value] of Object.entries(country[0]?.languages)) {
              setCurrentLanguages((prevValue) => [...prevValue, value]);
            }
          } else {
            setCurrentLanguages("none");
          }
          setLoaded(true);
          setCurrentItem(country);
        });
    } else {
      let country = allCountries.filter(
        (country) =>
          country?.cioc === name ||
          country?.cca2 === name ||
          country?.cca3 === name ||
          country?.ccn3 === name
      );
      if (country[0]?.languages) {
        for (const [key, value] of Object.entries(country[0]?.languages)) {
          setCurrentLanguages((prevValue) => [...prevValue, value]);
        }
      } else {
        setCurrentLanguages("none");
      }
      setLoaded(true);
      setCurrentItem(country);
    }
  }

  function findCountry(id) {
    let country = allCountries.filter(
      (country) =>
        country?.cioc === id ||
        country?.cca2 === id ||
        country?.cca3 === id ||
        country?.ccn3 === id
    );
    return country[0]?.name.common;
  }

  return (
    <div className="ProductPage">
      {loaded ? (
        <>
          <div
            className="ProductPage__button"
            onClick={() => {
              navigate("/");
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
                      {currentItem[0]?.name.nativeName
                        ? currentItem[0]?.name.nativeName[
                            `${Object.keys(currentItem[0]?.name.nativeName)[0]}`
                          ].common
                        : currentItem[0]?.name.common}
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
                    Sub Region:{" "}
                    <span>
                      {currentItem[0]?.subregion
                        ? currentItem[0]?.subregion
                        : "none"}
                    </span>
                  </p>
                  <p>
                    Capital:{" "}
                    <span>
                      {currentItem[0]?.capital
                        ? currentItem[0]?.capital[0]
                        : "none"}
                    </span>
                  </p>
                </div>
                <div className="ProductPage__about-right">
                  <p>
                    Top Level Domain: <span>{currentItem[0]?.tld[0]}</span>
                  </p>
                  <p>
                    Currencies:{" "}
                    <span>
                      {currentItem[0]?.currencies
                        ? currentItem[0]?.currencies[
                            `${Object.keys(currentItem[0]?.currencies)[0]}`
                          ].name
                        : "none"}
                    </span>
                  </p>
                  <p>
                    Languages:{" "}
                    <span>
                      {currentLanguages === "none"
                        ? "none"
                        : currentLanguages.join(", ")}
                    </span>
                  </p>
                </div>
              </div>
              <div className="ProductPage__border">
                Border Countries:{" "}
                <div className="ProductPage__border-container">
                  {currentItem[0]?.borders?.map((item) => (
                    <Link className="ProductPage__link" to={`/country/${item}`}>
                      <div className="ProductPage__border-item">
                        <p>{findCountry(item)}</p>
                      </div>
                    </Link>
                  )) || (
                    <div className="ProductPage__border-item">
                      <p>none</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="ProductPage__loading">
          <img src={Loader} />
        </div>
      )}
    </div>
  );
}

export default ProductPage;
