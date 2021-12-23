import * as React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Routes, Route } from 'react-router';
import { routes } from './pages/router';
import Loading from './components/loading';
import './assets/styles/reset.css';
import ErrorBoundary from './components/errorboundary';

const rootElement = document.getElementById('root');

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <React.Suspense fallback={<Loading />}>
        <ErrorBoundary>
          <Routes>
            {routes.map((val, key) => (
              <Route {...val} key={`route_${key}`} />
            ))}
          </Routes>
        </ErrorBoundary>
      </React.Suspense>
    </BrowserRouter>
  </React.StrictMode>,
  rootElement,
);
