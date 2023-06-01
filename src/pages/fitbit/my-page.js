import Navigator from "../nav/nav";
import { useEffect, useState } from "react";
import { fitbitService } from "./fitbitService.js";
import ActivityTable from "./table";
import "./my-page.css";
import ppoyam from "../../assets/img/뽀야미.jpeg";
import MyResponsiveLine from "./graph";
import TextField from "@mui/material/TextField";

function MyPage() {
  const [userInfo, setUserInfo] = useState({});
  const [activityData, setActivityData] = useState({});
  const [logdata, setLogData] = useState({});

  useEffect(() => {
    getUserInfo();
  }, []);

  async function getUserInfo() {
    const { user } = await fitbitService.getUserInfo();
    const { activities } = await fitbitService.getDailyData();
    const { activities: logData } = await fitbitService.getLogList();

    setUserInfo(user);
    setActivityData(activities);
    setLogData(logData);
  }

  return (
    <>
      <Navigator></Navigator>
      <div className="myPage">
        {/* <div className="profile">Activities</div> */}
        <br />
        <br />
        <div className="contents">
          <div className="left-cnt">
            <div className="profile">
              <img className="circle" src={ppoyam}></img>
            </div>
            <div className="profile-info">
              {userInfo.dateOfBirth}({userInfo.age})<br />
              {userInfo.displayName}
              <br />
              Konkuk Univ Seoul
              <br /> South Korea
              <br /> https://buly.kr/31Oe4BT
            </div>
          </div>
          <div className="right-cnt">
            <div className="input-box">
              몸무게 <input type="text" className="weight-input" />
              날짜 <input type="Date" className="weight-input" />
              <button className="weight-button">입력</button>
            </div>
            <MyResponsiveLine></MyResponsiveLine>
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
