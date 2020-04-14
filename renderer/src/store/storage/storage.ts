import { Dispatch, Action } from "redux";
import {
  selectStorage,
  fetchStorageListPending,
  fetchStorageListSuccess,
  fetchStorageListError,
  addNewStoragePending,
  addNewStorageSuccess,
  addNewStorageError,
} from "./actions";
import { push } from "connected-react-router";
import { fetchStorageListApi, addNewStorageApi } from "../../api/storage";

export function setCurrentStorage(id: string) {
  return (dispatch: Dispatch<Action>) => {
    dispatch(push("/zly"));
    dispatch(selectStorage(id));
  };
}

export function fetchStorageList() {
  return (dispatch: Dispatch<Action>) => {
    dispatch(fetchStorageListPending());
    fetchStorageListApi()
      .then((res) => {
        dispatch(fetchStorageListSuccess(res));
        if (res && res.length) {
          dispatch(selectStorage(res[0].id));
        }
      })
      .catch((err) => {
        dispatch(fetchStorageListError(err));
      });
  };
}

export interface NewStorage {
  storage_name: string;
}
export function addNewStorage(ns: NewStorage) {
  return (dispatch: Dispatch<Action>) => {
    dispatch(addNewStoragePending());
    addNewStorageApi(ns)
      .then((res) => {
        dispatch(addNewStorageSuccess());
        dispatch(push("/zly"));
        fetchStorageList()(dispatch as any);
      })
      .catch((err) => {
        dispatch(addNewStorageError(err));
      });
  };
}
