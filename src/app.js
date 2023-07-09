import React, { PureComponent } from 'react';
import {   Router,
  Routes, Route } from "react-router-dom";
import PropTypes from 'prop-types';
import routes from './routes';
import Home from './pages/home/component';

class App extends PureComponent {
  static propTypes = {
    serverData: PropTypes.any,
  };

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
        <>
          {routes.map(({ path, fetchInitialData, component: C }) => (
            <Route
              key={path}
              path={path}>
              
              <Home data={this.props.serverData} fetchInitialData={fetchInitialData} />
              </Route>
          ))}
          </>
    );
  }
}

export default App;
