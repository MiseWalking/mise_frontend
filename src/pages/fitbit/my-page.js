import Navigator from "../nav/nav";
import { useEffect, useState } from "react";
import { fitbitService } from "./fitbitService.js";
import ActivityTable from "./table";
import "./my-page.css";
import unknown from "../../assets/img/unknown.jpeg";
import MyGraph from "./graph";
import TextField from "@mui/material/TextField";
import { userService } from "../user/userService";
import cookie from "react-cookies";

function MyPage() {
  const [userInfo, setUserInfo] = useState({});
  const [weightInfo, setWeightInfo] = useState({});
  const [weightInput, setWeightInput] = useState(0);
  const [dateInput, setDateInput] = useState();

  const saveWeight = (event) => {
    setWeightInput(event.target.value);
  };
  const saveDate = (event) => {
    setDateInput(event.target.value);
  };

  useEffect(() => {
    getUserInfo();
    setUserWeight();
  }, []);

  async function getUserInfo() {
    let userCookie = await cookie.load("userInfo");
    const username = userCookie.username;
    const { user } = await userService.getUserInfo(username);
    setUserInfo(user);
  }
  async function setUserWeight() {
    const resJson = await userService.getWeightByUserId(userInfo.id);
  }

  return (
    <>
      <Navigator></Navigator>
      <div className="myPage">
        <br />
        <br />
        <div className="contents">
          <div className="left-cnt">
            <div className="profile">
              <img className="circle" src={unknown}></img>
            </div>
            <div className="profile-info">
              {userInfo.username}({userInfo.gender},{userInfo.age})<br />
              user Height : {userInfo.height}
              <br />
              Konkuk Univ Seoul
              <br /> South Korea
              <br /> https://buly.kr/31Oe4BT
            </div>
          </div>
          <div className="right-cnt">
            <div className="input-box">
              몸무게{" "}
              <input
                type="text"
                className="weight-input"
                onChange={saveWeight}
                value={weightInput}
              />
              날짜
              <input
                type="Date"
                className="weight-input"
                onChange={saveDate}
                value={dateInput}
              />
              <button
                className="weight-button"
                onClick={async () => {
                  await userService.createWeight(
                    userInfo.id,
                    weightInput,
                    dateInput
                  );
                }}
              >
                입력
              </button>
            </div>
            <MyGraph></MyGraph>
          </div>
        </div>
        <div className="activity-table">
          <ActivityTable></ActivityTable>
        </div>
      </div>
    </>
  );
}

export default MyPage;
