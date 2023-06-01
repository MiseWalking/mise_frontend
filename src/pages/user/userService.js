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
      console.log(res);
      if (res.status == 201) alert("회원가입 완료");
      return resJson;
    });
  }
  static async logIn(username, password) {
    let reqJson = {
      username,
      password,
    };
    await instance.post("/user/login", reqJson).then((res) => {
      const resJson = res.data;
      if (res.status == 200) {
        const cookieData = { username, isLogged: true };
        const expires = new Date();
        expires.setHours(expires.getHours() + 1); //로그인 만료 1시간으로 설정
        cookie.save("userInfo ", cookieData, {
          path: "/",
          expires,
          secure: false,
          httpOnly: false,
        });
        alert("로그인 완료");
        return resJson;
      } else {
        alert("Invalid username or password");
      }
      return resJson;
    });
  }
}
