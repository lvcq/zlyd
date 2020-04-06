import React from "react";
import ReactDOM from "react-dom";
import "./index.scss";
import RouterComp from "./router";
import * as serviceWorker from "./serviceWorker";
import { zlydStore, history } from "./store";

ReactDOM.render(
  <RouterComp store={zlydStore} history={history} />,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
