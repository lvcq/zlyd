import { judgeIsLogOn } from "../../api/system";
import { Dispatch } from "react";
import {
  validateLoginPending,
  validateLoginSuccess,
  validateLoginError
} from "./actions";

export function validateLogin() {
  return (dispatch: Dispatch<any>) => {
    dispatch(validateLoginPending());
    judgeIsLogOn()
      .then(res => {
        dispatch(validateLoginSuccess(res));
      })
      .catch(err => {
        dispatch(validateLoginError(err));
      });
  };
}
