import '../assets/styles/common/index.scss';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './app';
import { BrowserRouter } from 'react-router-dom';

const data = typeof window !== "undefined" && JSON.parse(document?.getElementById('__PUNK_DATA__')?.textContent)?.serverData || "TEST CSR"
console.log(data, "APP-CLIENT")
ReactDOM.render(
  <BrowserRouter>
  <App serverData={data} />
  </BrowserRouter>,
  document.getElementById('app')
);