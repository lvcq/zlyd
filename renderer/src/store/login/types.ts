export const USER_LOGIN = "USER_LOGIN"
export const VALIDATE_LOGIN = "VALIDATE_LOGIN"

export interface LoginState {
  isLogin: boolean;
  userInfo?:UserInfo
}

export interface UserInfo{
  userName:string;
}