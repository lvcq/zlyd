import { FetchError } from "../../api";

/** 操作文件上传列表 */
export const EXTEND_PRE_UPLOAD_FILE_LIST = "EXTEND_PRE_UPLOAD_FILE_LIST";

/** 文件上传相关 */
export const UPLOAD_FILE_PENDING = "UPLOAD_FILE_PENDING";
export const UPLOAD_FILE_STATUS_CHANGE = "UPLOAD_FILE_STATUS_CHANGE";
export const UPLOAD_FILE_SUCCESS = "UPLOAD_FILE_SUCCESS";
export const UPLOAD_fILE_ERROR = "UPLOAD_FILE_ERROR";
export const UPLOAD_FILE_COMPLETE = "UPLOAD_FILE_COMPLETE";

export interface FileItem {
  id: string;
  file: File;
  name: string;
  lastModified: number;
  size: number;
  status: FileStatus;
}

export enum FileStatus {
  PRE_UPLOAD = "未上传",
  READY_UPLOAD = "准备上传",
  CALC_HASH = "计算文件哈希",
  UPlOADING = "上传中",
  UPLOAD_SUCCESS = "上传成功",
  UPLOAD_FAIL = "上传失败",
}

export interface FileState {
  uploadPending: boolean;
  uploadFail: boolean;
  uploadErrorInfo: FetchError | null;
  preUploadFileList: FileItem[];
}
