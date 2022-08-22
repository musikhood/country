import React, { useState } from "react";
import "./App.scss";
import { HomePage } from "./Layout";

function App() {
  const [theme, setTheme] = useState(false);
  return (
    <div className={!theme ? "App" : "App App--light"}>
      <HomePage theme={theme} setTheme={setTheme} />
    </div>
  );
}

export default App;
