import React, { Component } from "react";
import { WithStyles, withStyles, TextField, Button } from "@material-ui/core";
import { addStorageStyle } from "./add-storage-style";
import { connect } from "react-redux";
import { Dispatch, Action, bindActionCreators } from "redux";
import { ZlyState } from "../../store";
import { addNewStorage } from "../../store/storage/storage";

interface StorageProps extends WithStyles<typeof addStorageStyle> {
  addNewPending: boolean;
  handleAddNew: (info: any) => void;
}

interface StorageState {
  storageName: string;
}

class AddStorage extends Component<StorageProps, StorageState> {
  constructor(props: StorageProps) {
    super(props);
    this.state = {
      storageName: "",
    };
  }

  handleStorageNameChange(event: React.ChangeEvent<HTMLInputElement>) {
    this.setState({
      ...this.state,
      storageName: event.currentTarget.value,
    });
  }

  addNewStorage() {
    if (this.state.storageName.trim()) {
      this.props.handleAddNew({ storage_name: this.state.storageName.trim() });
    }
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <form autoComplete="off">
          <TextField
            label="空间名称"
            required
            fullWidth
            margin="dense"
            value={this.state.storageName}
            onChange={this.handleStorageNameChange.bind(this)}
          ></TextField>
        </form>
        <div className={classes.optBar}>
          <Button
            variant="contained"
            style={{ width: "180px" }}
            color="primary"
            onClick={() => this.addNewStorage()}
          >
            新建空间
          </Button>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state: ZlyState) {
  return { addNewPending: state.storage.addStoragePending };
}

function mapDispatchToProps(dispatch: Dispatch<Action>) {
  return bindActionCreators({ handleAddNew: addNewStorage }, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(addStorageStyle)(AddStorage));
