import Navigator from "../nav/nav";
import { useEffect, useState } from "react";
import { fitbitService } from "./fitbitService.js";
import "./my-page.css";

function MyPage() {
  const [userInfo, setUserInfo] = useState({});
  const [activityData, setActivityData] = useState({});
  const [logdata, setLogData] = useState({});

  useEffect(() => {
    getUserInfo();
  }, []);

  async function getUserInfo() {
    //accessToken, userId
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
      myPage
      <button
        onClick={() => {
          getUserInfo();
        }}
      ></button>
      <img src="https://static0.fitbit.com/images/profile/defaultProfile_150.png"></img>
      {userInfo.dateOfBirth}({userInfo.age}){userInfo.displayName}
    </>
  );
}

export default MyPage;
