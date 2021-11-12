import * as React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Switch, Route } from 'react-router';
import { routes } from './pages/router';

import './assets/styles/reset.css';

const rootElement = document.getElementById('root');

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Switch>
        {
          routes.map((val, key) => <Route
            {...val}
            key={`route_${key}`}/>)
        }
      </Switch>
    </BrowserRouter>
  </React.StrictMode>,
  rootElement,
);
