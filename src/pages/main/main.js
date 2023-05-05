import Navigator from "../nav/nav";
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
                placeholder="산책하고자하는 위치를 알려주세요!"
              />
            </div>
            <div>
              <button className="input__button">
                <a href="/route">미세먼지 피해 산책로 찾기</a>
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default MainPage;
