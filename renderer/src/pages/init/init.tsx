import React, { Component } from "react";
import Paper from "@material-ui/core/Paper";
import "./init.scss";
import {
  TextField,
  Button,
  Snackbar,
  Grow,
  Backdrop,
  CircularProgress
} from "@material-ui/core";
import { TransitionProps } from "@material-ui/core/transitions/transition";
import Alert from "@material-ui/lab/Alert";

interface FormItem {
  value: string;
  error: boolean;
  help: string;
  validate: (arg0: string) => boolean;
}

interface InitState {
  activeStep: number;
  roleName: FormItem;
  rootName: FormItem;
  password: FormItem;
  comfirm: FormItem;
  email: FormItem;
  noFilTip: boolean;
  loadingIsInited: boolean;
}

class Init extends Component<{}, InitState> {
  constructor(props: any) {
    super(props);
    this.state = {
      activeStep: 0,
      noFilTip: false,
      loadingIsInited: true,
      roleName: {
        value: "",
        error: false,
        help: "超级管理员角色名称不能为空",
        validate: (val: string) => this.validateRequire(val)
      },
      rootName: {
        value: "",
        error: false,
        help: "超级管理员名称不能为空",
        validate: (val: string) => this.validateRequire(val)
      },
      password: {
        value: "",
        error: false,
        help: "管理员密码不能为空",
        validate: (val: string) => this.validatePassword(val)
      },
      comfirm: {
        value: "",
        error: false,
        help: "两次输入密码不一致",
        validate: (val: string) => this.validateComfirm(val)
      },
      email: {
        value: "",
        error: false,
        help: "邮箱格式不正确",
        validate: (val: string) => this.validateEmail(val)
      }
    };
  }

  validateRequire(value: string): boolean {
    return !!value.trim();
  }

  validatePassword(value: string): boolean {
    if (!!value.trim()) {
      const comfirmText = this.state.comfirm.value;
      if (comfirmText) {
        this.formValueChane("comfirm", comfirmText);
      }
      return true;
    }
    return false;
  }

  validateComfirm(value: string): boolean {
    const password = this.state.password.value;
    return password === value;
  }

  validateEmail(value: string): boolean {
    if (!value.trim()) {
      return true;
    }
    return /^\S+@(\S+\.)+\S{2,}$/.test(value.trim());
  }

  getFormValue() {
    if (
      this.state.rootName.value &&
      !this.state.rootName.error &&
      this.state.roleName.value &&
      !this.state.rootName.error &&
      this.state.password.value &&
      !this.state.password.error &&
      this.state.comfirm.value &&
      !this.state.comfirm.error &&
      !this.state.email.error
    ) {
      return {
        roleName: this.state.roleName.value.trim(),
        rootName: this.state.rootName.value.trim(),
        password: this.state.password.value.trim(),
        email: this.state.email.value.trim()
      };
    }
    return null;
  }

  handleSubmit() {
    const value = this.getFormValue();
    if (value) {
      console.log(value);
    } else {
      console.log(12);
      this.setState(Object.assign({}, this.state, { noFilTip: true }));
    }
  }

  handleNoFillClose(event?: React.SyntheticEvent, reason?: string) {
    if (reason === "clickaway") {
      return;
    }
    this.setState(Object.assign({}, this.state, { noFilTip: false }));
  }

  handleLoadingClose() {
    this.setState(Object.assign({}, this.state, { loadingIsInited: false }));
  }

  componentDidMount() {}

  formValueChane(
    key: "roleName" | "rootName" | "password" | "comfirm" | "email",
    value: string
  ) {
    const item: FormItem = this.state[key] as FormItem;
    const error = !item.validate(value);
    const newItem: FormItem = Object.assign({}, item, { value, error });
    const newState = Object.assign({}, this.state, { [key]: newItem });
    this.setState(newState);
  }

  render() {
    const GrowTransition = (props: TransitionProps) => {
      return <Grow {...props} />;
    };
    return (
      <div className="init-page-container">
        <Paper className="init-page" style={{ marginTop: "10%" }} elevation={3}>
          <div className="page-title">
            <span>管理员信息</span>
          </div>
          <form autoComplete="off" className="init-form">
            <TextField
              label="超级管理员角色名称"
              required
              fullWidth
              margin="dense"
              value={this.state.roleName.value}
              error={this.state.roleName.error}
              helperText={
                this.state.roleName.error ? this.state.roleName.help : ""
              }
              onChange={(evt: React.ChangeEvent<HTMLInputElement>) =>
                this.formValueChane("roleName", evt.target.value)
              }
            ></TextField>
            <TextField
              label="超级管理员账号"
              required
              fullWidth
              margin="dense"
              value={this.state.rootName.value}
              error={this.state.rootName.error}
              helperText={
                this.state.rootName.error ? this.state.rootName.help : ""
              }
              onChange={(evt: React.ChangeEvent<HTMLInputElement>) =>
                this.formValueChane("rootName", evt.target.value)
              }
            ></TextField>
            <TextField
              label="超级管理员密码"
              type="password"
              required
              fullWidth
              margin="dense"
              value={this.state.password.value}
              error={this.state.password.error}
              helperText={
                this.state.password.error ? this.state.password.help : ""
              }
              onChange={(evt: React.ChangeEvent<HTMLInputElement>) =>
                this.formValueChane("password", evt.target.value)
              }
            ></TextField>
            <TextField
              label="确认密码"
              type="password"
              required
              fullWidth
              margin="dense"
              value={this.state.comfirm.value}
              error={this.state.comfirm.error}
              helperText={
                this.state.comfirm.error ? this.state.comfirm.help : ""
              }
              onChange={(evt: React.ChangeEvent<HTMLInputElement>) =>
                this.formValueChane("comfirm", evt.target.value)
              }
            ></TextField>
            <TextField
              label="超级管理员邮箱"
              fullWidth
              margin="dense"
              value={this.state.email.value}
              error={this.state.email.error}
              helperText={this.state.email.error ? this.state.email.help : ""}
              onChange={(evt: React.ChangeEvent<HTMLInputElement>) =>
                this.formValueChane("email", evt.target.value)
              }
            ></TextField>
          </form>
          <div className="opt-bar">
            <Button
              variant="contained"
              style={{ width: "180px" }}
              color="primary"
              onClick={() => this.handleSubmit()}
            >
              提交
            </Button>
          </div>
          <Snackbar
            anchorOrigin={{ vertical: "top", horizontal: "center" }}
            open={this.state.noFilTip}
            onClose={(event?: React.SyntheticEvent, reason?: string) =>
              this.handleNoFillClose(event, reason)
            }
            TransitionComponent={GrowTransition}
            autoHideDuration={3000}
          >
            <Alert
              severity="warning"
              elevation={6}
              variant="filled"
              onClose={(event?: React.SyntheticEvent, reason?: string) =>
                this.handleNoFillClose(event, reason)
              }
            >
              请正确填写信息
            </Alert>
          </Snackbar>
        </Paper>
        <Backdrop open={this.state.loadingIsInited} style={{zIndex:0}}>
          <CircularProgress color="inherit" />
        </Backdrop>
      </div>
    );
  }
}
export default Init;
