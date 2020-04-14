import React, { Component } from "react";
import { ZlyState } from "../../store";
import { Dispatch, Action, bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Select, WithStyles, withStyles, MenuItem } from "@material-ui/core";
import { storageSelectStyle } from "./storage-select-style";
import { Storage } from "../../store/storage/types";
import { setCurrentStorage } from "../../store/storage/storage";

interface storageProps extends WithStyles<typeof storageSelectStyle> {
  storageList: Array<Storage>;
  current: Storage | null;
  setCurrentStorage: (id: string) => void;
}

interface storageState {}

class StorageSelect extends Component<storageProps, storageState> {
  handleStorageChange(event: React.ChangeEvent<{ value: unknown }>) {
    this.props.setCurrentStorage(event.target.value as string);
  }

  render() {
    const { classes, storageList, current } = this.props;
    const selectId = (current && current.id) || "";
    return (
      <Select
        value={selectId}
        color="primary"
        className={classes.selectItem}
        onChange={this.handleStorageChange.bind(this)}
        inputProps={{
          name: "select_storage",
        }}
      >
        {storageList.map((item) => (
          <MenuItem key={item.id} value={item.id}>
            {item.name}
          </MenuItem>
        ))}
      </Select>
    );
  }
}

function mapStateToProps(state: ZlyState) {
  return {
    storageList: state.storage.list,
    current: state.storage.current,
  };
}

function mapDispatchToProps(dispatch: Dispatch<Action>) {
  return bindActionCreators({ setCurrentStorage }, dispatch);
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(storageSelectStyle)(StorageSelect));
