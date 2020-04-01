import { HashRouter as Router, Switch, Route } from "react-router-dom";
import React, { Component } from "react";
import { Provider, connect } from "react-redux";
import loadable from "@loadable/component";
import { ZlyState } from "./store";
import { Dispatch, Action, bindActionCreators } from "redux";
import { validateLogin } from './store/login/actions';

interface Props {
  store: any;
  validateLogin: () => void;
}
interface RouterState {}

class RouterComp extends Component<Props, RouterState> {
  componentDidMount(){
    this.props.validateLogin();
  }
  render() {
    const AppComp = loadable(() => import("./App"));
    const LoginComp = loadable(() => import("./pages/login/login"));
    const InitComp = loadable(() => import("./pages/init/init"));
    const HomePage = loadable(() => import("./pages/home/home"));
    return (
      <Provider store={this.props.store}>
        <Router>
          <Switch>
            <Route path="/" exact component={AppComp} />
            <Route path="/home" component={HomePage}></Route>
            <Route path="/login" component={LoginComp}></Route>
            <Route path="/init" component={InitComp}></Route>
          </Switch>
        </Router>
      </Provider>
    );
  }
}

function mapStateToProps(state: ZlyState) {
  return { login: state.login };
}

function mapDispatchToProps(dispatch: Dispatch<Action>) {
  return bindActionCreators({ validateLogin }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(RouterComp);
