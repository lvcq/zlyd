import { RInfo, get, postJson } from "./fetch";
import { Storage } from "../store/storage/types";

export function fetchStorageListApi() {
  const info: RInfo = {
    url: "user-storage-list",
  };
  return get<Storage[]>(info);
}

export function addNewStorageApi(newStorage: any) {
  const info: RInfo = {
    url: "add-new-storage",
    data: newStorage,
  };
  return postJson<boolean>(info);
}
