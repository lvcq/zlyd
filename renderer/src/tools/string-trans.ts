// 使用utf-8字符集进行base64编码
export function utoa(str: string) {
  return window.btoa(unescape(encodeURIComponent(str)));
}
// 使用utf-8字符集解析base64字符串
export function atou(str: string) {
  return decodeURIComponent(escape(window.atob(str)));
}
