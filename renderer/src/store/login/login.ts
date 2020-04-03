import { Dispatch } from "redux";
import { loginPending, loginSuccess, loginError } from "./actions";
import { userLoginApi } from "../../api/system";
import { cryptoPassword } from "../../tools/auth";

export function userLogin(username: string, password: string) {
  const timestamp = new Date().getTime();
  const cryptoStr = cryptoPassword(username, password, timestamp);

  return (dispatch: Dispatch<any>) => {
    dispatch(loginPending());
    userLoginApi({ username, password: cryptoStr, timestamp })
      .then(res => {
        dispatch(loginSuccess(res));
      })
      .catch(err => {
        dispatch(loginError(err));
      });
  };
}
