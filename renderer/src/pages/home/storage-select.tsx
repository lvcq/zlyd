import React, { Component } from "react";
import { ZlyState } from "../../store";
import { Dispatch, Action, bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Select, WithStyles, withStyles } from "@material-ui/core";
import { storageSelectStyle } from "./storage-select-style";

interface storageProps extends WithStyles<typeof storageSelectStyle> {}

interface storageState {}

class StorageSelect extends Component<storageProps, storageState> {
  render() {
    const { classes } = this.props;
    return (
      <Select color="primary" className={classes.selectItem}>
        <option value={1}>公共空间</option>
      </Select>
    );
  }
}

function mapStateToProps(state: ZlyState) {
  return {};
}

function mapDispatchToProps(dispatch: Dispatch<Action>) {
  return bindActionCreators({}, dispatch);
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(storageSelectStyle)(StorageSelect));
