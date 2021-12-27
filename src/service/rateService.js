import request from "./request";
import delay from "@/utils/delay";

/**
 * 拿到 rate
 * @param {} id 
 * @returns 
 */
export async function getRate(id) {
    await delay(1000);
    console.log('service id : ', id);
    const resp = await request().post("/api/rate", { id });
    console.log('service resp : ', resp);
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

// 这里可以考虑将 rate bank 进行合并，因为操做业务逻辑相同