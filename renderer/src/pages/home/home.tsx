import React, { Component } from "react";
import { RouteComponentProps } from "react-router-dom";
import { ZlyState } from "../../store";
import { Action, bindActionCreators, Dispatch } from "redux";
import { connect } from "react-redux";
import { validateLogin } from "../../store/login/validate-login";
import {
  Backdrop,
  CircularProgress,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  withStyles,
  WithStyles,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import { LoginState } from "../../store/login/types";
import { AccountCircle } from "@material-ui/icons";
import StorageSelect from "./storage-select";
import { homeStyle } from "./home-style";

interface HomeProps extends RouteComponentProps, WithStyles<typeof homeStyle> {
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
      notLogin: false,
    };
  }

  componentDidMount() {
    this.props.validateLogin();
  }

  render() {
    const { validatePending } = this.props.login;
    const { classes } = this.props;
    return (
      <div className="zly-home">
        <AppBar position="sticky">
          <Toolbar>
            <IconButton edge="start" color="inherit" aria-label="open drawers">
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap>
              ZLY
            </Typography>
            <div className={classes.storageSelect}>
              <StorageSelect></StorageSelect>
            </div>
            <IconButton edge="end" color="inherit" aria-label="profile">
              <AccountCircle />
            </IconButton>
          </Toolbar>
        </AppBar>
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
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(homeStyle)(HomePage));
