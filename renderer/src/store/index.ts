import { combineReducers, createStore, applyMiddleware } from "redux";
import { LoginState } from "./login/types";
import { userLogin } from "./login/actions";
import { login } from "./login/reducers";
import thunkMiddleware from "redux-thunk";

export const zlydStore = createStore(
  combineReducers({ login }),
  applyMiddleware(thunkMiddleware)
);

export interface ZlyState {
  login: LoginState;
}
export { userLogin };
