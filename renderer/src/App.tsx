import React, { Component } from 'react';
import './App.scss';
import { connect } from 'react-redux';
import { ZlyState, userLogin, LoginState } from './store';
import { bindActionCreators, Dispatch, Action } from 'redux';
import { judgeIsLogOn } from './api';

interface AppProps {
  login: LoginState;
  userLogin: (username: string, password: string) => void;
}

class App extends Component<AppProps, {}> {
  goLogin = () => {
    const { userLogin } = this.props;
    userLogin('test', 'test');
  }

  componentDidMount(){
    judgeIsLogOn().then(res=>{})
  }

  render() {
    const { login } = this.props;
    return (<div className="app">
      <span>{String(login.isLogin)}</span><br></br>
      <button className="click-btn" onClick={this.goLogin}>点击</button>
    </div>);
  }
}

function mapStateToProps(state: ZlyState) {
  return { login: state.login }
}

function mapDispatchToProps(dispatch: Dispatch<Action>) {
  return bindActionCreators({ userLogin }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
