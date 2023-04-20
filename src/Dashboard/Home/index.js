import React, { useEffect, useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { TableCell, TableRow, Avatar } from "@mui/material";

import Ticket from "../../assets/images/1f39f1.png";
import { addingArrow, idSplit } from "../../Action";
import { homeTable } from "./HomeTable";
import XP from "./XP";
import MoreXP from "./MoreXP";
import FlipTheSwitch from "./Fliptheswitch";
import FAQ from "./FAQ";
import DiscardPot from "./Discardpot";
import CustomTableComponent from "../../Components/CustomTableComponent";
import { leaderBoardTopRankersGetApiCall } from "../../ApiCalls";
import loading from "../../assets/images/loader.svg";
import AuthContext from "../../Components/Store/Auth-context";
import { is_alpha_path } from "../../Components/Store/Auth-context";

function Home() {
  const { navigateServerErrorPage } = useContext(AuthContext);
  const [topRankers, setTopRankers] = useState([]);
  const [showLoading, setShowLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    if (is_alpha_path) {
      navigate("/");
      return;
    }
    setShowLoading(true);
    const controller = new AbortController();
    const config = {
      signal: controller.signal,
    };

    leaderBoardTopRankersGetApiCall(
      (res) => {
        setTopRankers(res.data.results);
        setShowLoading(false);
      },
      (err) => {
        navigateServerErrorPage(err?.response?.status);
        setShowLoading(false);
      },
      config
    );

    return () => {
      controller.abort();
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <div className="slider home">
        <div>
          <h3>
            THE <span>ONLY</span> NO-BRAINER
          </h3>
          <h1>LOYALTY & REWARDS</h1>
          <h2>PLUGIN FOR WEB3</h2>
          <h4>
            Initiate a flywheel that keeps your community <br />
            members active and engaged.
          </h4>
          <Link to="/pricing">
            <button className="whiteBtn">Add to Server</button>
          </Link>
        </div>
        <CustomTableComponent
          tableHead={
            <>
              <TableCell>Rank</TableCell>
              <TableCell>Community Member</TableCell>
              <TableCell>XP</TableCell>
            </>
          }
          tableBody={
            topRankers.length > 0
              ? topRankers.map((el) => (
                  <TableRow>
                    <>
                      <TableCell>
                        <span> {addingArrow(el.trend)}</span>
                        <span>{el.member_rank}</span>
                      </TableCell>
                      <TableCell>
                        <Avatar src={el?.member_pfp_link} />
                        <span className="user">{idSplit(el?.member_id)}</span>
                      </TableCell>
                      <TableCell>
                        {el.member_xp
                          .toString()
                          .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                        <img src={Ticket} alt="ticket" />
                      </TableCell>
                    </>
                  </TableRow>
                ))
              : homeTable.map((el) => (
                  <TableRow>
                    {showLoading && (
                      <>
                        <TableCell className="loaderCol">
                          <img src={loading} alt="loading" />
                        </TableCell>
                        <TableCell className="loaderCol">
                          <img src={loading} alt="loading" />
                        </TableCell>
                        <TableCell className="loaderCol">
                          <img src={loading} alt="loading" />
                        </TableCell>
                      </>
                    )}
                  </TableRow>
                ))
          }
          divClassName="tableContenthome"
        />
      </div>
      <div className="contentSection1">
        <XP />
        <MoreXP />
        <DiscardPot />
        <FAQ />
        <FlipTheSwitch />
      </div>
    </div>
  );
}
export default React.memo(Home);
