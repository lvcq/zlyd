import {
  SELECT_STORAGE,
  FETCH_STORAGE_LIST_PENDING,
  FETCH_STORAGE_LIST_SUCCESS,
  Storage,
  FETCH_STORAGE_LIST_ERROR,
  ADD_NEW_STORAGE_PENDING,
  ADD_NEW_STORAGE_SUCCESS,
  ADD_NEW_STORAGE_ERROR,
} from "./types";
import { FetchErrorInfo } from "../../model/model";

export interface SELECT_STORAGE_ACTION {
  type: typeof SELECT_STORAGE;
  id: string;
}

export interface FETCH_STORAGE_LIST_PENDING_ATCION {
  type: typeof FETCH_STORAGE_LIST_PENDING;
}

export interface FETCH_STORAGE_LIST_SUCCESS_ACTION {
  type: typeof FETCH_STORAGE_LIST_SUCCESS;
  list: Storage[];
}

export interface FETCH_STORAGE_LIST_ERROR_ACTION {
  type: typeof FETCH_STORAGE_LIST_ERROR;
  error: FetchErrorInfo;
}

export interface ADD_NEW_STORAGE_PENDING_ACTION {
  type: typeof ADD_NEW_STORAGE_PENDING;
}

export interface ADD_NEW_STORAGE_SUCCESS_ACTION {
  type: typeof ADD_NEW_STORAGE_SUCCESS;
}

export interface ADD_NEW_STORAGE_ERROR_ACTION {
  type: typeof ADD_NEW_STORAGE_ERROR;
  error: FetchErrorInfo;
}

export function selectStorage(id: string) {
  return {
    type: SELECT_STORAGE,
    id,
  };
}

export function fetchStorageListPending() {
  return {
    type: FETCH_STORAGE_LIST_PENDING,
  };
}

export function fetchStorageListSuccess(list: Storage[]) {
  return {
    type: FETCH_STORAGE_LIST_SUCCESS,
    list,
  };
}

export function fetchStorageListError(err: FetchErrorInfo) {
  return {
    type: FETCH_STORAGE_LIST_ERROR,
    error: err,
  };
}

export function addNewStoragePending() {
  return {
    type: ADD_NEW_STORAGE_PENDING,
  };
}

export function addNewStorageSuccess() {
  return {
    type: ADD_NEW_STORAGE_SUCCESS,
  };
}

export function addNewStorageError(err: FetchErrorInfo) {
  return {
    type: ADD_NEW_STORAGE_ERROR,
    error: err,
  };
}
