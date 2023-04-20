import React, { useLayoutEffect, useState, useContext } from "react";
import {
  Avatar,
  IconButton,
  TableCell,
  TableRow,
  Tooltip,
} from "@mui/material";
// import Accordion from "@mui/material/Accordion";
import RefreshIcon from "@mui/icons-material/Refresh";
// import AccordionSummary from "@mui/material/AccordionSummary";
// import AccordionDetails from "@mui/material/AccordionDetails";
// import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import useMediaQuery from "@mui/material/useMediaQuery";

import { addingArrow, idSplit } from "../../Action";
import loading from "../../assets/images/loader.svg";
import twitterIcon from "../../assets/images/icon-2.svg";
import SearchIcon from "../../assets/images/search.svg";
import SearchBtn from "../../assets/images/sm-search.svg";
import AuthContext from "../../Components/Store/Auth-context";
import LinkImage from "../../assets/images/link.png";
import Ticket from "../../assets/images/1f39f1.png";
import HelpIcon from "../../assets/images/help.png";
import filterImage from "../../assets/images/filter.svg";
import CustomTableComponent from "../../Components/CustomTableComponent";
import {
  alphaSettingGetWinners,
  alphaLeaderboardApiCall,
} from "../../ApiCalls";
import AlphaLandingPage from "../AlphaLanding";
import LoadingOverlay from "../../Components/LoadingOverlay";

