import request from "./request";
import delay from "@/utils/delay";


/**
 * login func 
 * @param {*} loginId 
 * @param {*} loginPwd 
 * @param {*} flag : admin useri userii 
 *    - 可以实现通用 身份标识符：仅仅在client登录的时候提示
 * @returns 
 */

export async function login(loginId, loginPwd, flag) {
  await delay(2000);
  const resp = await request().post(`/api/${flag}/login`, { loginId, loginPwd });
  return resp.data;
}

export function loginOut() {
  localStorage.removeItem("token");
  localStorage.clear();
}

export async function whoAmI(flag) {
  // await delay(2000);
  const resp = await request().get(`/api/${flag}/login`);
  return resp.data;
}


// query: account
export async function query(account, flag) {
  await delay(2000);
  // console.log('will go ', account, flag)
  const resp = await request().post(`/api/${flag}/query`, { account });
  return resp.data;
}

// delete: account
export async function deleteUserData(account, flag) {
  await delay(2000);
  // console.log('will go ', account, flag)
  const resp = await request().post(`/api/${flag}/delete`, { account });
  return resp.data;
}


/**
 *  adduser : register 注册(添加)新用户
 */
export async function adduser(userObj) {
  await delay(2000);
  const resp = await request().post(`/api/${userObj.flag}/adduser`, userObj);
  return resp.data;
}

// ================== [ useri & userii ] =======================

/**
 *   deposit & take
 */
export async function updata(userObj) {
  await delay(2000);
  // console.log("service : ", userObj);
  const resp = await request().post(`/api/${userObj.flag}/updata`, userObj);
  return resp.data;
}

// ================ admin operation ============================

export async function getAllUsersData() {
  await delay(1000);
  const resp = await request().post('/api/users');
  return resp.data;
}
