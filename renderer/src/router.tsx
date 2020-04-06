import {
  HashRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import React, { Component } from "react";
import { Provider } from "react-redux";
import loadable from "@loadable/component";
import { ConnectedRouter } from 'connected-react-router'

interface Props {
  store: any;
  history:any;
}
interface RouterState {}

class RouterComp extends Component<Props, RouterState> {
  render() {
    const LoginComp = loadable(() => import("./pages/login/login"));
    const InitComp = loadable(() => import("./pages/init/init"));
    const HomePage = loadable(() => import("./pages/home/home"));
    return (
      <Provider store={this.props.store}>
        <ConnectedRouter history={this.props.history}>
        <Router>
          <Switch>
            <Redirect path="/" exact to="/zly" />
            <Route path="/zly" component={HomePage}></Route>
            <Route path="/login" component={LoginComp}></Route>
            <Route path="/init" component={InitComp}></Route>
          </Switch>
        </Router>
        </ConnectedRouter>
      </Provider>
    );
  }
}

export default RouterComp;
