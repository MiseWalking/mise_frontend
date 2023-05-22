/* eslint-disable */
import instance from "../../config/axios-config";

export class apiService {
  static async getRain() {
    const today = new Date();
    const year = today.getFullYear();
    const month = ("0" + (today.getMonth() + 1)).slice(-2);
    const day = ("0" + today.getDate()).slice(-2);
    let resJson = {};

    await instance.get("/data/gang?date=" + year + month + day).then((res) => {
      const { POP: rainPercent, REH: humidity, PCP: rainPerHour } = res.data;
      resJson = { rainPercent, humidity, rainPerHour };
    });
    return resJson;
  }

  static async getDust() {
    let resJson = {};
    await instance.get("/data/mise?gu=111141").then((res) => {
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

    await instance
      .get("/data/weather?date=" + year + month + day)
      .then((res) => {
        console.log(res);
        const { TMP: temperature } = res.data;
        resJson = { temperature };
      });

    let d = new Date();
    d.setDate(d.getDate() - 1);
    const prev = ("0" + d.getDate()).slice(-2);
    await instance
      .get("/data/weather?date=" + year + month + prev)
      .then((res) => {
        const { TMP: prevTemp } = res.data;
        const diff = resJson.temperature - prevTemp;
        let msg;
        if (diff > 0) msg = "어제보다 " + diff + "° 높아요";
        else msg = "어제보다 " + -diff + "° 낮아요";
        resJson.msg = msg;
      });
    return resJson;
  }
}
