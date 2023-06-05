import Navigator from "../nav/nav";
import "./main.css";
import { useState, useEffect } from "react";
import { apiService } from "../route/apiService";
import io from "socket.io-client";

function MainPage() {
  const [location, setLocation] = useState("");
  const [msg, setMsg] = useState("PM2.5 : 107, PM10: 147");

  async function connectSocket() {
    const socket = await io.connect("http://localhost:5000", {
      transports: ["websocket"],
      secure: true,
      reconnection: false,
      rejectUnauthorized: false,
    });

    socket.on("connect", function () {
      console.log("Connected to socket");
    });

    socket.on("deviceConnect", function (data) {
      console.log(data);
      // setMsg(data);
    });

    socket.on("message", function (data) {
      console.log("!!!!!메시지!!!!!", data);
      localStorage.setItem("iotMsg", data);
      setMsg(data);
    });
  }

  useEffect(() => {
    connectSocket();
  }, []);

  return (
    <>
      <Navigator></Navigator>
      <div className="content">
        <div className="title_text">MISEWALKING</div>
        <div className="content_text">
          오늘의 미세먼지 농도를 확인하고 안전한 산책길 떠나요 !
        </div>
        <div className="sub_content_text">
          라즈베리파이가 확인한 오늘의 미세먼지 농도 {msg}
        </div>
        <div className="image">
          <img
            src="https://mswkbucket.s3.ap-northeast-2.amazonaws.com/images/%E1%84%86%E1%85%A6%E1%84%8B%E1%85%B5%E1%86%AB.jpg"
            alt="mainImage"
          />
        </div>
        <div className="input__section">
          <form>
            <div>
              <input
                type="text"
                className="item"
                autoFocus={true}
                onChange={(newValue) => setLocation(newValue.target.value)}
                value={location}
                placeholder="산책하고자하는 위치를 알려주세요!"
              />
            </div>
            <div>
              <button className="input__button">
                <a
                  href="/route"
                  onClick={() => {
                    localStorage.setItem("location", location);
                  }}
                >
                  미세먼지 피해 산책로 찾기
                </a>
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default MainPage;
