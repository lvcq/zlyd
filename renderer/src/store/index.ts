import { combineReducers } from 'redux'
import { LoginState } from './login/types';
import { userLogin } from './login/actions';
import { login } from './login/reducers';


export const zlydStore = combineReducers({ login })
export interface ZlyState {
  login: LoginState
}
export { userLogin };
