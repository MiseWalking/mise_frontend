import Navigator from "../nav/nav";
import mainImage from "../../assets/img/main.jpg";
import "./main.css";

function MainPage() {
  return (
    <>
      {" "}
      <Navigator></Navigator>
      <div className="content">
        <div className="title_text">MISEWALKING</div>
        <div className="content_text">
          오늘의 미세먼지 농도를 확인하고 안전한 산책길 떠나요 !
        </div>
        <div className="sub_content_text">
          오늘의 서울 평균 미세먼지 농도 00.00%
        </div>
        <div className="image">
          <img src={mainImage} alt="mainImage" />
        </div>
        <div className="input__section">
          <form>
            <div>
              <input
                type="text"
                className="item"
                autoFocus={true}
                placeholder="산책하고자하는 위치를 알려주세요!"
              />
            </div>
            <div>
              <button className="input__button" onClick={() => {}}>
                미세먼지 피해 산책로 찾기
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default MainPage;
