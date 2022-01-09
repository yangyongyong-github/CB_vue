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
 * 拿到 users , 所有 useri userii 
 */
 export async function getUsersData(id) {
  await delay(1000);
  const resp = await request().post(`/api/users/query`);
  return resp.data;
}

// ============ alter ============
/**
 * alter bank
 */
export async function updateRate(id, rateObj) {
  await delay(1000);
  const resp = await request().post("/api/rate/update", { id, rateObj })
  return resp.data;
}

/**
 * alter bank
 */
 export async function updateBank(id, bankObj) {
  await delay(1000);
  const resp = await request().post("/api/bank/update", { id, bankObj })
  return resp.data;
}

// 这里可以考虑将 rate bank 进行合并，因为操做业务逻辑相同