import { HashRouter as Router, Switch, Route } from 'react-router-dom';
import React, { Component } from 'react';
import { Provider } from 'react-redux';
import loadable from "@loadable/component";

interface Props {
  store: any
}

export class RouterComp extends Component<Props, {}> {
  render() {
    const AppComp = loadable(() => import("./App"));
    return (
      <Provider store={this.props.store}>
        <Router>
          <Switch>
            <Route path="/" component={AppComp} />
          </Switch>
        </Router>
      </Provider>
    )
  }
}