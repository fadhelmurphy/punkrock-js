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

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
<BrowserRouter>
  <App serverData={data} />
</BrowserRouter>);

// if (module.hot) {
//   module.hot.accept()
// }