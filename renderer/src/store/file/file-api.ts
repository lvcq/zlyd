import { Dispatch, Action } from "redux";
import {
  extendPreUploadFileList,
  uploadPending,
  uploadSuccess,
  uploadFail,
  uploadStatusChange,
  uploadComplete,
} from "./actions";
import { FileListUpload } from "./file-upload";
import { ZlyState } from "..";
import { FileStatus } from "./types";
import { FetchError } from "../../api";

export function extendPreList(files: File[]) {
  return (dispatch: Dispatch<Action>) => {
    dispatch(extendPreUploadFileList(files));
  };
}

export function uploadFiles() {
  return (dispatch: Dispatch<Action>, getState: () => ZlyState) => {
    let current = getState().storage.current;
    if (!current) {
      return;
    }
    let currentStorageId = current.id;
    dispatch(uploadPending());
    new FileListUpload(getState().file.preUploadFileList, currentStorageId, './file.worker.js')
      .listener((info) => {
        if (info.id && info.status === FileStatus.UPLOAD_SUCCESS) {
          dispatch(uploadSuccess(info.id));
        } else if (info.id && info.status === FileStatus.UPLOAD_FAIL) {
          dispatch(uploadFail(info.id, info.error as FetchError));
        } else if (info.id && info.status) {
          dispatch(uploadStatusChange(info.id, info.status));
        }
        if (info.iscomplete) {
          dispatch(uploadComplete());
        }
      })
      .startUpload();
  };
}
