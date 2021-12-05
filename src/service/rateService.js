import request from "./request";
import { delay } from "./utils";

/**
 * 拿到 rate
 * @param {} id 
 * @returns 
 */
export async function getRate(id) {
    await delay(1000);
    const resp = await request().post("/api/rate", { id })
    return resp.data;
}


/**
 * 修改 rate中的数据
 * @param {*} id 
 * @param {*} rateObj 
 * @returns 
 */
export async function updateRate(id, rateObj) {
    await delay(2000);
    const resp = await request().post("/api/admin/rate", { id, rateObj })
    return resp.data;
}