import { baseUrl } from "../tools/config";

export function get<T>(info: RInfo): Promise<T> {
  return new Promise((resolve, reject) => {
    fetch(`${baseUrl}/${info.url}`, {
      method: "GET",
      credentials: "include"
    })
      .then(res => {
        return res.json();
      })
      .then((json: ResponseJson<T>) => {
        if (json.success && json.code === 20000) {
          resolve(json.data);
        } else {
          reject({ code: json.code, msg: json.message });
        }
      })
      .catch(err => {
        reject({ code: 0, msg: "网络错误" });
      });
  });
}

export function postJson<T>(info: RInfo): Promise<T> {
  return new Promise((resolve, reject) => {
    fetch(`${baseUrl}/${info.url}`, {
      body: info.data ? JSON.stringify(info.data) : "",
      method: "POST",
      credentials: "include",
      headers: Object.assign(
        {
          "Content-Type": "application/json"
        },
        info.headers
      )
    })
      .then(res => {
        return res.json();
      })
      .then((json: ResponseJson<T>) => {
        if (json.success && json.code === 20000) {
          resolve(json.data);
        } else {
          reject({ code: json.code, msg: json.message });
        }
      })
      .catch(err => {
        reject({ code: 0, msg: "网络错误" });
      });
  });
}

export interface RInfo {
  url: string;
  data?: { [key: string]: string };
  headers?: { [key: string]: string };
}

export interface ResponseJson<T> {
  success: boolean;
  message: string;
  code: number;
  data: T;
}
