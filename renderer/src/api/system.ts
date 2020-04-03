import { get, RInfo, postJson } from "./fetch";
import { UserInfo } from "../store/login/types";

export function judgeIsLogOn() {
  const info: RInfo = {
    url: "validate-logon"
  };
  return get<UserInfo>(info);
}

export function isInit() {
  const req: RInfo = {
    url: "is-init"
  };
  return get<boolean>(req);
}

export function setRootInfo(data: any) {
  const req: RInfo = {
    url: "set-root-info",
    data
  };
  return postJson<boolean>(req);
}

export function userLoginApi(data: any) {
  const req: RInfo = {
    url: "user-login",
    data
  };
  return postJson<UserInfo>(req);
}
