import React from "react";
import ReactDOM from "react-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Style/index.css";
import "./Style/custom.css";
import App from "./App";
import "react-toastify/dist/ReactToastify.css";
import persistStore from "redux-persist/es/persistStore";

import { BrowserRouter } from "react-router-dom";

import store from "./Store/store";
import { Provider } from "react-redux";

import { PersistGate } from "redux-persist/integration/react";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistStore(store)}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </PersistGate>
  </Provider>,
);
