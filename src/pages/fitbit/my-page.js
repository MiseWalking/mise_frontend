import Navigator from "../nav/nav";
import { useEffect, useState } from "react";
import { fitbitService } from "./fitbitService.js";
import ActivityTable from "./table";
import "./my-page.css";
import ppoyam from "../../assets/img/뽀야미.jpeg";
import MyResponsiveLine from "./graph";

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
            <MyResponsiveLine></MyResponsiveLine>
          </div>
        </div>
        <ActivityTable></ActivityTable>
      </div>
    </>
  );
}

export default MyPage;
