import React, { Component } from "react";
import { connect } from "react-redux";
import {
  AccountCircle,
  Lock,
  Visibility,
  VisibilityOff
} from "@material-ui/icons";
import {
  Paper,
  TextField,
  InputAdornment,
  IconButton,
  Button
} from "@material-ui/core";
import { withRouter, RouteComponentProps } from "react-router";
import { ZlyState } from "../../store";
import { Action, Dispatch, bindActionCreators } from "redux";
import { LoginState as LoginStore } from "../../store/login/types";
import { FormItem } from "../../model/model";
import { userLogin } from "../../store/login/login";
import "./login.scss";
import  {greet} from "@lvcq/zlygl";

interface LoginProps extends RouteComponentProps {
  login: LoginStore;
  userLogin: (username: string, password: string) => void;
}
interface LoginState {
  username: FormItem;
  password: FormItem;
  showPassword: boolean;
}

class Login extends Component<LoginProps, LoginState> {
  constructor(props: LoginProps) {
    super(props);
    this.state = {
      username: {
        value: "",
        error: false,
        help: "",
        validate: (v: string) => {
          return v.trim().length > 0;
        }
      },
      password: {
        value: "",
        error: false,
        help: "",
        validate: (v: string) => {
          return v.trim().length > 0;
        }
      },
      showPassword: false
    };
  }

  handleClickShowPassword() {
    this.setState({ ...this.state, showPassword: !this.state.showPassword });
  }

  handleValueChange(key: "username" | "password", value: string) {
    let item: FormItem = this.state[key];
    let nv = value;
    let error = !item.validate(nv);
    this.setState({
      ...this.setState,
      [key]: {
        value: nv,
        help: item.help,
        validate: item.validate,
        error
      }
    });
  }

  handleSubmit() {
    greet("rust wasm!");
    if (
      !this.state.username.error &&
      this.state.username.value.trim() &&
      !this.state.password.error &&
      this.state.password.value.trim()
    ) {
      this.props.userLogin(
        this.state.username.value.trim(),
        this.state.password.value.trim()
      );
    }
  }

  render() {
    const { showPassword, username, password } = this.state;
    const { loginPending, loginFail } = this.props.login;
    let usernameAdornment = (
      <InputAdornment position="start">
        <AccountCircle />
      </InputAdornment>
    );
    let passwordAdornment = (
      <InputAdornment position="start">
        <Lock />
      </InputAdornment>
    );
    let showPasswordAdornment = (
      <InputAdornment position="end">
        <IconButton
          aria-label="toggle password visibility"
          onClick={this.handleClickShowPassword.bind(this)}
          onMouseDown={(event: React.MouseEvent<HTMLButtonElement>) => {
            event.preventDefault();
          }}
          edge="end"
        >
          {this.state.showPassword ? <Visibility /> : <VisibilityOff />}
        </IconButton>
      </InputAdornment>
    );
    return (
      <div className="login-container">
        <Paper className="login-page" elevation={3}>
          <div className="login-title">ZLY登录</div>
          <form autoComplete="off" className="login-form">
            <TextField
              id="username-field"
              fullWidth
              required
              margin="normal"
              error={username.error}
              helperText={username.error ? username.help : ""}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                this.handleValueChange("username", event.target.value);
              }}
              InputProps={{
                startAdornment: usernameAdornment
              }}
            ></TextField>
            <TextField
              id="password-field"
              fullWidth
              required
              margin="normal"
              type={showPassword ? "text" : "password"}
              error={password.error}
              helperText={password.error ? password.help : ""}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                this.handleValueChange("password", event.target.value);
              }}
              InputProps={{
                startAdornment: passwordAdornment,
                endAdornment: showPasswordAdornment
              }}
            ></TextField>
          </form>
          <div className="opt-bar">
            <Button
              variant="contained"
              style={{ width: "100%" }}
              disabled={loginPending}
              color="primary"
              onClick={() => this.handleSubmit()}
            >
              {loginPending ? "登录中..." : "登录"}
            </Button>
          </div>
        </Paper>
      </div>
    );
  }
}

function mapStateToProps(state: ZlyState) {
  return { login: state.login };
}

function mapDispatchToProps(dispatch: Dispatch<Action>) {
  return bindActionCreators({ userLogin }, dispatch);
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Login));
