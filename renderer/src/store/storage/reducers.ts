import {
  StorageState,
  SELECT_STORAGE,
  FETCH_STORAGE_LIST_PENDING,
  FETCH_STORAGE_LIST_SUCCESS,
  FETCH_STORAGE_LIST_ERROR,
  ADD_NEW_STORAGE_PENDING,
  ADD_NEW_STORAGE_SUCCESS,
  ADD_NEW_STORAGE_ERROR,
} from "./types";
import {
  SELECT_STORAGE_ACTION,
  FETCH_STORAGE_LIST_PENDING_ATCION,
  FETCH_STORAGE_LIST_SUCCESS_ACTION,
  FETCH_STORAGE_LIST_ERROR_ACTION,
  ADD_NEW_STORAGE_ERROR_ACTION,
  ADD_NEW_STORAGE_SUCCESS_ACTION,
  ADD_NEW_STORAGE_PENDING_ACTION,
} from "./actions";

type ActionType =
  | SELECT_STORAGE_ACTION
  | FETCH_STORAGE_LIST_PENDING_ATCION
  | FETCH_STORAGE_LIST_SUCCESS_ACTION
  | FETCH_STORAGE_LIST_ERROR_ACTION
  | ADD_NEW_STORAGE_ERROR_ACTION
  | ADD_NEW_STORAGE_PENDING_ACTION
  | ADD_NEW_STORAGE_SUCCESS_ACTION;

const initStorageState: StorageState = {
  current: null,
  list: [],
  fetchStorageListPending: false,
  fetchStorageListError: false,
  fetchStorageListErrorInfo: null,
  addStorageError: false,
  addStoragePending: false,
  addStorageErrorInfo: null,
};

export const storage = (state = initStorageState, action: ActionType) => {
  switch (action.type) {
    case SELECT_STORAGE:
      const current = state.list.find((item) => item.id === action.id);
      return { ...state, current: current || null };
    case FETCH_STORAGE_LIST_PENDING:
      return {
        ...state,
        fetchStorageListPending: true,
        fetchStorageListError: false,
      };
    case FETCH_STORAGE_LIST_SUCCESS:
      return {
        ...state,
        fetchStorageListPending: false,
        list: action.list,
      };
    case FETCH_STORAGE_LIST_ERROR:
      return {
        ...state,
        fetchStorageListPending: false,
        fetchStorageListError: true,
        fetchStorageListErrorInfo: action.error,
      };
    case ADD_NEW_STORAGE_PENDING:
      return {
        ...state,
        addStorageError: false,
        addStorageErrorInfo: null,
        addStoragePending: true,
      };
    case ADD_NEW_STORAGE_SUCCESS:
      return {
        ...state,
        addStoragePending: false,
      };
    case ADD_NEW_STORAGE_ERROR:
      return {
        ...state,
        addStoragePending: false,
        addStorageError: true,
        addStorageErrorInfo: action.error,
      };
    default:
      return state;
  }
};
