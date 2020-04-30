import React, { Component } from "react";
import {
  withStyles,
  WithStyles,
  Button,
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  ButtonGroup,
} from "@material-ui/core";
import { fileUploadStyle } from "./file-upload-style";
import { formatDate } from "../../tools/dateFormat";
import { FileItem, FileStatus } from "../../store/file/types";
import { ZlyState } from "../../store";
import { Dispatch, Action, bindActionCreators } from "redux";
import { connect } from "react-redux";
import { extendPreList, uploadFiles } from "../../store/file/file-api";

interface FileUploadProps extends WithStyles<typeof fileUploadStyle> {
  fileList: FileItem[];
  extendList: (files: File[]) => void;
  upload: () => void;
}

interface FileUploadState {}

class FileUpload extends Component<FileUploadProps, FileUploadState> {
  public insId: string;
  constructor(props: FileUploadProps) {
    super(props);
    this.insId = `file-upload-${Math.random().toString(36).substr(2)}`;
    this.state = {};
  }

  handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    if (event.currentTarget.files) {
      const nfs = event.currentTarget.files;
      const files: File[] = [];
      for (let i = 0; i < nfs.length; i++) {
        if (nfs.item(i)) {
          files.push(nfs.item(i) as File);
        }
      }
      this.props.extendList(files);
    }
  }

  formatFileSize(size: number) {
    const sizeUnit = ["B", "KB", "MB", "GB", "TB", "PB"];
    let tempSize = size;
    let index = 0;
    while (tempSize > 1024 && index < sizeUnit.length - 1) {
      tempSize = tempSize / 1024;
      index++;
    }
    return `${tempSize.toFixed(2)}${sizeUnit[index]}`;
  }

  itemOptBtn(item: FileItem) {
    return (
      <ButtonGroup
        variant="text"
        color="primary"
        size="small"
        aria-label="table-opt"
      >
        {item.status === FileStatus.UPLOAD_SUCCESS ? (
          ""
        ) : (
          <Button color="secondary">移除</Button>
        )}
      </ButtonGroup>
    );
  }

  render() {
    let { classes } = this.props;
    return (
      <div className={classes.root}>
        <div className={classes.fileList}>
          <TableContainer component={Paper}>
            <Table aria-label="file-list">
              <TableHead>
                <TableRow>
                  <TableCell>文件名称</TableCell>
                  <TableCell>修改时间</TableCell>
                  <TableCell>文件大小</TableCell>
                  <TableCell>文件状态</TableCell>
                  <TableCell align="center">操作</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {this.props.fileList.map((fitem) => (
                  <TableRow key={fitem.name}>
                    <TableCell>{fitem.name}</TableCell>
                    <TableCell>{formatDate(fitem.lastModified)}</TableCell>
                    <TableCell>{this.formatFileSize(fitem.size)}</TableCell>
                    <TableCell>{fitem.status}</TableCell>
                    <TableCell align="center">
                      {this.itemOptBtn(fitem)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
        <div className={classes.optBar}>
          <input
            id={this.insId}
            type="file"
            className={classes.hidden}
            multiple
            onChange={this.handleFileChange.bind(this)}
          ></input>
          <label htmlFor={this.insId}>
            <Button
              className={classes.optBtn}
              variant="contained"
              component="span"
              color="primary"
            >
              选择文件
            </Button>
          </label>
          <Button
            className={classes.optBtn}
            variant="contained"
            color="primary"
            onClick={()=>{this.props.upload()}}
          >
            上传文件
          </Button>
          <Button
            className={classes.optBtn}
            variant="contained"
            color="default"
          >
            取消上传
          </Button>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state: ZlyState) {
  return { fileList: state.file.preUploadFileList };
}

function mapDispatchToProps(dispatch: Dispatch<Action>) {
  return bindActionCreators(
    { extendList: extendPreList, upload: uploadFiles },
    dispatch
  );
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(fileUploadStyle)(FileUpload));
