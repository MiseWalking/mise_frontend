import Navigator from "../nav/nav";
import "./route.css";
import * as routes from "./route.json";
import { useEffect, useState } from "react";
import Modal from "react-modal";

import { apiService } from "./apiService";
function RoutePage() {
  const [rainPercent, setRainPercent] = useState();
  const [rainPerHour, setRainPerHour] = useState();
  const [humidity, setHumidity] = useState();
  const [dustPercent, setDust] = useState();
  const [temperature, setTemperature] = useState();

  const [isOpen, setOpen] = useState(false);
  const [nowImage, setImage] = useState();
  useEffect(() => {
    getRain();
    getDust();
    getTemp();
  }, []);

  function maps() {
    const lroutes = routes;
    const temp = lroutes["광진구"].mapl;
    let arr = [];
    for (let route in temp) {
      const source = temp[route];
      const tempNameForRImage = lroutes["광진구"].mapr[route]; //어느 구의 몇번쨰
      arr.push(
        <img
          src={source}
          className="route-block"
          width="280px"
          alt={tempNameForRImage}
          onClick={() => {
            setOpen(true);
            setImage(tempNameForRImage);
          }}
        ></img>
      );
    }
    return arr;
  }
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
    const { temperature } = await apiService.getWeather();
    console.log(temperature);
    setTemperature(temperature);
  }
  return (
    <>
      <Navigator></Navigator>
      <div className="content-wrapper">
        <div className="left-content">
          <div className="r-user-location">광진구 자양동</div>
          <div className="r-content_text">오늘의 미세먼지는 좋음이네요!</div>
          <div className="r-sub_content_text">
            오늘의 서울 평균 미세먼지 농도 00.00%
          </div>
          <div className="routes">{maps()}</div>
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
            효과적이라는 연구결과가 있습니다! 오늘은 미세먼지 농도가 좋으니까
            ~산책로를 통해서 30분 러닝을추천해요!
          </div>
          <div className="info-box">
            <div className="info-box-center">날씨 {temperature}°C</div>
          </div>
          <div className="info-box">
            <div className="info-box-left-l">미세먼지 {dustPercent}</div>
            <div className="info-box-left-l">
              강수량 습도
              <ul>
                <li>비올 확률: {rainPercent}%</li>
                <li>습도: {humidity}</li>
                <li>시간당 강수량: {rainPerHour}</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default RoutePage;
