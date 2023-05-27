import "./nav.css";
import LoginModal from "../user/login-modal";
import JoinModal from "../user/join-modal";
import { useState } from "react";

function Navigator() {
  const [joinOpen, setJoinOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);
  const [isLogged, setLogged] = useState(false);

  function handleJoinOpen() {
    setJoinOpen(!joinOpen);
  }

  function handleLoginOpen() {
    setLoginOpen(!loginOpen);
  }
  return (
    <div class="nav">
      <nav class="navbar">
        <div class="navbar__logo">
          <i class="fab fa-accusoft"></i>
          <a href="/main">
            <strong>Mewal</strong>
          </a>
        </div>

        <ul class="navbar__menu">
          <li></li>
        </ul>

        <ul class="navbar__icons">
          <li
            onClick={() => {
              setJoinOpen(true);
            }}
          >
            login
          </li>
          <li
            onClick={() => {
              setLoginOpen(true);
            }}
          >
            join
          </li>
          <a href="/mypage">
            <li>myPage</li>
          </a>
          <li>
            <i class="fab fa-facebook-f"></i>
          </li>
        </ul>
      </nav>
      <JoinModal open={joinOpen} handleOpen={handleJoinOpen}></JoinModal>
      <LoginModal open={loginOpen} handleOpen={handleLoginOpen}></LoginModal>
    </div>
  );
}

export default Navigator;
