import { USER_LOGIN } from './types';

export interface USER_LOGIN_ACTION {
  type: typeof USER_LOGIN,
  username: string,
  password: string
}

export function userLogin(username: string, password: string) {
  return {
    type: USER_LOGIN,
    username,
    password
  }
}