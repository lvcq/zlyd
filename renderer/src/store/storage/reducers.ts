import {
  StorageState,
  SELECT_STORAGE,
  FETCH_STORAGE_LIST_PENDING,
  FETCH_STORAGE_LIST_SUCCESS,
  FETCH_STORAGE_LIST_ERROR,
} from "./types";
import {
  SELECT_STORAGE_ACTION,
  FETCH_STORAGE_LIST_PENDING_ATCION,
  FETCH_STORAGE_LIST_SUCCESS_ACTION,
  FETCH_STORAGE_LIST_ERROR_ACTION,
} from "./actions";

type ActionType =
  | SELECT_STORAGE_ACTION
  | FETCH_STORAGE_LIST_PENDING_ATCION
  | FETCH_STORAGE_LIST_SUCCESS_ACTION
  | FETCH_STORAGE_LIST_ERROR_ACTION;

const initStorageState: StorageState = {
  current: null,
  list: [],
  fetchStorageListPending: false,
  fetchStorageListError: false,
  fetchStorageListErrorInfo: null,
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
    default:
      return state;
  }
};
