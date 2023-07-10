// Imports For React
import React from "react";
import ReactDOM from "react-dom/client";
import reportWebVitals from "./reportWebVitals";
// Imports For React
// Imports For Style
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap";
import "react-toastify/dist/ReactToastify.css";
import "aos/dist/aos.css";
// Imports For Style
// Imports For Structure
import RouterController from "./RouterController/RouterController";
import { AppDataContextProvider } from "./AppData/App.Data";
import { ToastContainer } from "react-toastify";
import AppChildren from "./AppChildren";
// Imports For Structure

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <AppDataContextProvider>
    <React.StrictMode>
      <AppChildren>
        <RouterController />
        <ToastContainer autoClose={4000} />
      </AppChildren>
    </React.StrictMode>
  </AppDataContextProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
