import request from "./request";
import { delay } from "./utils";

/**
    设置本金curpos:增减操做
 */
export async function setCurpos(num) {
    await delay(2000);
    const resp = await request().post("/api/admin/setcurpos", { num })
    return resp.data;
}

/**
 * 设置冻结/解冻用户
 * 调用函数，自动执行取反即可
 */
export async function setFreeze() {
    await delay(2000);
    const resp = await request().post("/api/admin/setfreeze")
    return resp.data;
}

/**
 * 设置/取消大额贷款限制
 * 调用函数，自动执行取反即可
 */
 export async function setLimited() {
    await delay(2000);
    const resp = await request().post("/api/admin/setlimit")
    return resp.data;
}

/**
 * 设置利率 Rate
 * @param {*} cage 选择类型 key, A 、A_1、L_s
 * @param {*} num value：数值
 */
export async function setRate(cage, value) {
    await delay(2000);
    const resp = await request().post("/api/admin/setrate", { cage, value })
    return resp.data;
}