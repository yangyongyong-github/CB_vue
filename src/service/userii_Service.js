import request from "./request";
import { delay } from "./utils";

/**
 *  adduser : register 注册(添加)新用户
 */
export async function adduser(userObj) {
    await delay(2000);
    const resp = await request().post("/api/userii/adduser", userObj);
    return resp.data;
}


/**
 *   deposit & take
 */
export async function updata(userObj) {
    await delay(2000);
    console.log("service : ", userObj); // und ?
    const resp = await request().post("/api/userii/updata", userObj);
    return resp.data;
}
