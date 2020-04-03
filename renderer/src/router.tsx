import {
  HashRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import React, { Component } from "react";
import { Provider } from "react-redux";
import loadable from "@loadable/component";

interface Props {
  store: any;
}
interface RouterState {}

class RouterComp extends Component<Props, RouterState> {
  render() {
    const LoginComp = loadable(() => import("./pages/login/login"));
    const InitComp = loadable(() => import("./pages/init/init"));
    const HomePage = loadable(() => import("./pages/home/home"));
    return (
      <Provider store={this.props.store}>
        <Router>
          <Switch>
            <Redirect path="/" exact to="/zly" />
            <Route path="/zly" component={HomePage}></Route>
            <Route path="/login" component={LoginComp}></Route>
            <Route path="/init" component={InitComp}></Route>
          </Switch>
        </Router>
      </Provider>
    );
  }
}

export default RouterComp;
