/* eslint-disable */
import instance from "../../config/axios-config";
// import { cookie } from "react-cookie";

import cookie from "react-cookies";
// const cookie = new cookie();

export class userService {
  static async signUp(username, password, age, gender, height, objective) {
    let reqJson = {
      username,
      password,
      age,
      gender,
      height,
      objective,
    };
    await instance.post("/user/signup", reqJson).then((res) => {
      const resJson = res.data;
      if (res.status == 201) alert("회원가입 완료");
      return resJson;
    });
  }
  static async logIn(username, password) {
    let reqJson = {
      username,
      password,
    };
    await instance.post("/user/login", reqJson).then(async (res) => {
      const resJson = res.data;
      await this.setUserCookie(username);
      if (res.status == 200) {
        alert("로그인 완료");
        return resJson;
      } else {
        alert("Invalid username or password");
      }
      return resJson;
    });
  }

  static async setUserCookie(username) {
    let userId = "";
    await instance.get("user/" + username).then((res) => {
      const { user } = res.data;
      userId = user.id;
    });
    const cookieData = { username, isLogged: true, userId };
    const expires = new Date();
    expires.setHours(expires.getHours() + 1); //로그인 만료 1시간으로 설정
    cookie.save("userInfo ", cookieData, {
      path: "/",
      expires,
      secure: false,
      httpOnly: false,
    });
  }

  static async getUserInfo(username) {
    let resJson = {};
    await instance.get("user/" + username).then((res) => {
      resJson = res.data;
    });
    return resJson;
  }

  static async createWeight(userId, weight, date) {
    let reqJson = {
      userId,
      weight,
      date,
    };
    await instance.post("/weight", reqJson).then((res) => {
      const resJson = res.data;
      if (res.status == 201) alert("입력 성공");
      else alert("입력값 재확인 요망");
    });
  }

  static async getWeightByUserId(userId) {
    let resJson = {};

    console.log(userId);
    if (userId == undefined) {
      let userCookie = await cookie.load("userInfo");
      userId = userCookie.userId;
    }
    await instance.get("weight/" + userId).then((res) => {
      resJson = res.data;
    });
    return resJson;
  }
}
