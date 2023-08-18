import { ToastContainer } from "react-toastify";
import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App.jsx";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "react-toastify/dist/ReactToastify.css";
import "antd/dist/reset.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import "bootstrap/dist/css/bootstrap.min.css";
import AuthContexProvider from "./context/AuthContex.jsx";

import "./index.css";
import { Provider } from "react-redux";
import { store } from "./redux/store/index.js";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthContexProvider>
      <ToastContainer />
      <Provider store={store}>
        <App />
      </Provider>
    </AuthContexProvider>
  </React.StrictMode>
);
