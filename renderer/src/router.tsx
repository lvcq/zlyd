import { HashRouter as Router, Switch, Route } from "react-router-dom";
import React, { Component } from "react";
import { Provider } from "react-redux";
import loadable from "@loadable/component";

interface Props {
  store: any;
}

export class RouterComp extends Component<Props, {}> {
  render() {
    const AppComp = loadable(() => import("./App"));
    const LoginComp = loadable(() => import("./pages/login/login"));
    const InitComp = loadable(() => import("./pages/init/init"));
    return (
      <Provider store={this.props.store}>
        <Router>
          <Switch>
            <Route path="/" exact component={AppComp} />
            <Route path="/login" component={LoginComp}></Route>
            <Route path="/init" component={InitComp}></Route>
          </Switch>
        </Router>
      </Provider>
    );
  }
}
