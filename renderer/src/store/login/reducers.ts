import { USER_LOGIN_ACTION, VALIDATE_LOGIN_ACTION } from "./actions";
import { USER_LOGIN, LoginState, VALIDATE_LOGIN } from "./types";

type ActionType = USER_LOGIN_ACTION | VALIDATE_LOGIN_ACTION;

const initLoginState: LoginState = {
  isLogin: false,
  userInfo: undefined
};

export const login = (state = initLoginState, action: ActionType) => {
  switch (action.type) {
    case USER_LOGIN:
      return Object.assign({}, state, {
        isLogin: true
      });
    case VALIDATE_LOGIN:
      return Object.assign({}, state, { userInfo: action.userinfo });
    default:
      return state;
  }
};
