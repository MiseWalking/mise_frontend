/* eslint-disable */
import instance from "../../config/axios-config";

export class fitbitService {
  static async getUserInfo() {
    let resJson = {};
    await instance.get("/fitbit/userInfo").then((res) => {
      resJson = res.data;
    });
    return resJson;
  }
  static async getDailyData() {
    let resJson = {};
    await instance.get("/fitbit/dailyActivity").then((res) => {
      resJson = res.data;
    });
    return resJson;
  }
  static async getLogList() {
    let resJson = {};
    await instance.get("/fitbit/getActivityLogList").then((res) => {
      resJson = res.data;
    });
    return resJson;
  }
}
