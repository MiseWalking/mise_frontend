/* eslint-disable */
import { lambdaInstance, instance } from "../../config/axios-config";

import * as guList from "./gu.json";
export class apiService {
  static async getRain() {
    const today = new Date();
    const year = today.getFullYear();
    const month = ("0" + (today.getMonth() + 1)).slice(-2);
    const day = ("0" + (today.getDate() - 1)).slice(-2);
    let resJson = {};

    await lambdaInstance
      .get("/data/gang?date=" + year + month + day)
      .then((res) => {
        const { POP: rainPercent, REH: humidity, PCP: rainPerHour } = res.data;
        resJson = { rainPercent, humidity, rainPerHour };
      });
    return resJson;
  }

  static async getDust() {
    let resJson = {};
    await lambdaInstance.get("/data/mise?gu=111141").then((res) => {
      const { gu: location, pm10: dustPercent } = res.data;
      resJson = { location, dustPercent };
    });
    return resJson;
  }

  static async getWeather() {
    const today = new Date();
    const year = today.getFullYear();
    const month = ("0" + (today.getMonth() + 1)).slice(-2);
    const day = ("0" + (today.getDate() - 1)).slice(-2);
    let resJson = {};

    await lambdaInstance
      .get("/data/weather?date=" + year + month + day)
      .then((res) => {
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

  static async getRoute(locationName) {
    const today = new Date();
    const year = today.getFullYear();
    const month = ("0" + (today.getMonth() + 1)).slice(-2);
    const day = ("0" + (today.getDate() - 1)).slice(-2);

    const locationInfo = guList[locationName];
    const reqJson = {
      gu: locationInfo.code,
      imageId: locationInfo.index,
      date: year + month + day,
    };
    let recommendedIndex = 0;
    let resJson = {};

    await lambdaInstance
      .get("/route/" + locationInfo.index, { params: reqJson })
      .then((res) => {
        const { flag, routes } = res.data;
        const lRoutes = routes.slice(0, 3);
        const rRoutes = routes.slice(3, 6);
        for (let i in routes)
          if (routes[i].recommended == true) {
            recommendedIndex = i;
            break;
          }
        resJson = { flag, lRoutes, rRoutes, recommendedIndex };
      });
    return resJson;
  }
}
