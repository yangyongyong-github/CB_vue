import request from "./request";
import delay from "@/utils/delay";

/**
 * 拿到 rate
 */
export async function getRateData(id) {
  await delay(1000);
  const resp = await request().post(`/api/rate/query`, { id });
  return resp.data;
}

/**
 * 拿到 bank
 */
export async function getBankData(id) {
  await delay(1000);
  const resp = await request().post(`/api/bank/query`, { id });
  return resp.data;
}

/**
 * set bank corpus
 */
export async function updateBankCorpus(id,newCorpus){
   await delay(1000);
  const resp = await request().post(`/api/bank/update`, { id,newCorpus });
  return resp.data;
}
/**
 * 拿到 users
 */
 export async function getUsersData(id) {
  await delay(1000);
  const resp = await request().post(`/api/users/query`);
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
  const resp = await request().post("/api/rate/updata", { id, rateObj })
  return resp.data;
}

// 这里可以考虑将 rate bank 进行合并，因为操做业务逻辑相同