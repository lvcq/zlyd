import { RInfo, postFormData, postJson } from "./fetch";

export function uploadNewFile(fileInfo: any, header: any = {}) {
  const info: RInfo = {
    url: "upload-file",
    data: fileInfo,
    headers: header
  };
  return postFormData<string | null>(info);
}


export function checkFileExist(hash: string) {
  const info: RInfo = {
    url: "check-file-exist",
    data: { hash }
  }
  return postJson<boolean>(info);
}

export function refExistFile(hash: string, storage_id: string, file_name: string) {
  const info: RInfo = {
    url: 'add-exist-file',
    data: {
      hash,
      storage_id,
      file_name,
    }
  }
  return postJson<string | null>(info);
}