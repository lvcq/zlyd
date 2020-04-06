import { Dispatch, Action } from "redux";
import { push } from "connected-react-router";
import {
  loginPending,
  loginSuccess,
  loginError,
  closeLoginInfo
} from "./actions";
import { userLoginApi } from "../../api/system";
import { cryptoPassword } from "../../tools/auth";

export function userLogin(username: string, password: string) {
  const timestamp = new Date().getTime();
  const cryptoStr = cryptoPassword(username, password, timestamp);

  return (dispatch: Dispatch<Action>) => {
    dispatch(loginPending());
    userLoginApi({ username, password: cryptoStr, timestamp })
      .then(res => {
        dispatch(loginSuccess(res));
        dispatch(push("/zly"));
      })
      .catch(err => {
        dispatch(loginError(err));
      });
  };
}

export function closeLoginErrorInfo() {
  return (dispatch: Dispatch<Action>) => {
    dispatch(closeLoginInfo());
  };
}
