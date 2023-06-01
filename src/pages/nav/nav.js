import "./nav.css";
import LoginModal from "../user/login-modal";
import JoinModal from "../user/join-modal";
import { useState, useEffect } from "react";
import cookie from "react-cookies";

function Navigator() {
  const [joinOpen, setJoinOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);
  const [isLogged, setLogged] = useState(false);

  useEffect(() => {
    if (cookie.load("userInfo")) setLogged(true);
  });

  function handleLogout() {
    cookie.remove("userInfo");
    window.location.href = "/";
  }

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

        {isLogged && (
          <ul class="navbar__icons">
            <a href="/mypage">
              <li>myPage</li>
            </a>
            <li
              onClick={() => {
                handleLogout();
              }}
            >
              logout
            </li>
          </ul>
        )}
        {!isLogged && (
          <ul class="navbar__icons">
            <li
              onClick={() => {
                setLoginOpen(true);
              }}
            >
              login
            </li>
            <li>
              <a
                onClick={() => {
                  setJoinOpen(true);
                }}
              >
                join
              </a>
            </li>
          </ul>
        )}
      </nav>
      <JoinModal open={joinOpen} handleOpen={handleJoinOpen}></JoinModal>
      <LoginModal open={loginOpen} handleOpen={handleLoginOpen}></LoginModal>
    </div>
  );
}

export default Navigator;
