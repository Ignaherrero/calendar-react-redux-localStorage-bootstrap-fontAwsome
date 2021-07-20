import React from "react";
import ReactDOM from "react-dom";
import { AppRoutes } from "./routers/AppRoutes";
import "./styles.css";

ReactDOM.render(
  <React.StrictMode>
    <AppRoutes />
  </React.StrictMode>,
  document.getElementById("root")
);
