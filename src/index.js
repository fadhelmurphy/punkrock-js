import "../assets/styles/common/index.scss";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./app";
import { BrowserRouter } from "react-router-dom";

const data =
  (typeof window !== "undefined" &&
    JSON.parse(document?.getElementById("__PUNK_DATA__")?.textContent)
      ?.serverData) ||
  "TEST CSR";
console.log(data, "APP-CLIENT");

ReactDOM.hydrateRoot(document.getElementById('root'), 
<BrowserRouter>
  <App serverData={data} />
</BrowserRouter>);