import { USER_LOGIN, VALIDATE_LOGIN } from "./types";
import { judgeIsLogOn } from "../../api/system";
import { Dispatch } from "react";
import { UserInfo } from "./types";

export interface USER_LOGIN_ACTION {
  type: typeof USER_LOGIN;
  username: string;
  password: string;
}

export interface VALIDATE_LOGIN_ACTION {
  type: typeof VALIDATE_LOGIN;
  userinfo: UserInfo | null;
}

export function userLogin(username: string, password: string) {
  return {
    type: USER_LOGIN,
    username,
    password
  };
}

export function validateLogin() {
  return (dispatch: Dispatch<VALIDATE_LOGIN_ACTION>) => {
    judgeIsLogOn().then(res => {
      dispatch({ type: VALIDATE_LOGIN, userinfo: res });
    });
  };
}
