import { baseUrl } from '../tools/config';

export function get(info: RInfo) {
  return fetch(`${baseUrl}/${info.url}`, {
    method: 'GET'
  })
}

export function post() {

}

export interface RInfo {
  url: string;
  data?: { [key: string]: string };
  headers?: { [key: string]: string };
}