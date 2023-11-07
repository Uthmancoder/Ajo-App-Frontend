import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { Provider } from "react-redux";
import { Store, persistor } from "./Redux/ReduxStore"; // Import the persistor
import { PersistGate } from "redux-persist/integration/react"; // Import PersistGate

ReactDOM.render(
  <Provider store={Store}>
    <PersistGate persistor={persistor} loading={null}>
      <React.StrictMode>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </React.StrictMode>
    </PersistGate>
  </Provider>,
  document.getElementById("root")
);

reportWebVitals();
