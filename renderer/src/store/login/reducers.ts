import { USER_LOGIN_ACTION } from './actions';
import { USER_LOGIN, LoginState } from './types';

type ActionType = USER_LOGIN_ACTION;

const initLoginState: LoginState = {
  isLogin: false
}

export const login = (state = initLoginState, action: ActionType) => {
  switch (action.type) {
    case USER_LOGIN:
      return Object.assign({}, state, {
        isLogin: true
      })
    default:
      return state;
  }
}