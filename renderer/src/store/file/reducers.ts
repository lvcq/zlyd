import {
  FileState,
  EXTEND_PRE_UPLOAD_FILE_LIST,
  FileItem,
  FileStatus,
  UPLOAD_FILE_STATUS_CHANGE,
  UPLOAD_FILE_SUCCESS,
  UPLOAD_FILE_COMPLETE,
  UPLOAD_fILE_ERROR,
  UPLOAD_FILE_PENDING,
} from "./types";
import {
  UPLOAD_FILE_COMPLETE_ACTION,
  UPLOAD_FILE_PENDING_ACTION,
  UPLOAD_FILE_SUCCESS_ACTION,
  UPLOAD_FILE_ERROR_ACTION,
  EXTEND_PRE_UPLOAD_FILE_LIST_ACTION,
  UPLOAD_FILE_STATUS_CHANGE_ACTION,
} from "./actions";
import { utoa } from "../../tools/string-trans";

type ActionType =
  | EXTEND_PRE_UPLOAD_FILE_LIST_ACTION
  | UPLOAD_FILE_PENDING_ACTION
  | UPLOAD_FILE_SUCCESS_ACTION
  | UPLOAD_FILE_ERROR_ACTION
  | UPLOAD_FILE_STATUS_CHANGE_ACTION
  | UPLOAD_FILE_COMPLETE_ACTION;

const initFileState: FileState = {
  uploadPending: false,
  uploadFail: false,
  uploadErrorInfo: null,
  preUploadFileList: [],
};

export const file = (state: FileState = initFileState, action: ActionType) => {
  switch (action.type) {
    case EXTEND_PRE_UPLOAD_FILE_LIST:
      return {
        ...state,
        preUploadFileList: extendPreFileList(
          state.preUploadFileList,
          action.files
        ),
      };
    case UPLOAD_FILE_PENDING:
      return {
        ...state,
        uploadPending: true,
      };
    case UPLOAD_FILE_STATUS_CHANGE:
      setItemStatusById(
        state.preUploadFileList,
        action.fileId,
        action.status
      );
      return { ...state, preUploadFileList: [...state.preUploadFileList] };
    case UPLOAD_FILE_SUCCESS:
      setItemStatusById(
        state.preUploadFileList,
        action.fileId,
        FileStatus.UPLOAD_SUCCESS
      );
      return { ...state, preUploadFileList: [...state.preUploadFileList] };
    case UPLOAD_fILE_ERROR:
      setItemStatusById(
        state.preUploadFileList,
        action.fileId,
        FileStatus.UPLOAD_FAIL
      );
      return { ...state, preUploadFileList: [...state.preUploadFileList] };
    case UPLOAD_FILE_COMPLETE:
      return {
        ...state,
        uploadPending: false,
      };
    default:
      return state;
  }
};

function setItemStatusById(list: FileItem[], id: string, status: FileStatus) {
  let current = list.find((item) => item.id === id);
  if (current) {
    current.status = status;
  }
}

function extendPreFileList(preList: FileItem[], files: File[]) {
  const items: FileItem[] = [];
  files.forEach((item) => {
    const id = utoa(item.name);
    if (!preList.find((cell) => cell.id === id)) {
      items.push({
        id,
        name: item.name,
        file: item,
        lastModified: item.lastModified,
        size: item.size,
        status: FileStatus.PRE_UPLOAD,
      });
    }
  });
  return [...preList, ...items];
}
