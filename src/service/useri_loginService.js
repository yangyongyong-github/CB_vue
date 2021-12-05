import request from "./request";
import { delay } from "./utils";


export async function login(loginId, loginPwd) {
  await delay(2000);
  const resp = await request().post("/api/useri/login", { loginId, loginPwd });
  return resp.data;
}

export function loginOut() {
  localStorage.removeItem("token");// 登录状态信息，身份
  /*
    退出后，清除浏览器的缓存 .clear()
    优势：
      - 便于下次登录时(设置)拿到数据库中的最新的数据，而不是缓存的脏数据
      - 安全性

    如果退出时，上一次的部分数据没有清除时，LocalStorage处理方式：
      新的数据覆盖掉 ？ 使用上一次的？
*/
  // localStorage.removeItem("useri-name");// 一次次的清除
  localStorage.clear();// 全部一次清除 ？那 rate怎么办？

}

export async function whoAmI() {
  await delay(2000);
  const resp = await request().get("/api/useri/whoami");
  return resp.data;
}
