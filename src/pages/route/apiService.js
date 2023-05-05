/* eslint-disable */
import instance from "../../config/axios-config";

export class apiService {
  static async getRain() {
    const today = new Date();
    const year = today.getFullYear();
    const month = ("0" + (today.getMonth() + 1)).slice(-2);
    const day = ("0" + today.getDate()).slice(-2);
    let resJson = {};

    await instance.get("/gang?date=" + year + month + day).then((res) => {
      const { POP: rainPercent, REH: humidity, PCP: rainPerHour } = res.data;
      resJson = { rainPercent, humidity, rainPerHour };
    });
    return resJson;
  }

  static async getDust() {
    let resJson = {};
    await instance.get("/mise?gu=111141").then((res) => {
      const { gu: location, pm10: dustPercent } = res.data;
      resJson = { location, dustPercent };
    });
    return resJson;
  }

  static async getWeather() {
    const today = new Date();
    const year = today.getFullYear();
    const month = ("0" + (today.getMonth() + 1)).slice(-2);
    const day = ("0" + today.getDate()).slice(-2);
    let resJson = {};

    await instance.get("/weather?date=" + year + month + day).then((res) => {
      const { TMP: temperature } = res.data;
      resJson = { temperature };
    });
    return resJson;
  }
}
