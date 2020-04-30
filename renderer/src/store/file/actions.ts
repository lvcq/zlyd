import {
  UPLOAD_FILE_PENDING,
  UPLOAD_FILE_SUCCESS,
  UPLOAD_fILE_ERROR,
  EXTEND_PRE_UPLOAD_FILE_LIST,
  UPLOAD_FILE_COMPLETE,
  UPLOAD_FILE_STATUS_CHANGE,
  FileStatus,
} from "./types";
import { FetchError } from "../../api";

export interface UPLOAD_FILE_PENDING_ACTION {
  type: typeof UPLOAD_FILE_PENDING;
}

export interface UPLOAD_FILE_SUCCESS_ACTION {
  type: typeof UPLOAD_FILE_SUCCESS;
  fileId: string;
}

export interface UPLOAD_FILE_ERROR_ACTION {
  type: typeof UPLOAD_fILE_ERROR;
  fileId: string;
  error: FetchError;
}

export interface UPLOAD_FILE_COMPLETE_ACTION {
  type: typeof UPLOAD_FILE_COMPLETE;
}

export interface EXTEND_PRE_UPLOAD_FILE_LIST_ACTION {
  type: typeof EXTEND_PRE_UPLOAD_FILE_LIST;
  files: File[];
}

export interface UPLOAD_FILE_STATUS_CHANGE_ACTION {
  type: typeof UPLOAD_FILE_STATUS_CHANGE;
  fileId: string;
  status: FileStatus
}

export function uploadPending() {
  return {
    type: UPLOAD_FILE_PENDING,
  };
}

export function uploadStatusChange(id: string, status: FileStatus) {
  return {
    type: UPLOAD_FILE_STATUS_CHANGE,
    fileId: id,
    status
  };
}

export function uploadSuccess(id: string) {
  return {
    type: UPLOAD_FILE_SUCCESS,
    fileId: id,
  };
}

export function uploadFail(id: string, err: FetchError) {
  return {
    type: UPLOAD_fILE_ERROR,
    error: err,
    fileId: id,
  };
}

export function uploadComplete() {
  return {
    type: UPLOAD_FILE_COMPLETE,
  };
}

export function extendPreUploadFileList(files: File[]) {
  return {
    type: EXTEND_PRE_UPLOAD_FILE_LIST,
    files,
  };
}
