import { Dispatch, Action } from "redux";
import {
  selectStorage,
  fetchStorageListPending,
  fetchStorageListSuccess,
  fetchStorageListError,
} from "./actions";
import { fetchStorageListApi } from "../../api/storage";

export function setCurrentStorage(id: string) {
  return (dispatch: Dispatch<Action>) => {
    dispatch(selectStorage(id));
  };
}

export function fetchStorageList() {
  return (dispatch: Dispatch<Action>) => {
    dispatch(fetchStorageListPending());
    fetchStorageListApi()
      .then((res) => {
        dispatch(fetchStorageListSuccess(res));
      })
      .catch((err) => {
        dispatch(fetchStorageListError(err));
      });
  };
}
