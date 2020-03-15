
import { get, RInfo } from './fetch';

export function judgeIsLogOn() {
  const info: RInfo = {
    url: 'validate-logon'
  }
  return get(info)
}