import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { store } from "./store.js"; // Import the store
import { Provider } from "react-redux"; // Import the Provider from react-redux

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      {" "}
      {/* Wrap App component with Provider and pass the store */}
      <App />
    </Provider>
  </React.StrictMode>
);

reportWebVitals();
