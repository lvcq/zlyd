import { FetchError } from "../../api";
/** 验证是否登录 */
export const VALIDATE_LOGIN_PENDING = "VALIDATE_LOGIN_PENDING";
export const VALIDATE_LOGIN_SUCCESS = "VALIDATE_LOGIN_SUCCESS";
export const VALIDATE_LOGIN_ERROR = "VALIDATE_LOGIN_ERROR";
/** 用户登录 */
export const LOGIN_PENDING = "LOGIN_PENDING";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_ERROR = "LOGIN_ERROR";
export const CLOSE_LOGIN_ERROR_INFO= "CLOSE_LOGIN_ERROR_INFO";

export interface LoginState {
  validatePending: boolean;
  userInfo: UserInfo | null;
  fetchError?: FetchError;
  notlogin: boolean;
  loginPending:boolean;
  loginFail:boolean;
}

export interface UserInfo {
  userName: string;
}
