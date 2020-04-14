import { FetchErrorInfo } from "../../model/model";

export const SELECT_STORAGE = "SELECT_STORAGE";
export const FETCH_STORAGE_LIST_PENDING = "FETCH_STORAGE_LIST_PENDING";
export const FETCH_STORAGE_LIST_SUCCESS = "FETCH_STORAGE_LIST_SUCCESS";
export const FETCH_STORAGE_LIST_ERROR = "FETCH_STORAGE_LIST_ERROR";

/** 处理新增空间 */
export const ADD_NEW_STORAGE_PENDING = "ADD_NEW_STORAGE_PENDING";
export const ADD_NEW_STORAGE_SUCCESS = "ADD_NEW_STORAGE_SUCCESS";
export const ADD_NEW_STORAGE_ERROR = "ADD_NEW_STORAGE_ERROR";

export interface StorageState {
  current: Storage | null;
  list: Storage[];
  fetchStorageListPending: boolean;
  fetchStorageListError: boolean;
  fetchStorageListErrorInfo: FetchErrorInfo | null;
  addStoragePending: boolean;
  addStorageError: boolean;
  addStorageErrorInfo: FetchErrorInfo | null;
}

export interface Storage {
  id: string;
  name: string;
  storage_role: string;
}
