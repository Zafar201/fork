import React, { useEffect, useState } from "react";
import {
  Avatar,
  IconButton,
  Switch,
  TableCell,
  TableRow,
  Tooltip,
  Typography,
} from "@mui/material";
import Select from "react-select";
import { defaultTheme } from "react-select";
import Slider from "react-slick";
import classNames from "classnames";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import useMediaQuery from "@mui/material/useMediaQuery";

import { addingLeaderBoardArrow } from "../../Action";
import Arrow from "../../assets/images/arrow.svg";
import twitterIcon from "../../assets/images/icon-2.svg";
import SearchIcon from "../../assets/images/search.svg";
import SearchBtn from "../../assets/images/sm-search.svg";
import LinkImage from "../../assets/images/link.png";
import MyTimer from "../../Components/Timer";
import MultipleSelectCheckmarks from "../../Components/Select";
import crownlogosm from "../../assets/images/crownlogo-sm.png";
import crownlogolg from "../../assets/images/crownlogo-lg.png";
import Ticket from "../../assets/images/1f39f1.png";
import HelpIcon from "../../assets/images/help.png";
import filterImage from "../../assets/images/filter.svg";
import ModalComponent from "../../Components/MedalPop";
import CustomTableComponent from "../../Components/CustomTableComponent";
import loading from "../../assets/images/loader.svg";
import { demoDetails } from "../Leaderboard/tableData";
import { BadgePopUp } from "../Leaderboard/popUpData";

const names = ["All", "Pudgy Penguins", "Genuine Undead", "Doodles", "DeGods"];

