import { FetchErrorInfo } from "../../model/model";

export const SELECT_STORAGE = "SELECT_STORAGE";
export const FETCH_STORAGE_LIST_PENDING = "FETCH_STORAGE_LIST_PENDING";
export const FETCH_STORAGE_LIST_SUCCESS = "FETCH_STORAGE_LIST_SUCCESS";
export const FETCH_STORAGE_LIST_ERROR = "FETCH_STORAGE_LIST_ERROR";

export interface StorageState {
  current: Storage | null;
  list: Storage[];
  fetchStorageListPending:boolean;
  fetchStorageListError:boolean;
  fetchStorageListErrorInfo:FetchErrorInfo|null;
}

export interface Storage {
  id: string;
  name: string;
}
