import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import useMediaQuery from "@mui/material/useMediaQuery";

import FooterLogo from "../../assets/images/footerlogo.png";
import footerIcon1 from "../../assets/images/icon-1.svg";
import footerIcon2 from "../../assets/images/icon-2.svg";
import { is_alpha_path } from "../Store/Auth-context";

export default function Footer() {
  const [userValue, setUserValue] = useState(false);
  const [footerView, setFooterview] = useState(true);
  const [successView, setSuccessView] = useState("false");
  const [currentPage, setCurrentPage] = useState();

  const location = useLocation();
  const matches = useMediaQuery("(min-width:640px)");
  const interval1 = useRef();
  const interval2 = useRef();

  // const alphaWinners = parseInt(localStorage.getItem("alphaWinners"));

  useEffect(() => {
    const { pathname } = location;
    if (pathname === "/sign-up") {
      interval1.current = setInterval(() => {
        setSuccessView(JSON.parse(localStorage.getItem("footerView")));
      }, 100);
    } else {
      clearInterval(interval1.current);
    }
    if (pathname !== "/leaderboard") {
      setUserValue(false);
    }
    if (pathname === "/leaderboard") {
      interval2.current = setInterval(() => {
        const currPage = parseInt(localStorage.getItem("currPage"));
        const count = parseInt(localStorage.getItem("count"));
        const pageLength = parseInt(localStorage.getItem("pageLength"));
        setCurrentPage(currPage);
        if (currPage === Math.ceil(count / pageLength)) {
          setUserValue(true);
        } else if (currPage !== Math.ceil(count / pageLength)) {
          setUserValue(false);
        }
      }, 1000);
    } else {
      clearInterval(interval2.current);
    }

    if (["/sign-up"].includes(pathname)) setFooterview(successView);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname, successView, currentPage]);

  return (
    <>
      {location.pathname === "/leaderboard" && userValue && !is_alpha_path && (
        <div className="footer">
          <>
            {matches ? (
              <div>
                <p>
                  <Link to="/">
                    <img src={FooterLogo} alt="Jackpot" />
                  </Link>
                  &copy; 2023 Copyright Jackpot. All Rights Reserved.
                </p>
                <div>
                  <a
                    // target="_blank"
                    href="https://discord.gg/kbNgQz8N2E"
                    rel="noreferrer"
                  >
                    <img src={footerIcon1} alt="Jackpot" />
                  </a>
                  <a
                    href="https://twitter.com/jackpotxyz"
                    // target="_blank"
                    rel="noreferrer"
                  >
                    <img src={footerIcon2} alt="Jackpot" />
                  </a>
                  <Link to="/sweepstakes-terms">Sweepstakes Terms</Link>
                  <Link to="/privacy-policy">Privacy Policy</Link>
                  <a href="/terms-of-use">Terms of Use</a>
                </div>
              </div>
            ) : (
              <p>
                <Link to="/">
                  <img src={FooterLogo} alt="Jackpot" />
                </Link>
                &copy; 2023 Copyright Jackpot. All Rights Reserved.
              </p>
            )}
          </>
        </div>
      )}
      {location.pathname === "/leaderboard" &&
        // alphaWinners === 0 &&
        is_alpha_path && (
          <div className="footer">
            <>
              {matches ? (
                <div>
                  <p>
                    <Link to="/">
                      <img src={FooterLogo} alt="Jackpot" />
                    </Link>
                    &copy; 2023 Copyright Jackpot. All Rights Reserved.
                  </p>
                  <div>
                    <a
                      // target="_blank"
                      href="https://discord.gg/kbNgQz8N2E"
                      rel="noreferrer"
                    >
                      <img src={footerIcon1} alt="Jackpot" />
                    </a>
                    <a
                      href="https://twitter.com/jackpotxyz"
                      // target="_blank"
                      rel="noreferrer"
                    >
                      <img src={footerIcon2} alt="Jackpot" />
                    </a>
                    <Link to="/sweepstakes-terms">Sweepstakes Terms</Link>
                    <Link to="/privacy-policy">Privacy Policy</Link>
                    <a href="/terms-of-use">Terms of Use</a>
                  </div>
                </div>
              ) : (
                <p>
                  <Link to="/">
                    <img src={FooterLogo} alt="Jackpot" />
                  </Link>
                  &copy; 2023 Copyright Jackpot. All Rights Reserved.
                </p>
              )}
            </>
          </div>
        )}
      {location.pathname !== "/leaderboard" && (
        <div className="footer">
          {footerView && (
            <>
              {matches ? (
                <div>
                  <p>
                    <Link to="/">
                      <img src={FooterLogo} alt="Jackpot" />
                    </Link>
                    &copy; 2023 Copyright Jackpot. All Rights Reserved.
                  </p>
                  <div>
                    <a
                      // target="_blank"
                      href="https://discord.gg/kbNgQz8N2E"
                      rel="noreferrer"
                    >
                      <img src={footerIcon1} alt="Jackpot" />
                    </a>
                    <a
                      href="https://twitter.com/jackpotxyz"
                      // target="_blank"
                      rel="noreferrer"
                    >
                      <img src={footerIcon2} alt="Jackpot" />
                    </a>
                    <a href="/sweepstakes-terms">Sweepstakes Terms</a>
                    <a href="/privacy-policy">Privacy Policy</a>
                    <a href="/terms-of-use">Terms of Use</a>
                  </div>
                </div>
              ) : (
                <p>
                  <Link to="/">
                    <img src={FooterLogo} alt="Jackpot" />
                  </Link>
                  &copy; 2023 Copyright Jackpot. All Rights Reserved.
                </p>
              )}
            </>
          )}
        </div>
      )}
    </>
  );
}
