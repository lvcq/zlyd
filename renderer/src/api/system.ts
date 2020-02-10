
import { get, RInfo } from './fetch';

export function judgeIsLogOn() {
  const info: RInfo = {
    url: 'is-logged'
  }
  return get(info)
}