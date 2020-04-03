import { sha3_256 } from "js-sha3";

export function cryptoPassword(
  username: string,
  password: string,
  timestamp: number
) {
  let hash = sha3_256(password);
  console.log(hash);
  console.log(`${username}-${timestamp}`);
  return sha3_256(`${hash}-${username}-${timestamp}`);
}
