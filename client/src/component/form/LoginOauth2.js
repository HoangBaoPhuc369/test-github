import React, { useState, useRef, useEffect } from "react";
import { Card, Button } from "react-bootstrap";
import lottie from "lottie-web";
import "./style.css";
import { FaAngleRight, FaUserCircle } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../../redux/feature/authSlice";
import { useNavigate } from "react-router-dom";

export default function LoginOauth2() {
  const container = useRef(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    lottie.loadAnimation({
      container: container.current,
      renderer: "svg",
      loop: true,
      autoplay: true,
      animationData: require("../.././animation/127286-hello-world.json"),
    });
  }, []);

  const Login = () => {
    const w = 438;
    const h = 600;
    const dualScreenLeft =
      window.screenLeft !== undefined ? window.screenLeft : window.screenX;
    const dualScreenTop =
      window.screenTop !== undefined ? window.screenTop : window.screenY;

    const width = window.innerWidth
      ? window.innerWidth
      : document.documentElement.clientWidth
      ? document.documentElement.clientWidth
      : // eslint-disable-next-line no-restricted-globals
        screen.width;
    const height = window.innerHeight
      ? window.innerHeight
      : document.documentElement.clientHeight
      ? document.documentElement.clientHeight
      : // eslint-disable-next-line no-restricted-globals
        screen.height;

    const systemZoom = width / window.screen.availWidth;
    const left = (width - w) / 2 / systemZoom + dualScreenLeft;
    const top = (height - h) / 2 / systemZoom + dualScreenTop;
    const newWindow = window.open(
      "http://localhost:8000/auth/google",
      "google_login",
      `width=${w / systemZoom}, 
      height=${h / systemZoom}, 
      top=${top}, 
      left=${left},
      scrollbars=no, 
      status=no, 
      resizable=no
      `
    );
    newWindow.focus();

    let timer = null;

    if (newWindow) {
      timer = setInterval(() => {
        if (newWindow.closed) {
          dispatch(getUser({ navigate }));
          if (timer) clearInterval(timer);
        }
      }, 500);
    }
  };

  const handleLogin = () => {
    if (!user) {
      Login();
    } else {
      navigate("/profile-account");
    }
  };

  return (
    <>
      <Card className="text-center login-form">
        <Card.Body className="login-form-body">
          <div
            className="login-form-img-item"
            style={{ height: "200px" }}
            ref={container}
          ></div>
          <Card.Title className="login-form-title">
            ????ng nh???p b???ng m???t t??i kho???n c???a cha m???
          </Card.Title>
          <Card.Text className="login-form-text">
            ????ng nh???p b???ng t??i kho???n c???a ri??ng b???n ????? thi???t l???p h??? s?? v?? c??
            nhi???u quy???n ki???m so??t d??nh cho cha m??? h??n. N???u kh??ng mu???n ????ng nh???p,
            b???n c?? th??? b??? qua b?????c n??y.
          </Card.Text>

          <div className="login-account-google">
            <Button variant="primary" size="lg" active onClick={Login}>
              {user ? (
                <>
                  <img
                    className="login-account-google-avatar"
                    src={user.picture}
                    alt=""
                  />
                  <div className="login-account-google-wraptext">
                    <span>{user.name}</span>
                    <span>{user.email}</span>
                  </div>
                </>
              ) : (
                <>
                  <FaUserCircle className="login-account-google-avatar" />
                  <div className="login-account-google-wraptext">
                    <span>Add a new account</span>
                  </div>
                </>
              )}

              <FaAngleRight className="login-account-google-arrow" />
            </Button>
          </div>

          <div className="group-login-btn">
            <div className="group-login-btn-left">
              <Button variant="primary">Quay l???i</Button>
            </div>
            <div className="group-login-btn-right">
              <Button variant="primary">B??? qua</Button>
              <Button variant="primary" onClick={handleLogin}>
                ????ng Nh???p
              </Button>
            </div>
          </div>
        </Card.Body>
      </Card>
    </>
  );
}