function DemoLeaderBoard() {
  const [currPage, setCurrPage] = useState(1);
  const [addRows, setAddsRows] = useState(false);
  const [userList, setUserList] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [popUpContent, setPopUpContent] = useState({});
  const [expanded, setExpanded] = React.useState(false);
  const [memberSwitch, setMemberSwitch] = useState(false);
  const [filterClick, setFilterClick] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenBadges, setIsOpenBadges] = useState(false);
  const [value, setValue] = useState([]);
  const [valueBadge, setValueBadge] = useState([]);
  const [getTime, setGetTime] = useState({
    getSeconds: 0,
    getMinutes: 0,
    getHours: 0,
    getdays: 0,
  });

  const matches = useMediaQuery("(min-width:1024px)");
  const matches1 = useMediaQuery("(min-width:1024px)");

  const time = new Date();
  time.setSeconds(time.getSeconds() + 2160000);

  const newTime = new Date();
  newTime.setSeconds(newTime.getSeconds() + 2159939);

  const newTime1 = new Date();
  newTime1.setSeconds(newTime1.getSeconds() + 2159879);

  const newTime2 = new Date();
  newTime2.setSeconds(newTime2.getSeconds() + 2159819);

  const initialTimer = getTime.getMinutes === 59 || getTime.getMinutes === 0;
  const secondTimer =
    getTime.getMinutes !== 59 &&
    getTime.getMinutes !== 0 &&
    getTime.getMinutes !== 58 &&
    getTime.getMinutes !== 57;

  const fetchData = async () => {
    let Demouservalue;
    switch (currPage) {
      case 1:
        Demouservalue = demoDetails.slice(0, 14 * currPage);
        localStorage.removeItem("Demouservalue");
        break;
      case 2:
        Demouservalue = demoDetails.slice(14, 14 * currPage);
        localStorage.removeItem("Demouservalue");
        break;
      case 3:
        Demouservalue = demoDetails.slice(28, 14 * currPage);
        break;
      case 4:
        Demouservalue = demoDetails.slice(42, demoDetails.length);
        localStorage.setItem("currPage", currPage);
        break;
      default:
        break;
    }
    setUserList((prevState) => [...prevState, ...Demouservalue]);
  };

  useEffect(() => {
    fetchData();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currPage]);

  const addingRankImage = (rank) => {
    switch (rank) {
      case 1:
        return (
          <>
            <p className="rank1">1</p>
          </>
        );
      case 2:
        return (
          <>
            <p className="rank2">2</p>
          </>
        );
      case 3:
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

  const handlePopUP = (name) => {
    const popUpsContent = BadgePopUp.filter((el) => el.name === name);
    setPopUpContent(popUpsContent);
    setModalOpen(true);
  };

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

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
  };

  const rowtables = () => {
    let rows = [];
    for (let i = 0; i <= 5; i++) {
      rows.push(
        <TableCell>
          <img src={loading} alt="loading" />
        </TableCell>
      );
    }
    return rows;
  };

  useEffect(() => {
    const handleScroll = (e) => {
      const scrollHeight = e.target.documentElement.scrollHeight;
      const currentHeight =
        e.target.documentElement.scrollTop + window.innerHeight;
      if (currentHeight + 1 >= scrollHeight - 300 && currPage <= 3) {
        setAddsRows(true);
        setTimeout(() => {
          setCurrPage(currPage + 1);
          setAddsRows(false);
        }, 800);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [currPage]);

  const optionCommunity = [
    { value: "Pudgy Penguins", label: "Pudgy Penguins" },
    { value: "Genuine Undead", label: "Genuine Undead" },
    { value: "Doodles", label: "Doodles" },
    { value: "DeGods", label: "DeGods" },
  ];

  const optionBadges = [
    { value: "Pudgy Penguins", label: "Pudgy Penguins" },
    { value: "Genuine Undead", label: "Genuine Undead" },
    { value: "Doodles", label: "Doodles" },
    { value: "DeGods", label: "DeGods" },
  ];

  return (
    <>
      <div className="slider demo">
        {getTime.getMinutes === 58 && (
          <div className="timer">
            <div>
              <img src={crownlogosm} alt="crown" />
              <h5>JACKPOT SIZE</h5>
              <h2>[REDACTED]</h2>
            </div>
            <div>
              <img src={crownlogolg} alt="crown" />
              <h5>TIME UNTIL DRAWING</h5>
              <MyTimer expiryTimestamp={newTime} setGetTime={setGetTime} />
            </div>
            <div>
              <img src={crownlogosm} alt="crown" />
              <h5>NUMBER OF WINNERS</h5>
              <h2>[REDACTED]</h2>
            </div>
          </div>
        )}
        {getTime.getMinutes === 57 && (
          <div className="timer">
            <div>
              <img src={crownlogosm} alt="crown" />
              <h5>JACKPOT SIZE</h5>
              <h2>[REDACTED]</h2>
            </div>
            <div>
              <img src={crownlogolg} alt="crown" />
              <h5>TIME UNTIL DRAWING</h5>
              <MyTimer expiryTimestamp={newTime1} setGetTime={setGetTime} />
            </div>
            <div>
              <img src={crownlogosm} alt="crown" />
              <h5>NUMBER OF WINNERS</h5>
              <h2>[REDACTED]</h2>
            </div>
          </div>
        )}
        {initialTimer && (
          <div className="timer">
            <div>
              <img src={crownlogosm} alt="crown" />
              <h5>JACKPOT SIZE</h5>
              <h2>[REDACTED]</h2>
            </div>
            <div>
              <img src={crownlogolg} alt="crown" />
              <h5>TIME UNTIL DRAWING</h5>
              <MyTimer
                expiryTimestamp={time}
                setGetTime={setGetTime}
                getTime={getTime}
              />
            </div>
            <div>
              <img src={crownlogosm} alt="crown" />
              <h5>NUMBER OF WINNERS</h5>
              <h2>[REDACTED]</h2>
            </div>
          </div>
        )}
        {secondTimer && (
          <div className="timer">
            <div>
              <img src={crownlogosm} alt="crown" />
              <h5>JACKPOT SIZE</h5>
              <h2>[REDACTED]</h2>
            </div>
            <div>
              <img src={crownlogolg} alt="crown" />
              <h5>TIME UNTIL DRAWING</h5>
              <MyTimer expiryTimestamp={newTime2} setGetTime={setGetTime} />
            </div>
            <div>
              <img src={crownlogosm} alt="crown" />
              <h5>NUMBER OF WINNERS</h5>
              <h2>[REDACTED]</h2>
            </div>
          </div>
        )}
        <div className="tableContent demo">
          {matches ? (
            <>
              <h4>Leaderboard</h4>
              <div className="tableControlls">
                <div>
                  <Typography
                    className={memberSwitch ? "" : "selected"}
                    onClick={() => setMemberSwitch(false)}
                  >
                    Members
                  </Typography>
                  <Switch
                    name="member"
                    onClick={() => setMemberSwitch(!memberSwitch)}
                    checked={memberSwitch}
                  />
                  <Typography
                    className={memberSwitch ? "selected" : ""}
                    onClick={() => setMemberSwitch(true)}
                  >
                    Communities
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
                          setValue(newValue);
                        }}
                        options={optionCommunity}
                        placeholder="Search"
                        styles={selectStyles}
                        tabSelectsValue={false}
                        value={value}
                        isSearchable
                        classNames={{
                          option: ({ isSelected }) =>
                            classNames(isSelected && "optionActive"),
                        }}
                      />
                    </Dropdown>
                  </div>
                </div>
                <div className="demoLB">
                  <div className="communityList">
                    <Dropdown
                      isOpen={isOpenBadges}
                      onClose={() => setIsOpenBadges(false)}
                      target={
                        <button
                          onClick={() => setIsOpenBadges((prev) => !prev)}
                          isSelected={isOpenBadges}
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
                        options={optionBadges}
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
                </div>
                <div>
                  <img src={SearchIcon} alt="Serach" />
                  <input type="text" placeholder="Search" />
                  <button className="lg-btn">Search</button>
                  <button className="sm-btn">
                    <img src={SearchBtn} alt="Search" />
                  </button>
                </div>
              </div>
              <div>
                <img src={SearchIcon} alt="Serach" />
                <input type="text" />
                <button className="sm-btn">Search</button>
              </div>
            </>
          ) : (
            <>
              <div className="leaderBoard ">
                <h2 style={{ color: "white" }}>Leaderboard</h2>
                <IconButton onClick={() => setFilterClick(!filterClick)}>
                  <img src={filterImage} alt={filterClick ? "gray" : "white"} />
                </IconButton>
              </div>
              {filterClick && (
                <div className="tableControlls">
                  <div>
                    <img src={SearchIcon} alt="Serach" />
                    <input type="text" />
                    <button>Search</button>
                  </div>
                  <div className="filterRow one">
                    <div>
                      <Typography
                        className={memberSwitch ? "" : "selected"}
                        onClick={() => setMemberSwitch(false)}
                      >
                        Members
                      </Typography>
                      <Switch
                        name="member"
                        onClick={() => setMemberSwitch(!memberSwitch)}
                        checked={memberSwitch}
                      />
                      <Typography
                        className={memberSwitch ? "selected" : ""}
                        onClick={() => setMemberSwitch(true)}
                      >
                        Communities
                      </Typography>
                    </div>
                    <div>
                      <div className="communityList">
                        <MultipleSelectCheckmarks
                          labels={"Community"}
                          names={names}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="filterRow two">
                    <div>
                      <div className="badgeList">
                        <MultipleSelectCheckmarks
                          labels={"Badge"}
                          names={names}
                        />
                      </div>
                    </div>
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
                        title="Community members are ranked based on how much XP they’ve earned. The higher your rank, the greater your chance of winning the Jackpot Raffle."
                        placement="top"
                        arrow
                      >
                        <img src={HelpIcon} alt="" />
                      </Tooltip>
                    </TableCell>
                    <TableCell>
                      Member
                      <Tooltip
                        title="People who have opted-in to Jackpot within their community’s Discord Server."
                        placement="top"
                        arrow
                      >
                        <img src={HelpIcon} alt="Help" />
                      </Tooltip>
                    </TableCell>
                    <TableCell>
                      Tickets
                      <Tooltip
                        title="Users earn XP by doing things that benefit their communities. Read our whitepaper to learn how."
                        placement="top"
                        arrow
                      >
                        <img src={HelpIcon} alt="Help" />
                      </Tooltip>
                    </TableCell>
                    <TableCell>
                      Community
                      <Tooltip
                        title="The community from which a user earned the majority of their XP."
                        placement="top"
                        arrow
                      >
                        <img src={HelpIcon} alt="Help" />
                      </Tooltip>
                    </TableCell>
                    <TableCell>Twitter</TableCell>
                    <TableCell></TableCell>
                  </>
                }
                tableBody={
                  <>
                    {userList.map((el, index) => (
                      <TableRow>
                        <TableCell>
                          <span> {addingLeaderBoardArrow(el.status)}</span>
                          <span>{addingRankImage(index + 1)}</span>
                        </TableCell>
                        <TableCell>
                          <Avatar src={el.img} />
                          <span className="user">
                            {el.user}
                            <span> {el.id}</span>
                          </span>
                          <Slider {...settings} className="scrollBadge">
                            {el.star.map((el) => (
                              <img
                                src={el.star}
                                alt="star"
                                className="star"
                                style={{ width: "24px", height: "20px" }}
                                onClick={() => handlePopUP(el.name)}
                              />
                            ))}
                          </Slider>
                        </TableCell>
                        <TableCell>
                          {el.xp
                            .toString()
                            .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}{" "}
                          <img src={Ticket} alt="ticket" />
                        </TableCell>
                        <TableCell>
                          <Avatar src={el.communityProfile} />
                          <p className="communityName">{el.community}</p>
                        </TableCell>
                        <TableCell>
                          <span>{el.twitter}</span>
                          <img src={LinkImage} alt="link" />
                        </TableCell>
                        <TableCell></TableCell>
                      </TableRow>
                    ))}
                    {addRows ? (
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
                    ) : (
                      ""
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
                    {userList.map((el, index) => (
                      <>
                        <TableRow>
                          <Accordion
                            expanded={expanded === el.rank}
                            onChange={handleChange(el.rank)}
                          >
                            <AccordionSummary
                              expandIcon={<ExpandMoreIcon />}
                              aria-controls="panel1a-content"
                              key={el.user}
                              id="panel1a-header"
                            >
                              <TableCell>
                                <span>{addingLeaderBoardArrow(el.status)}</span>
                                <span>{index + 1}</span>
                              </TableCell>
                              <TableCell>
                                <Avatar src={el.img} />
                                <span className="user">
                                  {el.user} {el.id}
                                </span>
                              </TableCell>
                              <TableCell>
                                <span>
                                  {el.xp
                                    .toString()
                                    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                                </span>
                                <img src={Ticket} alt="ticket" />
                              </TableCell>
                            </AccordionSummary>
                            <AccordionDetails>
                              <div className="dropdwn">
                                <div className="stars">
                                  {el.star.map((el) => (
                                    <img
                                      src={el.star}
                                      alt="star"
                                      className="star"
                                    />
                                  ))}
                                </div>
                                <div className="communityImgName">
                                  <Avatar src={el.communityProfile} />
                                  <p className="communityName">
                                    {el.community}
                                  </p>
                                </div>
                                <img src={twitterIcon} alt="link" />
                              </div>
                            </AccordionDetails>
                          </Accordion>
                        </TableRow>
                      </>
                    ))}
                    {addRows ? (
                      <>
                        <TableRow className="loaderRows">
                          <TableCell colSpan={5}> </TableCell>
                        </TableRow>
                        <TableRow className="loaderRows">
                          <TableCell colSpan={5}> </TableCell>
                        </TableRow>
                        <TableRow className="loaderRows">
                          <TableCell colSpan={5}> </TableCell>
                        </TableRow>
                        <TableRow className="loaderRows">
                          <TableCell colSpan={5}> </TableCell>
                        </TableRow>
                      </>
                    ) : (
                      ""
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
        modalValue={popUpContent[0]?.contents}
      />
    </>
  );
}

export default DemoLeaderBoard;
