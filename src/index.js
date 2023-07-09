import '../assets/styles/common/index.scss';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './app';
import { BrowserRouter } from 'react-router-dom';

const data =  JSON.parse(document?.getElementById('__NEXT_DATA__')?.textContent)?.serverData || "TEST CSR"
console.log(data, "APP-CLIENT")
ReactDOM.hydrate(
  <BrowserRouter>
  <App serverData={data} />
  </BrowserRouter>,
  document.getElementById('app')
);