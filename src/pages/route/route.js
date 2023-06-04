import Navigator from "../nav/nav";
import "./route.css";
import { useEffect, useState } from "react";
import Modal from "react-modal";
import sunImage from "../../assets/img/sun.png";
import rainImage from "../../assets/img/rain.png";
import dustImage from "../../assets/img/dust.png";
import moonImage from "../../assets/img/moon.png";
import dust0 from "../../assets/img/dust0.png";
import dust1 from "../../assets/img/dust1.png";
import dust2 from "../../assets/img/dust2.png";
import dust3 from "../../assets/img/dust3.png";

import { apiService } from "./apiService";
function RoutePage() {
  const [location, setLocation] = useState(localStorage.getItem("location"));
  const [routeInfo, setRouteInfo] = useState({});
  const [tempArr, setArr] = useState([]);

  const [rainPercent, setRainPercent] = useState();
  const [rainPerHour, setRainPerHour] = useState();
  const [humidity, setHumidity] = useState();
  const [dustPercent, setDust] = useState();
  const [temperature, setTemperature] = useState();
  const [msg, setMsg] = useState();
  const [hour, setHour] = useState();
  const [status, setStatus] = useState();

  const [isOpen, setOpen] = useState(false);
  const [nowImage, setImage] = useState();
  useEffect(() => {
    getRain();
    getDust();
    getTemp();
    getRoute();
    const date = new Date();
    setHour(date.getHours());
    if (dustPercent < 30) setStatus("좋음");
    else if (30 <= dustPercent < 80) setStatus("보통");
    else if (80 <= dustPercent < 150) setStatus("나쁨");
    else setStatus("나쁨");
  }, []);

  async function getRain() {
    // rainPercent, humidity, rainPerHour
    const rainPercentInfo = await apiService.getRain();
    setRainPercent(rainPercentInfo.rainPercent);
    setHumidity(rainPercentInfo.humidity);
    setRainPerHour(rainPercentInfo.rainPerHour);
  }
  async function getDust() {
    //gu, dustPercent
    const dustInfo = await apiService.getDust();
    setDust(dustInfo.dustPercent);
  }
  async function getTemp() {
    //temperature
    const { temperature, msg } = await apiService.getWeather();
    setTemperature(temperature);
    setMsg(msg);
  }
  async function getRoute() {
    let arr = [];
    const resJson = await apiService.getRoute(location);
    setRouteInfo(resJson);

    const lR = resJson.lRoutes,
      rR = resJson.rRoutes,
      recommended = resJson.recommendedIndex;
    for (let index in lR) {
      const lRoute = lR[index].url;
      const rRoute = rR[index].url;

      if (index === recommended) {
        arr.push(
          <div className="recommended">
            <img
              src={lRoute}
              className="route-block"
              width="280px"
              alt={rRoute}
              onClick={() => {
                setOpen(true);
                setImage(rRoute);
              }}
            ></img>
          </div>
        );
      } else {
        arr.push(
          <div>
            <img
              src={lRoute}
              className="route-block"
              width="280px"
              alt={rRoute}
              onClick={() => {
                setOpen(true);
                setImage(rRoute);
              }}
            ></img>
          </div>
        );
      }
    }
    setArr(arr);
    return arr;
  }

  return (
    <>
      <Navigator></Navigator>
      <div className="content-wrapper">
        <div className="left-content">
          <div className="r-user-location">{location}</div>
          <div className="r-content_text">
            오늘의 미세먼지는 {routeInfo.flag}이네요!
          </div>
          <div className="r-sub_content_text">
            라즈베리파이가 확인한 오늘의 미세먼지 농도 00.00%
          </div>

          <div className="routes">{tempArr}</div>
          <Modal isOpen={isOpen} className="modal">
            <img
              src={nowImage}
              width="500px"
              onClick={() => setOpen(false)}
            ></img>
          </Modal>
        </div>
        {/* ******************** */}
        <div className="right-content">
          <div className="info-box_grey">
            초미세먼지 10㎍/㎥ 증가할 때마다 매일 13.6분씩 더 운동하는 게
            효과적이라는 연구결과가 있습니다! 오늘은 미세먼지 농도가 좋으니
            산책로를 통해서 30분 러닝을추천해요!
          </div>
          <div className="info-box">
            <div className="info-box-center-r">
              <div className="temperature">
                {temperature}°{/* <br></br> */}
              </div>
              <div className="msg">{msg}</div>
            </div>
            <div className="info-box-center-l">
              {rainPerHour == "강수없음" && dustPercent > 150 && (
                <img src={dustImage} style={{ width: "180px" }}></img>
              )}
              {hour < 18 && rainPerHour == "강수없음" && dustPercent < 150 && (
                <img src={sunImage} style={{ width: "180px" }}></img>
              )}
              {hour >= 18 && rainPerHour == "강수없음" && dustPercent < 150 && (
                <img src={moonImage} style={{ width: "180px" }}></img>
              )}
              {rainPerHour !== "강수없음" && dustPercent < 150 && (
                <img src={rainImage} style={{ width: "180px" }}></img>
              )}
            </div>
          </div>
          <div className="info-box">
            <div className="info-box-left-l">
              <div style={{ fontWeight: "bolder" }}>미세먼지</div>
              {dustPercent < 30 && <img src={dust0} className="mise_face" />}
              {30 <= dustPercent && dustPercent < 80 && (
                <img src={dust1} className="mise_face" />
              )}
              {80 <= dustPercent && dustPercent < 150 && (
                <img src={dust2} className="mise_face" />
              )}
              {150 < dustPercent && <img src={dust3} className="mise_face" />}
              <div style={{ fontSize: "13px" }}>
                미세먼지는 {dustPercent}로 {status}이에요
              </div>
            </div>

            <div className="info-box-left-r">
              <div style={{ fontWeight: "bolder" }}>강수량/습도</div>
              <div className="rain_list">
                <div>비올 확률: {rainPercent}%</div>
                <div>습도: {humidity}</div>
                <div>시간당 강수량: {rainPerHour}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default RoutePage;
