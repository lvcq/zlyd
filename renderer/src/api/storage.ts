import { RInfo, get } from "./fetch";
import { Storage } from "../store/storage/types";

export function fetchStorageListApi() {
  const info: RInfo = {
    url: "storege-list",
  };
  return get<Storage[]>(info);
}
