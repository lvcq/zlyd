import React, { Component } from "react";
import { ZlyState } from "../../store";
import { bindActionCreators, Dispatch, Action } from "redux";
import { connect } from "react-redux";
import {
  Menu,
  WithStyles,
  MenuItem,
  ListItemIcon,
  ListItemText,
  withStyles,
} from "@material-ui/core";
import { RouteComponentProps, withRouter } from "react-router";
import { fabMenuStyle } from "./fab-menu-style";
import MuseumIcon from "@material-ui/icons/Museum";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import CreateNewFolderIcon from "@material-ui/icons/CreateNewFolder";

interface FabMenuProps
  extends WithStyles<typeof fabMenuStyle>,
    RouteComponentProps {
  open: boolean;
  ele: HTMLElement | null;
  onClose:
    | ((event: {}, reason: "backdropClick" | "escapeKeyDown") => void)
    | undefined;
}
interface FabMenuState {}

class FabMenu extends Component<FabMenuProps, FabMenuState> {
  handerGotoAddStorage() {
    this.props.history.push("/zly/add-storage");
    if (this.props.onClose) {
      this.props.onClose({}, "backdropClick");
    }
  }

  render() {
    return (
      <Menu
        open={this.props.open}
        elevation={3}
        anchorEl={this.props.ele}
        anchorOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        onClose={this.props.onClose}
      >
        <MenuItem onClick={this.handerGotoAddStorage.bind(this)}>
          <ListItemIcon>
            <MuseumIcon />
          </ListItemIcon>
          <ListItemText primary="新建空间"></ListItemText>
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <CloudUploadIcon />
          </ListItemIcon>
          <ListItemText primary="文件上传"></ListItemText>
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <CreateNewFolderIcon />
          </ListItemIcon>
          <ListItemText primary="新建文件夹"></ListItemText>
        </MenuItem>
      </Menu>
    );
  }
}

function mapStateToProps(state: ZlyState) {
  return { login: state.login };
}

function mapDispatchToProps(dispatch: Dispatch<Action>) {
  return bindActionCreators({}, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(withStyles(fabMenuStyle)(FabMenu)));
