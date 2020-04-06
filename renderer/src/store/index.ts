import { combineReducers, createStore, applyMiddleware } from "redux";
import { LoginState } from "./login/types";
import { login } from "./login/reducers";
import thunkMiddleware from "redux-thunk";
import { connectRouter, routerMiddleware } from "connected-react-router";
import { createHashHistory } from "history";

export const history = createHashHistory();

export const zlydStore = createStore(
  combineReducers({ router: connectRouter(history), login }),
  applyMiddleware(thunkMiddleware, routerMiddleware(history))
);

export interface ZlyState {
  login: LoginState;
}
