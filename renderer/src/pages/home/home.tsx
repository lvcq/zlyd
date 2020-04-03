import React, { Component } from "react";
import { withRouter, RouteComponentProps } from "react-router-dom";
import { ZlyState } from "../../store";
import { Action, bindActionCreators, Dispatch } from "redux";
import { connect } from "react-redux";
import { validateLogin } from "../../store/login/validate-login";
import { Backdrop, CircularProgress } from "@material-ui/core";
import { LoginState } from "../../store/login/types";

interface HomeProps extends RouteComponentProps {
  validateLogin: () => void;
  login: LoginState;
}

interface HomeData {
  notLogin: boolean;
}

class HomePage extends Component<HomeProps, HomeData> {
  constructor(props: any) {
    super(props);
    this.state = {
      notLogin: false
    };
  }

  componentDidMount() {
    this.props.validateLogin();
  }

  componentWillReceiveProps(nextProps: HomeProps) {
    if (nextProps.login.notlogin) {
      this.props.history.replace("/login");
    }
  }

  render() {
    const { validatePending } = this.props.login;
    return (
      <div className="zly-home">
        <Backdrop open={validatePending} style={{ zIndex: 0 }}>
          <CircularProgress color="inherit" />
        </Backdrop>
      </div>
    );
  }
}

function mapStateToProps(state: ZlyState) {
  return { login: state.login };
}

function mapDispatchToProps(dispatch: Dispatch<Action>) {
  return bindActionCreators({ validateLogin }, dispatch);
}
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(HomePage)
);
