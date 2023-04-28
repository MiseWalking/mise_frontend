import Navigator from "../nav/nav";
import "./route.css";
import runningImage from "../../assets/img/running2.jpg";

function RoutePage() {
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
          <div className="work-image">
            <img src={runningImage} alt="runningImage" />
          </div>
        </div>
        {/* ******************** */}
        <div className="right-content">
          <div className="info-box_grey">
            초미세먼지 10㎍/㎥ 증가할 때마다 매일 13.6분씩 더 운동하는 게
            효과적이라는 연구결과가 있습니다! 오늘은 미세먼지 농도가 좋으니까
            ~산책로를 통해서 30분 러닝을추천해요!
          </div>
          <div className="info-box">
            <div className="info-box-left">날씨</div>
            <div className="info-box-right">지도</div>
          </div>
          <div className="info-box">
            <div className="info-box-left-l">일몰/일출</div>
            <div className="info-box-right-l">미세먼지</div>
          </div>
        </div>
      </div>
    </>
  );
}

export default RoutePage;
