import {
  VALIDATE_LOGIN_PENDING_ACTION,
  VALIDATE_LOGIN_SUCCESS_ACTION,
  VALIDATE_LOGIN_ERROR_ACTION,
  LOGIN_PENDING_ACTION,
  LOGIN_ERROR_ACTION,
  LOGIN_SUCCESS_ACTION
} from "./actions";
import {
  LoginState,
  VALIDATE_LOGIN_PENDING,
  VALIDATE_LOGIN_SUCCESS,
  VALIDATE_LOGIN_ERROR,
  LOGIN_PENDING,
  LOGIN_SUCCESS,
  LOGIN_ERROR
} from "./types";

type ActionType =
  | VALIDATE_LOGIN_PENDING_ACTION
  | VALIDATE_LOGIN_SUCCESS_ACTION
  | VALIDATE_LOGIN_ERROR_ACTION
  | LOGIN_PENDING_ACTION
  | LOGIN_SUCCESS_ACTION
  | LOGIN_ERROR_ACTION;

const initLoginState: LoginState = {
  validatePending: false,
  userInfo: null,
  notlogin: false,
  loginPending: false,
  loginFail: false
};

export const login = (state = initLoginState, action: ActionType) => {
  switch (action.type) {
    case VALIDATE_LOGIN_PENDING:
      return Object.assign({}, state, {
        validatePending: true
      });
    case VALIDATE_LOGIN_SUCCESS:
      return {
        ...state,
        validatePending: false,
        userInfo: action.userinfo
      };
    case VALIDATE_LOGIN_ERROR:
      return {
        ...state,
        validatePending: false,
        notlogin: true,
        fetchError: action.error
      };
    case LOGIN_PENDING:
      return {
        ...state,
        loginFail: false,
        loginPending: true
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        loginPending: false,
        loginFail: false,
        userInfo: action.userinfo
      };
    case LOGIN_ERROR:
      return {
        ...state,
        loginPending: false,
        loginFail: true,
        fetchError: action.error
      };
    default:
      return state;
  }
};
