import React, { Component } from "react";
import { RouteComponentProps } from "react-router-dom";
import { ZlyState } from "../../store";
import { Action, bindActionCreators, Dispatch } from "redux";
import { connect } from "react-redux";
import clsx from "clsx";
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
  Drawer,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Fab,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import { LoginState } from "../../store/login/types";
import { AccountCircle } from "@material-ui/icons";
import StorageSelect from "./storage-select";
import { homeStyle } from "./home-style";
import MenuOpenIcon from "@material-ui/icons/MenuOpen";
import AirplanemodeActiveIcon from "@material-ui/icons/AirplanemodeActive";
import AddIcon from "@material-ui/icons/Add";
import CloseIcon from "@material-ui/icons/Close";
import FabMenu from "./fab-menu";
import ZlyRouter from "./zly-router";

interface HomeProps extends RouteComponentProps, WithStyles<typeof homeStyle> {
  validateLogin: () => void;
  login: LoginState;
}

interface HomeData {
  notLogin: boolean;
  open: boolean;
  fabOpen: boolean;
  fabAnchorEl: HTMLElement | null;
}

class HomePage extends Component<HomeProps, HomeData> {
  constructor(props: any) {
    super(props);
    this.state = {
      notLogin: false,
      open: false,
      fabOpen: false,
      fabAnchorEl: null,
    };
  }

  componentDidMount() {
    this.props.validateLogin();
  }

  handleDrawerToggle() {
    this.setState({
      ...this.state,
      open: !this.state.open,
    });
  }

  handleFabActive(event: React.MouseEvent<HTMLButtonElement>) {
    this.setState({
      ...this.state,
      fabAnchorEl: event.currentTarget,
      fabOpen: true,
    });
  }

  handleFabClose(event: {}, reason: any) {
    this.setState({
      ...this.state,
      fabAnchorEl: null,
      fabOpen: false,
    });
  }

  render() {
    const { validatePending } = this.props.login;
    const { classes } = this.props;
    const { open } = this.state;
    return (
      <div className={classes.root}>
        <AppBar
          position="fixed"
          className={clsx(classes.appBar, {
            [classes.appBarShift]: open,
          })}
        >
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawers"
              onClick={this.handleDrawerToggle.bind(this)}
            >
              {open ? <MenuOpenIcon /> : <MenuIcon />}
            </IconButton>
            <div className={classes.storageSelect}>
              <StorageSelect></StorageSelect>
            </div>
            <IconButton edge="end" color="inherit" aria-label="profile">
              <AccountCircle />
            </IconButton>
          </Toolbar>
        </AppBar>
        <Drawer
          variant="permanent"
          className={clsx(classes.drawer, {
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          })}
          classes={{
            paper: clsx({
              [classes.drawerOpen]: open,
              [classes.drawerClose]: !open,
            }),
          }}
        >
          <div className={classes.toolbar}>
            <List className={classes.homeIcon}>
              <ListItem button>
                <ListItemIcon>
                  <AirplanemodeActiveIcon />
                </ListItemIcon>
                <ListItemText>
                  <Typography variant="h6" noWrap>
                    ZLY
                  </Typography>
                </ListItemText>
              </ListItem>
            </List>
          </div>
          <Divider />
        </Drawer>
        <main className={classes.content}>
          <div className={classes.toolbar} />
          <div className={classes.subContent}></div>
          <ZlyRouter />
          <Fab
            className={classes.fab}
            color="primary"
            aria-label="add"
            onClick={this.handleFabActive.bind(this)}
          >
            {this.state.fabOpen ? <CloseIcon /> : <AddIcon />}
          </Fab>
          <FabMenu
            open={this.state.fabOpen}
            ele={this.state.fabAnchorEl}
            onClose={this.handleFabClose.bind(this)}
          ></FabMenu>
        </main>
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
