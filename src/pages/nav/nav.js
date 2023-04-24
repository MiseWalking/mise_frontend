import "./nav.css";

function Navigator() {
  return (
    <div class="nav">
      <nav class="navbar">
        <div class="navbar__logo">
          <i class="fab fa-accusoft"></i>
          <a href="/">
            <strong>Mewal</strong>
          </a>
        </div>

        <ul class="navbar__menu">
          <li>
            {/* <button className="nav_button" onClick={() => {}}>
              소원 빌러 가기
            </button> */}
          </li>
        </ul>

        <ul class="navbar__icons">
          <li>login</li>
          <li>join</li>
          <li>
            <i class="fab fa-facebook-f"></i>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Navigator;
