import React from 'react';
import ReactDOM from 'react-dom';
import './app/layout/index.css';
import App from './app/layout/App';
import reportWebVitals from './reportWebVitals';
import {store, StoreContext} from "./app/stores/store";
import {BrowserRouter} from "./features/components/Routes/BrowserRouter";
import {history} from "./app/helpers";

ReactDOM.render(
  <StoreContext.Provider value={store}>
      <BrowserRouter history={history}>
          <App />
      </BrowserRouter>
  </StoreContext.Provider>
    ,
  document.getElementById('root')
);

reportWebVitals();
