import { combineReducers, createStore, applyMiddleware } from "redux";
import thunkMiddleware from "redux-thunk";
import { connectRouter, routerMiddleware } from "connected-react-router";
import { createHashHistory } from "history";
import { LoginState } from "./login/types";
import { StorageState } from "./storage/types";
import { login } from "./login/reducers";
import { storage } from "./storage/reducers";
import { file } from "./file/reducers";
import { FileState } from "./file/types";

export const history = createHashHistory();

export const zlydStore = createStore(
  combineReducers({ router: connectRouter(history), login, storage, file }),
  applyMiddleware(thunkMiddleware, routerMiddleware(history))
);

export interface ZlyState {
  login: LoginState;
  storage: StorageState;
  file: FileState;
}
