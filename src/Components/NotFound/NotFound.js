import React from "react";
import { AppBar, Toolbar } from "@mui/material";
import { useNavigate } from "react-router-dom";

import Footer from "../Footer";
import LogoImg from "../../assets/images/logo.png";
import LogoImgSm from "../../assets/images/logo-sm.png";
import Icon1 from "../../assets/images/icon-1.svg";
import Icon2 from "../../assets/images/icon-2.svg";

import "./fnfpage.css";

function NotFound() {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate("/");
  };

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <nav className="brand" onClick={() => navigate("/")}>
            <img className="lg-logo" src={LogoImg} alt="Jackpot" />
            <img src={LogoImgSm} className="sm-logo" alt="Jackpot" />
          </nav>
        </Toolbar>
      </AppBar>
      <div className="fnfpage">
        <h3>404 Error</h3>
        <h1>
          The page you are looking for may have been
          <br /> moved, deleted, or possibly never existed.
        </h1>
        <div>
          <button color="inherit" className="yBtn" onClick={handleNavigate}>
            Return Home
          </button>
          <a
            // target="_blank"
            href="https://discord.gg/kbNgQz8N2E"
            rel="noreferrer"
          >
            <img
              src={Icon1}
              alt="icon1"
              // onClick={() =>
              //   (window.location.href = "https://discord.gg/kbNgQz8N2E")
              // }
            />
          </a>
          <a
            href="https://twitter.com/jackpotxyz"
            // target="_blank"
            rel="noreferrer"
          >
            <img
              src={Icon2}
              alt="icon2"
              // onClick={() =>
              //   (window.location.href = "https://twitter.com/jackpotxyz")
              // }
            />
          </a>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default NotFound;
