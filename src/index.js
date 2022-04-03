import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "antd/dist/antd.css"; // or 'antd/dist/antd.less'
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js"; // bundle include bootstrap js & popper js
import ProvideAuth from "./Context/authContext";
import {BrowserRouter as Router} from "react-router-dom";
import LanguageProvider from "./Context/languageContext";

import {QueryClient, QueryClientProvider} from "react-query";

// import * as Sentry from "@sentry/react";
// import {Integrations} from "@sentry/tracing";

// Sentry.init({
//   dsn: "https://47104b0b3f8843ceb54bab0a97bc75c7@o927988.ingest.sentry.io/6098256",
//   integrations: [new Integrations.BrowserTracing()],

// Set tracesSampleRate to 1.0 to capture 100%
// of transactions for performance monitoring.
// We recommend adjusting this value in production
//   tracesSampleRate: 1.0,
// });
// Create a client
const queryClient = new QueryClient();

ReactDOM.render(
  <Router>
    <ProvideAuth>
      <QueryClientProvider client={queryClient}>
        <LanguageProvider>
          <App />
        </LanguageProvider>
      </QueryClientProvider>
    </ProvideAuth>
  </Router>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
