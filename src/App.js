import React, { useState, useEffect } from "react";
import "./App.scss";
import { HomePage, ProductPage } from "./Layout";
import { Nav } from "./Components";
import { Routes, Route } from "react-router-dom";

function App() {
  const [theme, setTheme] = useState(false);
  const [allCountries, setAllCountries] = useState([]);
  const [sortedCountries, setSortedCountries] = useState([]);
  const [searchCountries, setSearchCountries] = useState([]);
  const url = "https://restcountries.com/v3.1/all";

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
  return (
    <div className={!theme ? "App" : "App App--light"}>
      <Nav theme={theme} setTheme={setTheme} />
      <Routes>
        <Route
          path="/"
          element={
            <HomePage
              allCountries={allCountries}
              sortedCountries={sortedCountries}
              setSortedCountries={setSortedCountries}
              searchCountries={searchCountries}
              setSearchCountries={setSearchCountries}
            />
          }
        />
        <Route
          path="/country/:name"
          element={<ProductPage allCountries={allCountries} />}
        />
      </Routes>
    </div>
  );
}

export default App;
