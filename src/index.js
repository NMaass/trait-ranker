import React from "react";
import ReactDOM from "react-dom";

import AppWrapper from "./components/App";
import ErrorBoundary from "./components/ErrorBoundary";

ReactDOM.render(
  <ErrorBoundary>
    <AppWrapper />
  </ErrorBoundary>,
  document.querySelector("#root")
);
