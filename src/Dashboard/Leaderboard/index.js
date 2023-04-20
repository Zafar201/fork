import React, {
  //  useCallback,
  useEffect,
  useState,
  useContext,
} from "react";
import {
  Avatar,
  IconButton,
  Switch,
  TableCell,
  TableRow,
  Tooltip,
  Typography,
  Divider,
} from "@mui/material";
// import Slider from "react-slick";
import Select from "react-select";
import classNames from "classnames";
import { Link } from "react-router-dom";
import Accordion from "@mui/material/Accordion";
import { defaultTheme } from "react-select";
import RefreshIcon from "@mui/icons-material/Refresh";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import useMediaQuery from "@mui/material/useMediaQuery";

import Sliders from "./Slider";
import { addingArrow, idSplit } from "../../Action";
import Arrow from "../../assets/images/arrow.svg";
import twitterIcon from "../../assets/images/icon-2.svg";
import SearchIcon from "../../assets/images/search.svg";
import SearchBtn from "../../assets/images/sm-search.svg";
import LinkImage from "../../assets/images/link.png";
import MultipleSelectCheckmarks from "../../Components/Select";
import loading from "../../assets/images/loader.svg";
import Ticket from "../../assets/images/1f39f1.png";
import HelpIcon from "../../assets/images/help.png";
import filterImage from "../../assets/images/filter.svg";
import CalendarEvents from "../../Components/CalendarEvents";
import ModalComponent from "../../Components/MedalPop";
import CustomTableComponent from "../../Components/CustomTableComponent";
import LoadingOverlay from "../../Components/LoadingOverlay";
import AuthContext from "../../Components/Store/Auth-context";
import {
  fetchCalendarEvents,
  leaderboardBadgesListApiCall,
  communityDataListApiCall,
  leaderboardApiCall,
  leaderboardBadgesGetApiCall,
} from "../../ApiCalls";

