import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { TableCell, TableRow, Avatar } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";

import XP from "./XP";
import FAQ from "./FAQ";
import MoreXP from "./MoreXP";
import DiscardPot from "./Discardpot";
import { homeTable } from "./HomeTable";
import { addingArrow, idSplit } from "../Action";
import Ticket from "../assets/images/1f39f1.png";
import loading from "../assets/images/loader.svg";
import AuthContext from "../Components/Store/Auth-context";
import { leaderBoardTopRankersGetApiCall } from "../ApiCalls";
// import { is_alpha_path } from "../../Components/Store/Auth-context";
import CustomTableComponent from "../Components/CustomTableComponent";

function AlphaHomeTest() {
  const { navigateServerErrorPage } = useContext(AuthContext);
  const [topRankers, setTopRankers] = useState([]);
  const [showLoading, setShowLoading] = useState(true);

  const matches = useMediaQuery("(min-width:1023px)");

  const navigateDiscordPage = () => {
    window.location.href = "https://discord.gg/kbNgQz8N2E";
  };

  useEffect(() => {
    setShowLoading(true);
    const controller = new AbortController();
    const config = {
      signal: controller.signal,
    };
    if (matches) {
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
    }

    return () => {
      // ws.current.disconnect();
      controller.abort();
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <div className="slider home">
        <div>
          <h3>
            ENGAGE <span>TO</span> EARN
          </h3>
          <h1>WITH A CHANCE</h1>
          <h2>TO WIN BIGGER</h2>
          <h4>
            Add Jackpot to your Discord Server so your <br />
            community members can begin earning tickets.
          </h4>
          <Link onClick={navigateDiscordPage}>
            <button className="whiteBtn">Join Alpha in Discord</button>
          </Link>
        </div>
        {matches && (
          <CustomTableComponent
            tableHead={
              <>
                <TableCell>Rank</TableCell>
                <TableCell>Community Member</TableCell>
                <TableCell>Tickets</TableCell>
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
        )}
      </div>
      <div className="contentSection1">
        <XP />
        <MoreXP />
        <DiscardPot /> 
        <FAQ />
      </div>
    </div>
  );
}
export default AlphaHomeTest;
