import request from "./request";
import { delay } from "./utils";


export async function login(loginId, loginPwd) {
  await delay(2000);
  const resp = await request().post("/api/userii/login", { loginId, loginPwd });
  return resp.data;
}

export function loginOut() {
  localStorage.removeItem("token");// 登录状态信息，身份
  localStorage.clear();// 全部一次清除 ？那 rate怎么办？

}

export async function whoAmI() {
  await delay(2000);
  const resp = await request().get("/api/userii/whoami");
  return resp.data;
}

// query:account
export async function query(account) {
  await delay(2000);
  const resp = await request().post("/api/userii/query", { account });
  return resp.data;
}