function LeaderBoard() {
  const { navigateServerErrorPage } = useContext(AuthContext);
  const [currPage, setCurrPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [popUpContent, setPopUpContent] = useState({});
  const [expanded, setExpanded] = React.useState(false);
  const [memberSwitch, setMemberSwitch] = useState(false);
  const [allTimeSwitch, setAllTimeSwitch] = useState(false);
  const [filterClick, setFilterClick] = useState(false);
  const [communityNames, setCommunityNames] = useState([]);
  const [selectedCommunity, setSelectedCommunity] = useState([]);
  const [selectedBadges, setSelectedBadges] = useState([]);
  const [leaderBoardDatas, setLeaderBoardDatas] = useState({});
  const [leaderBoardFilterDatas, setLeaderBoardFilterDatas] = useState([]);
  const [badges, setBadges] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [filterCommunity, setFilterCommunity] = useState([]);
  const [filterBadges, setFilterBadges] = useState([]);
  const [pageLength, setPageLength] = useState(0);
  const [badgeValues, setBadgeValues] = useState([]);
  const [communityValue, setCommunityValue] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenBadges, setIsOpenBadges] = useState(false);
  const [valueCommunity, setValueCommunity] = useState([]);
  const [valueBadge, setValueBadge] = useState([]);
  const [trigerFilterDatas, setTrigerfilterDatas] = useState(false);
  const [calendarEvents, setCalendarEvents] = useState({
    event_time: "",
    no_of_winners: "",
    prize_money: "",
    previous_event_id: "",
    event_status: "",
    winner_list: [],
    video: "",
  });

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

  const handleModalClose = () => {
    setModalOpen(false);
  };

  const getPopUpClassName = (name) => {
    const badgeName = name.toLowerCase();
    const numberMatch = badgeName.match(/\d+/);
    if (badgeName.includes("medallion")) {
      return `medallion${numberMatch[0]}`;
    } else if (badgeName.includes("ribbon")) {
      return `ribbon${numberMatch[0]}`;
    }
  };

  const handlePopUP = (name) => {
    setInitialLoading(true);
    const popUpsContent = badgeValues.filter((el) => el.name === name);
    leaderboardBadgesGetApiCall(
      popUpsContent[0] && popUpsContent[0]?.client_badge_id,
      (response) => {
        setPopUpContent(response.data[0]);
        setTimeout(() => {
          setModalOpen(true);
          setInitialLoading(false);
        }, 1500);
      },
      (error) => {
        navigateServerErrorPage(error?.response?.status);
        setInitialLoading(false);
      }
    );
  };

  const badgeContent = (
    <div
      className={`${
        popUpContent?.name && getPopUpClassName(popUpContent?.name)
      }`}
    >
      <>
        <Typography variant="h5">
          <img src={popUpContent?.image} alt="" />
          <span>{`//`}</span>
          {popUpContent?.name?.toUpperCase()}
        </Typography>

        <Divider />

        <Typography>{popUpContent?.description}</Typography>

        <Typography variant="h6">
          {popUpContent?.name?.includes("MEDALLION")
            ? `Holders of this medallion: ${popUpContent?.no_of_count_leaderboard}`
            : `Holders of this ribbon: ${popUpContent?.no_of_count_leaderboard}`}
        </Typography>
      </>
    </div>
  );

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const Menu = (props) => {
    return (
      <div
        style={{
          backgroundColor: "white",
          borderRadius: 4,

          marginTop: 8,
          position: "absolute",
          zIndex: 2,
        }}
        {...props}
      />
    );
  };

  const Blanket = (props) => (
    <div
      style={{
        bottom: 0,
        left: 0,
        top: 0,
        right: 0,
        position: "fixed",
        zIndex: 1,
      }}
      {...props}
    />
  );

  const Dropdown = ({ children, isOpen, target, onClose }) => (
    <div style={{ position: "relative" }}>
      {target}
      {isOpen ? <Menu>{children}</Menu> : null}
      {isOpen ? <Blanket onClick={onClose} /> : null}
    </div>
  );

  const selectStyles = {
    control: (provided) => ({
      ...provided,
      minWidth: 240,
      margin: 8,
    }),
    menu: () => ({ boxShadow: "inset 0 1px 0 rgba(0, 0, 0, 0.1)" }),
  };

  const { colors } = defaultTheme;

  const DropdownIndicator = () => (
    <div style={{ color: colors.neutral20, height: 24, width: 32 }}>
      <svg>
        <path
          d="M16.436 15.085l3.94 4.01a1 1 0 0 1-1.425 1.402l-3.938-4.006a7.5 7.5 0 1 1 1.423-1.406zM10.5 16a5.5 5.5 0 1 0 0-11 5.5 5.5 0 0 0 0 11z"
          fill="currentColor"
          fillRule="evenodd"
        />
      </svg>
    </div>
  );

  // const settings = {
  //   dots: false,
  //   infinite: true,
  //   speed: 500,
  //   slidesToShow: 3,
  //   slidesToScroll: 1,
  // };

  const rowtables = () => {
    let rows = [];
    if (matches1) {
      for (let i = 0; i <= 5; i++) {
        rows.push(
          <TableCell>
            <img src={loading} alt="loading" />
          </TableCell>
        );
      }
    } else if (!matches1) {
      for (let i = 0; i <= 3; i++) {
        rows.push(
          <TableCell>
            <img src={loading} alt="loading" />
          </TableCell>
        );
      }
    }
    return rows;
  };

  useEffect(() => {
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
        currentHeight + 1 >= scrollHeight
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

  const getCalendarEvents = (config) => {
    fetchCalendarEvents(
      (response) => {
        setCalendarEvents(response.data);
      },
      (error) => {
        navigateServerErrorPage(error?.response?.status);
      },
      config
    );
  };
  const refreshData = () => {};

  const fetchCommunityData = (config) => {
    communityDataListApiCall(
      (response) => {
        setCommunityValue(response.data);
        let mobileData = [];
        response.data.map((el) => mobileData.push(el.server_name));
        let deskTopData = [];
        response.data.map((el) =>
          deskTopData.push({ value: el.server_id, label: el.server_name })
        );
        setCommunityNames(matches ? deskTopData : mobileData);
      },
      (err) => {
        navigateServerErrorPage(err?.response?.status);
      },
      config
    );
  };

  const fetchBadgeData = (config) => {
    leaderboardBadgesListApiCall(
      (response) => {
        setBadgeValues(response.data);
        let mobileData = [];
        response.data.map((el) => mobileData.push(el.name));
        let deskTopData = [];
        response.data.map((el) =>
          deskTopData.push({ value: el.client_badge_id, label: el.name })
        );
        setBadges(matches ? deskTopData : mobileData);
      },
      (err) => {
        navigateServerErrorPage(err?.response?.status);
      },
      config
    );
  };

  useEffect(() => {
    if (matches) {
      let desktopCommunityData = [];
      valueCommunity.map((el) => desktopCommunityData.push(el.value));
      setFilterCommunity(desktopCommunityData);

      let desktopBadgesdata = [];
      valueBadge.map((el) => desktopBadgesdata.push(el.value));
      setFilterBadges(desktopBadgesdata);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [valueCommunity, valueBadge, selectedBadges, selectedCommunity]);

  useEffect(() => {
    if (!matches) {
      const mobileCommunityData = communityValue
        .filter((el) => selectedCommunity.includes(el.server_name))
        .map((el) => el.server_id);
      setFilterCommunity(mobileCommunityData);

      const mobileBadgesData = badgeValues
        .filter((el) => selectedBadges.includes(el.name))
        .map((el) => el.client_badge_id);
      setFilterBadges(mobileBadgesData);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [trigerFilterDatas]);

  const getleaderBoardData = (config) => {
    setIsLoading(true);
    leaderboardApiCall(
      memberSwitch ? "community" : "member",
      allTimeSwitch ? "since_last_raffle" : "all-time",
      currPage,
      filterCommunity,
      searchValue,
      filterBadges,
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

  useEffect(() => {
    localStorage.removeItem("currPage");
    localStorage.removeItem("count");

    const controller = new AbortController();
    const config = {
      signal: controller.signal,
    };

    fetchCommunityData(config);
    fetchBadgeData(config);
    getCalendarEvents(config);

    return () => {
      controller.abort();
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (memberSwitch) {
      setFilterBadges([]);
    }
    setCurrPage(1);
    setLeaderBoardFilterDatas([]);
  }, [memberSwitch, allTimeSwitch]);

  useEffect(() => {
    const controller = new AbortController();
    const config = {
      signal: controller.signal,
    };
    getleaderBoardData(config);
    return () => {
      controller.abort();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currPage]);

  useEffect(() => {
    const controller = new AbortController();
    const config = {
      signal: controller.signal,
    };
    setLeaderBoardFilterDatas([]);
    setCurrPage(1);
    getleaderBoardData(config);

    return () => {
      controller.abort();
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    memberSwitch,
    searchValue,
    filterCommunity,
    // currPage,
    allTimeSwitch,
    filterBadges,
    trigerFilterDatas,
  ]);
  return (
    <>
      {initialLoading && <LoadingOverlay />}
      <div className="slider">
        <CalendarEvents
          calendarEvents={calendarEvents}
          fetchCalendarEvents={getCalendarEvents}
        />
        <div className="tableContent">
          {matches ? (
            <>
              <h4>
                Leaderboard
                {calendarEvents?.event_status === "upcoming" &&
                  calendarEvents?.completed_event && (
                    <>
                      <span>{`//`}</span>
                      <Link to="/announcement-table">
                        View Previous Winners
                      </Link>
                    </>
                  )}
              </h4>

              <div className="tableControlls">
                <div>
                  <Typography
                    onClick={
                      leaderBoardFilterDatas?.length === 0
                        ? ""
                        : () => setMemberSwitch(false)
                    }
                    className={memberSwitch ? "" : "selected"}
                  >
                    Members
                  </Typography>
                  <Switch
                    name="member"
                    onClick={() => setMemberSwitch(!memberSwitch)}
                    checked={memberSwitch}
                    disabled={leaderBoardFilterDatas?.length === 0}
                  />
                  <Typography
                    className={memberSwitch ? "selected" : ""}
                    onClick={
                      leaderBoardFilterDatas?.length === 0
                        ? ""
                        : () => setMemberSwitch(true)
                    }
                  >
                    Communities
                  </Typography>
                </div>
                <div>
                  <Typography
                    className={allTimeSwitch ? "" : "selected"}
                    onClick={
                      leaderBoardFilterDatas?.length === 0
                        ? ""
                        : () => setAllTimeSwitch(false)
                    }
                  >
                    All-Time
                  </Typography>
                  <Switch
                    name="alltime"
                    onClick={() => setAllTimeSwitch(!allTimeSwitch)}
                    checked={allTimeSwitch}
                    disabled={leaderBoardFilterDatas?.length === 0}
                  />
                  <Typography
                    className={allTimeSwitch ? "selected" : ""}
                    onClick={
                      leaderBoardFilterDatas?.length === 0
                        ? ""
                        : () => setAllTimeSwitch(true)
                    }
                  >
                    Since Last Drawing
                  </Typography>
                </div>
                <div>
                  <div className="communityList">
                    <Dropdown
                      isOpen={isOpen}
                      onClose={() => setIsOpen(false)}
                      target={
                        <button
                          onClick={() => setIsOpen((prev) => !prev)}
                          isSelected={isOpen}
                          disabled={leaderBoardFilterDatas?.length === 0}
                        >
                          Community
                          <span>
                            <img src={Arrow} alt="Arrow" />
                          </span>
                        </button>
                      }
                    >
                      <Select
                        isMulti
                        autoFocus
                        backspaceRemovesValue={false}
                        components={{
                          DropdownIndicator,
                          IndicatorSeparator: null,
                        }}
                        controlShouldRenderValue={false}
                        hideSelectedOptions={false}
                        isClearable={false}
                        menuIsOpen
                        onChange={(newValue) => {
                          setValueCommunity(newValue);
                        }}
                        options={communityNames}
                        placeholder="Search"
                        styles={selectStyles}
                        tabSelectsValue={false}
                        value={valueCommunity}
                        isSearchable
                        classNames={{
                          option: ({ isSelected }) =>
                            classNames(isSelected && "optionActive"),
                        }}
                      />
                    </Dropdown>
                  </div>
                </div>
                <div className={!memberSwitch ? "" : "hide"}>
                  {!memberSwitch && (
                    <div className="badgeList">
                      <Dropdown
                        isOpen={isOpenBadges}
                        onClose={() => setIsOpenBadges(false)}
                        target={
                          <button
                            onClick={() => setIsOpenBadges((prev) => !prev)}
                            isSelected={isOpenBadges}
                            disabled={leaderBoardFilterDatas?.length === 0}
                          >
                            Badges
                            <span>
                              <img src={Arrow} alt="Arrow" />
                            </span>
                          </button>
                        }
                      >
                        <Select
                          isMulti
                          autoFocus
                          backspaceRemovesValue={false}
                          components={{
                            DropdownIndicator,
                            IndicatorSeparator: null,
                          }}
                          controlShouldRenderValue={false}
                          hideSelectedOptions={false}
                          isClearable={false}
                          menuIsOpen
                          onChange={(newValue) => {
                            setValueBadge(newValue);
                          }}
                          options={badges}
                          placeholder="Search"
                          styles={selectStyles}
                          tabSelectsValue={false}
                          value={valueBadge}
                          isSearchable
                          classNames={{
                            option: ({ isSelected }) =>
                              classNames(isSelected && "optionActive"),
                          }}
                        />
                      </Dropdown>
                    </div>
                  )}
                </div>
                <div>
                  <img src={SearchIcon} alt="Serach" />
                  <input
                    type="text"
                    placeholder="Search"
                    onChange={(e) => setSearchValue(e.target.value)}
                    // disabled={leaderBoardFilterDatas?.length === 0}
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
                  <img src={filterImage} alt={filterClick ? "gray" : "white"} />
                </IconButton>
              </div>
              {filterClick && (
                <div className="tableControlls">
                  <div>
                    <img src={SearchIcon} alt="Serach" />
                    <input
                      type="text"
                      onChange={(e) => setSearchValue(e.target.value)}
                      // disabled={leaderBoardFilterDatas?.length === 0}
                    />
                    <button>Search</button>
                  </div>
                  <div className="filterRow one">
                    <div>
                      <Typography
                        className={memberSwitch ? "" : "selected"}
                        onClick={
                          leaderBoardFilterDatas?.length === 0
                            ? ""
                            : () => setMemberSwitch(false)
                        }
                      >
                        Members
                      </Typography>
                      <Switch
                        name="member"
                        onClick={() => setMemberSwitch(!memberSwitch)}
                        checked={memberSwitch}
                        disabled={leaderBoardFilterDatas?.length === 0}
                      />
                      <Typography
                        className={memberSwitch ? "selected" : ""}
                        onClick={
                          leaderBoardFilterDatas?.length === 0
                            ? ""
                            : () => setMemberSwitch(true)
                        }
                      >
                        Communities
                      </Typography>
                    </div>
                  </div>
                  <div className="filterRow one">
                    <div>
                      <Typography
                        className={allTimeSwitch ? "" : "selected"}
                        onClick={
                          leaderBoardFilterDatas?.length === 0
                            ? ""
                            : () => setAllTimeSwitch(false)
                        }
                      >
                        All-Time
                      </Typography>
                      <Switch
                        name="alltime"
                        onClick={() => setAllTimeSwitch(!allTimeSwitch)}
                        checked={allTimeSwitch}
                        disabled={leaderBoardFilterDatas?.length === 0}
                      />
                      <Typography
                        className={allTimeSwitch ? "selected" : ""}
                        onClick={
                          leaderBoardFilterDatas?.length === 0
                            ? ""
                            : () => setAllTimeSwitch(true)
                        }
                      >
                        Since Last Drawing
                      </Typography>
                    </div>
                  </div>
                  <div className="filterRow two">
                    <div>
                      <div className="communityList">
                        <MultipleSelectCheckmarks
                          labels={"Community"}
                          names={communityNames}
                          setSelectedValue={setSelectedCommunity}
                          selectedValue={selectedCommunity}
                          isDisabled={leaderBoardFilterDatas?.length === 0}
                          trigerFilterDatas={trigerFilterDatas}
                          setTrigerfilterDatas={setTrigerfilterDatas}
                        />
                      </div>
                    </div>
                    {!memberSwitch && (
                      <div>
                        <div className="badgeList">
                          <MultipleSelectCheckmarks
                            labels={"Badge"}
                            names={badges}
                            setSelectedValue={setSelectedBadges}
                            selectedValue={selectedBadges}
                            isDisabled={leaderBoardFilterDatas?.length === 0}
                            trigerFilterDatas={trigerFilterDatas}
                            setTrigerfilterDatas={setTrigerfilterDatas}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </>
          )}
          {matches1 ? (
            <div className="tableDiv">
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
                    {!memberSwitch && (
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
                    )}
                    {memberSwitch && (
                      <TableCell>
                        Community
                        <Tooltip
                          title="The community from which a user earned the majority of their tickets."
                          placement="top"
                          arrow
                        >
                          <img src={HelpIcon} alt="Help" />
                        </Tooltip>
                      </TableCell>
                    )}
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
                    {!memberSwitch && (
                      <TableCell>
                        Community
                        <Tooltip
                          title="The community from which a user earned the majority of their tickets."
                          placement="top"
                          arrow
                        >
                          <img src={HelpIcon} alt="Help" />
                        </Tooltip>
                      </TableCell>
                    )}
                    {memberSwitch && (
                      <TableCell>
                        Top Member
                        <Tooltip
                          title="People who have opted-in to Jackpot within their community’s Discord Server."
                          placement="top"
                          arrow
                        >
                          <img src={HelpIcon} alt="Help" />
                        </Tooltip>
                      </TableCell>
                    )}
                    <TableCell>
                      {!memberSwitch ? "Twitter" : "Community Twitter"}
                    </TableCell>
                    <TableCell onClick={refreshData}>
                      <RefreshIcon />
                    </TableCell>
                  </>
                }
                tableBody={
                  <>
                    {leaderBoardFilterDatas &&
                      leaderBoardFilterDatas?.map((el, index) => (
                        <>
                          {!memberSwitch ? (
                            <>
                              <TableRow>
                                <TableCell>
                                  <span> {addingArrow(el?.trend)}</span>
                                  <span>
                                    {addingRankImage(el?.member_rank)}
                                  </span>
                                </TableCell>
                                <TableCell>
                                  <Avatar src={el?.member_pfp_link} />
                                  <span className="user">
                                    {idSplit(el?.member_name)}
                                  </span>
                                  <Sliders
                                    badges={el?.badges}
                                    handlePopUP={handlePopUP}
                                  />
                                  {/* <Slider  className="scrollBadge">
                                    {el?.badges?.map((el, index) => (
                                      <img
                                        key={index}
                                        src={el?.image}
                                        alt={`star${index}`}
                                        className="star"
                                        style={{
                                          width: "24px",
                                          height: "20px",
                                        }}
                                        onClick={() => handlePopUP(el?.name)}
                                      />
                                    ))}
                                  </Slider> */}
                                </TableCell>
                                <TableCell>
                                  {el?.member_xp
                                    .toString()
                                    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}{" "}
                                  <img src={Ticket} alt="ticket" />
                                </TableCell>
                                <TableCell>
                                  <Avatar src={el?.community_pfp_link} />
                                  <p className="communityName">
                                    {el?.community_name}
                                  </p>
                                </TableCell>
                                <TableCell>
                                  <span className="twittername">
                                    {el?.twitter_handle}
                                  </span>
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
                            </>
                          ) : (
                            <>
                              <TableRow>
                                <TableCell>
                                  <span> {addingArrow(el?.trend)}</span>
                                  <span>
                                    {addingRankImage(el?.member_rank)}
                                  </span>
                                </TableCell>
                                <TableCell>
                                  <Avatar src={el?.community_pfp_link} />
                                  <p className="communityName">
                                    {el?.community_name}
                                  </p>
                                </TableCell>
                                <TableCell>
                                  {el?.member_xp
                                    .toString()
                                    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}{" "}
                                  <img src={Ticket} alt="ticket" />
                                </TableCell>
                                <TableCell>
                                  <Avatar src={el?.member_pfp_link} />
                                  <span className="user">
                                    {idSplit(el?.member_name)}
                                  </span>
                                </TableCell>
                                <TableCell>
                                  <span className="twittername">
                                    {el?.twitter_handle}
                                  </span>
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
                            </>
                          )}
                        </>
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
                          {" "}
                          <p>No Search Results</p>{" "}
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
            <div className="tableDiv">
              <CustomTableComponent
                tableHead={
                  <>
                    <AccordionSummary>
                      <TableCell>
                        Rank
                        <img src={HelpIcon} alt="Help" />
                      </TableCell>
                      <TableCell>
                        Member
                        <img src={HelpIcon} alt="Help" />
                      </TableCell>
                      <TableCell>
                        Tickets
                        <img src={HelpIcon} alt="Help" />
                      </TableCell>
                    </AccordionSummary>
                  </>
                }
                tableBody={
                  <>
                    {leaderBoardFilterDatas &&
                      leaderBoardFilterDatas?.map((el) => (
                        <>
                          <TableRow>
                            <Accordion
                              expanded={expanded === parseInt(el?.member_rank)}
                              onChange={handleChange(parseInt(el?.member_rank))}
                            >
                              <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1a-content"
                                key={el?.member_name}
                                id="panel1a-header"
                              >
                                <TableCell>
                                  <span>{addingArrow(el?.trend)}</span>
                                  <span>{el?.member_rank}</span>
                                </TableCell>
                                <TableCell>
                                  <Avatar src={el?.member_pfp_link} />
                                  <span className="user">
                                    {idSplit(el?.member_name)}
                                  </span>
                                </TableCell>
                                <TableCell>
                                  <span>
                                    {el?.member_xp
                                      .toString()
                                      .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                                  </span>
                                  <img src={Ticket} alt="ticket" />
                                </TableCell>
                              </AccordionSummary>
                              <AccordionDetails>
                                <div className="dropdwn">
                                  <div className="stars">
                                    {el?.badges?.map((el) => (
                                      <img
                                        src={el.image}
                                        alt="star"
                                        className="star"
                                        onClick={() => handlePopUP(el?.name)}
                                      />
                                    ))}
                                  </div>
                                  <div className="communityImgName">
                                    <Avatar src={el?.community_pfp_link} />
                                    <p className="communityName">
                                      {el?.community_name}
                                    </p>
                                  </div>
                                  <a
                                    href={el?.twitter_url}
                                    // target="_blank"
                                    rel="noreferrer"
                                  >
                                    <img src={twitterIcon} alt="link" />
                                  </a>
                                </div>
                              </AccordionDetails>
                            </Accordion>
                          </TableRow>
                        </>
                      ))}
                    {isLoading && (
                      <>
                        <TableRow className="loaderRows">
                          <Accordion>
                            <AccordionSummary>{rowtables()}</AccordionSummary>
                          </Accordion>
                        </TableRow>
                        <TableRow className="loaderRows">
                          <Accordion>
                            <AccordionSummary>{rowtables()}</AccordionSummary>
                          </Accordion>
                        </TableRow>
                        <TableRow className="loaderRows">
                          <Accordion>
                            <AccordionSummary>{rowtables()}</AccordionSummary>
                          </Accordion>
                        </TableRow>
                        <TableRow className="loaderRows">
                          <Accordion>
                            <AccordionSummary> {rowtables()}</AccordionSummary>
                          </Accordion>
                        </TableRow>
                      </>
                    )}
                    {!isLoading && leaderBoardFilterDatas?.length === 0 && (
                      <TableRow className="loaderRows">
                        <TableCell>
                          {" "}
                          <p>No Search Results</p>{" "}
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
          )}
        </div>
      </div>
      <ModalComponent
        modalOpen={modalOpen}
        handleClose={handleModalClose}
        modalValue={badgeContent}
      />
    </>
  );
}

export default LeaderBoard;
