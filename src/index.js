import React from "react";
import ReactDom from "react-dom/client";
import App from "./App";
import "./index.scss";
import { HashRouter } from "react-router-dom";

const root = ReactDom.createRoot(document.getElementById("root"));

root.render(
  <HashRouter>
    <App />
  </HashRouter>
);
