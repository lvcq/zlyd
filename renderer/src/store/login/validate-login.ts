import { judgeIsLogOn } from "../../api/system";
import { Dispatch } from "react";
import {
  validateLoginPending,
  validateLoginSuccess,
  validateLoginError,
} from "./actions";
import { push } from "connected-react-router";
import { fetchStorageList } from "../storage/storage";
import { Action } from "redux";

export function validateLogin() {
  return (dispatch: Dispatch<Action>) => {
    dispatch(validateLoginPending());
    judgeIsLogOn()
      .then((res) => {
        dispatch(validateLoginSuccess(res));
        fetchStorageList()(dispatch as any);
      })
      .catch((err) => {
        dispatch(validateLoginError(err));
        dispatch(push("/login"));
      });
  };
}
