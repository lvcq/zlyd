import {
  VALIDATE_LOGIN_PENDING,
  VALIDATE_LOGIN_ERROR,
  VALIDATE_LOGIN_SUCCESS,
  LOGIN_PENDING,
  LOGIN_SUCCESS,
  LOGIN_ERROR
} from "./types";
import { UserInfo } from "./types";
import { FetchError } from "../../api";

export interface VALIDATE_LOGIN_PENDING_ACTION {
  type: typeof VALIDATE_LOGIN_PENDING;
}

export interface VALIDATE_LOGIN_SUCCESS_ACTION {
  type: typeof VALIDATE_LOGIN_SUCCESS;
  userinfo: UserInfo;
}

export interface VALIDATE_LOGIN_ERROR_ACTION {
  type: typeof VALIDATE_LOGIN_ERROR;
  error: FetchError;
}

export interface LOGIN_PENDING_ACTION {
  type: typeof LOGIN_PENDING;
}

export interface LOGIN_SUCCESS_ACTION {
  type: typeof LOGIN_SUCCESS;
  userinfo: UserInfo;
}

export interface LOGIN_ERROR_ACTION {
  type: typeof LOGIN_ERROR;
  error: FetchError;
}

export function validateLoginPending() {
  return {
    type: VALIDATE_LOGIN_PENDING
  };
}

export function validateLoginSuccess(userinfo: UserInfo) {
  return {
    type: VALIDATE_LOGIN_SUCCESS,
    userinfo
  };
}

export function validateLoginError(error: FetchError) {
  return {
    type: VALIDATE_LOGIN_ERROR,
    error
  };
}

export function loginPending() {
  return {
    type: LOGIN_PENDING
  };
}

export function loginSuccess(userinfo: UserInfo) {
  return {
    type: LOGIN_SUCCESS,
    userinfo
  };
}

export function loginError(error: FetchError) {
  return {
    type: LOGIN_ERROR,
    error
  };
}