function AlphaLeaderBoard() {
  const { navigateServerErrorPage } = useContext(AuthContext);
  const [currPage, setCurrPage] = useState(1);
  // const [expanded, setExpanded] = React.useState(false);
  const [filterClick, setFilterClick] = useState(false);
  const [initialLoader, setInitialloader] = useState(false);
  const [alphaWinners, setAlphaWinners] = useState([]);
  const [searchValue, setSearchValues] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [leaderBoardDatas, setLeaderBoardDatas] = useState({});
  const [leaderBoardFilterDatas, setLeaderBoardFilterDatas] = useState([]);
  const [pageLength, setPageLength] = useState(0);

  const matches = useMediaQuery("(min-width:1024px)");
  const matches1 = useMediaQuery("(min-width:1024px)");

  const addingRankImage = (rank) => {
    switch (rank) {
      case "1":
        return (
          <>
            <p className="rank1">1</p>
          </>
        );
      case "2":
        return (
          <>
            <p className="rank2">2</p>
          </>
        );
      case "3":
        return (
          <>
            <p className="rank3">3</p>
          </>
        );
      default:
        return rank;
    }
  };

  const rowtables = () => {
    let rows = [];
    for (let i = 0; i <= 4; i++) {
      rows.push(
        <TableCell>
          <img src={loading} alt="loading" />
        </TableCell>
      );
    }
    return rows;
  };

  // const handleChange = (panel) => (event, isExpanded) => {
  //   setExpanded(isExpanded ? panel : false);
  // };

  useLayoutEffect(() => {
    const handleScroll = (e) => {
      const scrollHeight = e.target.documentElement.scrollHeight;
      const currentHeight =
        e.target.documentElement.scrollTop + window.innerHeight;

      if (
        currPage * pageLength === leaderBoardFilterDatas?.length &&
        leaderBoardDatas?.next !== null &&
        currPage < Math.ceil(leaderBoardDatas?.count / pageLength) &&
        leaderBoardFilterDatas.length !== 0 &&
        !isLoading &&
        currentHeight + 1 >= scrollHeight - 200
      ) {
        setCurrPage(currPage + 1);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currPage, leaderBoardDatas]);

  const refreshData = () => {};

  const fetchWinnersList = () => {
    setInitialloader(true);
    alphaSettingGetWinners(
      (response) => {
        setAlphaWinners(response.data);
        localStorage.setItem("alphaWinners", response?.data?.length);
        setInitialloader(false);
      },
      (err) => {
        navigateServerErrorPage(err?.response?.status);
        setInitialloader(false);
      }
    );
  };

  useState(() => {
    fetchWinnersList();
  }, []);

  const getleaderBoardData = (config) => {
    setIsLoading(true);
    alphaLeaderboardApiCall(
      "",
      "",
      currPage,
      "",
      searchValue,
      "",
      (response) => {
        setLeaderBoardDatas(response?.data);
        localStorage.setItem("currPage", currPage);
        localStorage.setItem("count", response?.data?.count);
        if (currPage === 1) {
          setLeaderBoardFilterDatas([]);
          setLeaderBoardFilterDatas(response?.data?.results);
          setPageLength(response?.data?.results?.length);
          localStorage.setItem("pageLength", response?.data?.results?.length);
        } else if (currPage !== 1) {
          response?.data?.results.map((el) => leaderBoardFilterDatas.push(el));
        }
        setIsLoading(false);
      },
      (error) => {
        navigateServerErrorPage(error?.response?.status);
        setIsLoading(false);
      },
      config
    );
  };

  useLayoutEffect(() => {
    const controller = new AbortController();
    const config = {
      signal: controller.signal,
    };
    if (searchValue.length > 0) {
      setLeaderBoardFilterDatas([]);
      setCurrPage(1);
    }
    getleaderBoardData(config);

    return () => {
      controller.abort();
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchValue, currPage]);

  return (
    <>
      {initialLoader && <LoadingOverlay />}
      <AlphaLandingPage values={alphaWinners} />
      {alphaWinners.length > 0 && (
        <div className="slider alpha">
          <div className="tableContent">
            {matches ? (
              <>
                <h4 className="alpha">
                  Leaderboard
                  {alphaWinners[0]?.previous_winners !== "" &&
                    alphaWinners[0]?.previous_winners !== null && (
                      <>
                        <span>{`//`}</span>
                        <a href={alphaWinners[0]?.previous_winners}>
                          View Previous Winners
                        </a>
                      </>
                    )}
                </h4>
                <div className="tableControlls alpha">
                  <div>
                    <img src={SearchIcon} alt="Serach" />
                    <input
                      type="text"
                      name="search"
                      placeholder="Search"
                      onChange={(e) => setSearchValues(e.target.value)}
                    />
                    <button className="lg-btn">Search</button>
                    <button className="sm-btn">
                      <img src={SearchBtn} alt="Search" />
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="leaderBoard">
                  <h2 style={{ color: "white" }}>Leaderboard</h2>
                  <IconButton onClick={() => setFilterClick(!filterClick)}>
                    <img
                      src={filterImage}
                      alt={filterClick ? "gray" : "white"}
                    />
                  </IconButton>
                </div>
                {filterClick && (
                  <div className="tableControlls alphamob">
                    <div>
                      <img src={SearchIcon} alt="Serach" />
                      <input
                        name="search"
                        placeholder="Search"
                        type="text"
                        onChange={(e) => setSearchValues(e.target.value)}
                      />
                      <button>Search</button>
                    </div>
                  </div>
                )}
              </>
            )}
            {matches1 ? (
              <div className="tableDiv alpha">
                <CustomTableComponent
                  tableHead={
                    <>
                      <TableCell>
                        Rank
                        <Tooltip
                          title="Community members are ranked based on how many tickets they’ve earned. The higher your rank, the greater your chance of winning the Jackpot Giveaway."
                          placement="top"
                          arrow
                        >
                          <img src={HelpIcon} alt="" />
                        </Tooltip>
                      </TableCell>
                      <TableCell>
                        Community Member
                        <Tooltip
                          title="People who have opted-in to Jackpot in Discord."
                          placement="top"
                          arrow
                        >
                          <img src={HelpIcon} alt="Help" />
                        </Tooltip>
                      </TableCell>
                      <TableCell>
                        Tickets
                        <Tooltip
                          title="Members earn tickets by doing things that benefit their community. Read our whitepaper to learn how."
                          placement="top"
                          arrow
                        >
                          <img src={HelpIcon} alt="Help" />
                        </Tooltip>
                      </TableCell>
                      <TableCell>Twitter</TableCell>
                      <TableCell onClick={refreshData}>
                        <RefreshIcon />
                      </TableCell>
                    </>
                  }
                  tableBody={
                    <>
                      {leaderBoardFilterDatas &&
                        leaderBoardFilterDatas
                          // .filter((el) => el.user.includes(searchValue))
                          .map((el, index) => (
                            <TableRow>
                              <TableCell>
                                <span> {addingArrow(el?.trend)}</span>
                                <span>{addingRankImage(el?.member_rank)}</span>
                              </TableCell>
                              <TableCell>
                                <Avatar src={el?.member_pfp_link} />
                                <span className="user">
                                  {idSplit(el?.member_name)}
                                </span>
                              </TableCell>
                              <TableCell>
                                {el?.member_xp
                                  .toString()
                                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}{" "}
                                <img src={Ticket} alt="ticket" />
                              </TableCell>
                              <TableCell>
                                <span>{el?.twitter_handle}</span>
                                <a
                                  href={el?.twitter_url}
                                  // target="_blank"
                                  rel="noreferrer"
                                >
                                  <img src={LinkImage} alt="link" />
                                </a>
                              </TableCell>
                              <TableCell></TableCell>
                            </TableRow>
                          ))}
                      {isLoading && (
                        <>
                          <TableRow className="loaderRows">
                            {rowtables()}
                          </TableRow>
                          <TableRow className="loaderRows">
                            {rowtables()}
                          </TableRow>
                          <TableRow className="loaderRows">
                            {rowtables()}
                          </TableRow>
                          <TableRow className="loaderRows">
                            {rowtables()}
                          </TableRow>
                        </>
                      )}
                      {!isLoading && leaderBoardFilterDatas?.length === 0 && (
                        <TableRow className="loaderRows">
                          <TableCell>
                            <p>No Search Results</p>
                          </TableCell>
                          <TableCell> </TableCell>
                          <TableCell> </TableCell>
                          <TableCell> </TableCell>
                        </TableRow>
                      )}
                    </>
                  }
                />
              </div>
            ) : (
              <div className="tableDiv alpha">
                <CustomTableComponent
                  tableHead={
                    <>
                      <TableCell>
                        Rank
                        <Tooltip
                          title="Community members are ranked based on how many tickets they’ve earned. The higher your rank, the greater your chance of winning the Jackpot Giveaway."
                          placement="top"
                          arrow
                        >
                          <img src={HelpIcon} alt="" />
                        </Tooltip>
                      </TableCell>
                      <TableCell>
                        Member
                        <Tooltip
                          title="People who have opted-in to Jackpot in Discord."
                          placement="top"
                          arrow
                        >
                          <img src={HelpIcon} alt="Help" />
                        </Tooltip>
                      </TableCell>
                      <TableCell>
                        Tickets
                        <Tooltip
                          title="Members earn tickets by doing things that benefit their community. Read our whitepaper to learn how."
                          placement="top"
                          arrow
                        >
                          <img src={HelpIcon} alt="Help" />
                        </Tooltip>
                      </TableCell>
                      {/* <TableCell>Twitter</TableCell>
                    <TableCell onClick={refreshData}>
                      <RefreshIcon />
                    </TableCell> */}
                    </>
                  }
                  tableBody={
                    <>
                      {leaderBoardFilterDatas &&
                        leaderBoardFilterDatas
                          // .filter((el) => el.user.includes(searchValue))
                          .map((el, index) => (
                            <TableRow>
                              <TableCell>
                                <span> {addingArrow(el?.trend)}</span>
                                <span>{addingRankImage(el?.member_rank)}</span>
                              </TableCell>
                              <TableCell>
                                <Avatar src={el?.member_pfp_link} />
                                <span className="user">
                                  {idSplit(el?.member_name)}
                                </span>
                              </TableCell>
                              <TableCell>
                                {el?.member_xp
                                  .toString()
                                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}{" "}
                                <img src={Ticket} alt="ticket" />
                                <a
                                  href={el?.twitter_url}
                                  // target="_blank"
                                  rel="noreferrer"
                                >
                                  <img src={twitterIcon} alt="link" />
                                </a>
                              </TableCell>
                              {/* <TableCell>
                              <span>{el?.twitter_handle}</span>
                              <a
                                href={el?.twitter_url}
                                // target="_blank"
                                rel="noreferrer"
                              >
                                <img src={LinkImage} alt="link" />
                              </a>
                            </TableCell>
                            <TableCell></TableCell> */}
                            </TableRow>
                          ))}
                      {isLoading && (
                        <>
                          <TableRow className="loaderRows">
                            {rowtables()}
                          </TableRow>
                          <TableRow className="loaderRows">
                            {rowtables()}
                          </TableRow>
                          <TableRow className="loaderRows">
                            {rowtables()}
                          </TableRow>
                          <TableRow className="loaderRows">
                            {rowtables()}
                          </TableRow>
                        </>
                      )}
                      {!isLoading && leaderBoardFilterDatas?.length === 0 && (
                        <TableRow className="loaderRows">
                          <TableCell>
                            <p>No Search Results</p>
                          </TableCell>
                          <TableCell> </TableCell>
                          <TableCell> </TableCell>
                          <TableCell> </TableCell>
                        </TableRow>
                      )}
                    </>
                  }
                />
              </div>
              // <div className="tableDiv alpha">
              //   <CustomTableComponent
              //     tableHead={
              //       <>
              //         <AccordionSummary>
              //           <TableCell>
              //             Rank
              //             <img src={HelpIcon} alt="Help" />
              //           </TableCell>
              //           <TableCell>
              //             Community Member
              //             <img src={HelpIcon} alt="Help" />
              //           </TableCell>
              //           <TableCell>
              //             XP
              //             <img src={HelpIcon} alt="Help" />
              //           </TableCell>
              //         </AccordionSummary>
              //       </>
              //     }
              //     tableBody={
              //       <>
              //         {leaderBoardFilterDatas &&
              //           leaderBoardFilterDatas
              //             // .filter((el) => el.user.includes(searchValue))
              //             .map((el, index) => (
              //               <>
              //                 <TableRow>
              //                   <Accordion
              //                     expanded={
              //                       expanded === parseInt(el?.member_rank)
              //                     }
              //                     onChange={handleChange(
              //                       parseInt(el?.member_rank)
              //                     )}
              //                   >
              //                     <AccordionSummary
              //                       expandIcon={<ExpandMoreIcon />}
              //                       aria-controls="panel1a-content"
              //                       key={el?.member_name}
              //                       id="panel1a-header"
              //                     >
              //                       <TableCell>
              //                         <span>{addingArrow(el?.trend)}</span>
              //                         <span>{el?.member_rank}</span>
              //                       </TableCell>
              //                       <TableCell>
              //                         <Avatar src={el?.member_pfp_link} />
              //                         <span className="user">
              //                           {idSplit(el?.member_name)}
              //                         </span>
              //                       </TableCell>
              //                       <TableCell>
              //                         <span>
              //                           {el?.member_xp
              //                             .toString()
              //                             .replace(
              //                               /\B(?=(\d{3})+(?!\d))/g,
              //                               ","
              //                             )}
              //                         </span>
              //                         <img src={Ticket} alt="ticket" />
              //                       </TableCell>
              //                     </AccordionSummary>
              //                     <AccordionDetails>
              //                       <div className="dropdwn">
              //                         <a
              //                           href={el?.twitter_url}
              //                           target="_blank"
              //                           rel="noreferrer"
              //                         >
              //                           <img src={twitterIcon} alt="link" />
              //                         </a>
              //                       </div>
              //                     </AccordionDetails>
              //                   </Accordion>
              //                 </TableRow>
              //               </>
              //             ))}
              //         {isLoading ? (
              //           <>
              //             <TableRow className="loaderRows">
              //               <div>{rowtables()}</div>
              //             </TableRow>
              //             <TableRow className="loaderRows">
              //               <div> {rowtables()}</div>
              //             </TableRow>
              //             <TableRow className="loaderRows">
              //               <div>{rowtables()}</div>
              //             </TableRow>
              //             <TableRow className="loaderRows">
              //               <div>{rowtables()}</div>
              //             </TableRow>
              //           </>
              //         ) : (
              //           ""
              //         )}
              //       </>
              //     }
              //   />
              // </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default AlphaLeaderBoard;
