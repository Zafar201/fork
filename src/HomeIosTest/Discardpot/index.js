import React, { useEffect, useState } from "react";
import {
  Card,
  CardActions,
  Switch,
  IconButton,
  Collapse,
  CardContent,
  Typography,
  Accordion,
  AccordionDetails,
  AccordionSummary,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";

import {
  handlePublickViewValues,
  handleAdminViewValues,
  handleMobilePublickViewValues,
  handleMobileAdminViewValues,
} from "./ToggleValues";

const jackpotMenus = [
  {
    text: "#",
    text1: " get-started",
  },
  {
    text: "#",
    text1: " leaderboard",
  },
  {
    text: "#",
    text1: " raids",
  },
  {
    text: "#",
    text1: " quests",
  },
  {
    text: "#",
    text1: " notifs",
  },
];
const jackpotAdminMenus = [
  {
    text: "#",
    text1: " add-quest",
  },
  {
    text: "#",
    text1: " launch-raid",
  },
];
export default function AlphaDiscardPot() {
  const [expanded, setExpanded] = useState(true);
  const [expanded1, setExpanded1] = useState(true);
  const [accordianExpanded, setAccordianExpanded] = useState(false);
  const [accordianExpanded1, setAccordianExpanded1] = useState(false);
  const [menuOption, setMenuoption] = useState("");
  const [toggleView, setToggleView] = useState(false);
  const [mobileMenuOption, setMobileMenuoption] = useState("");

  const matches = useMediaQuery("(min-width:1023px)");

  const handleAdminChange = (panel) => (event, isExpanded) => {
    setAccordianExpanded1(isExpanded ? panel : false);
  };

  const handleJackpotChange = (panel) => (event, isExpanded) => {
    setAccordianExpanded(isExpanded ? panel : false);
  };

  useEffect(() => {
    setAccordianExpanded1(false);
    setAccordianExpanded(false);
  }, [toggleView]);

  const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
  })(({ theme, expand }) => ({
    transform: !expand ? "rotate(180deg)" : "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  }));

  const handleToggleClick = () => {
    setToggleView(!toggleView);
    setMenuoption("");
    setMobileMenuoption("");
    if (toggleView === false) {
      setExpanded(false);
      setExpanded1(true);
    } else if (toggleView === true) {
      setExpanded(true);
    }
  };

  const handlePublicView = () => {
    setMenuoption("");
    setMobileMenuoption("");
    setToggleView(false);
    setExpanded(true);
    setExpanded1(true);
  };

  const handleAdminView = () => {
    setMenuoption("");
    setMobileMenuoption("");
    setToggleView(true);
    setExpanded(false);
  };

  const handleExpandClick = () => {
    setMenuoption("");
    setMobileMenuoption("");
    setExpanded(!expanded);
  };

  const handleExpandClick1 = () => {
    setMenuoption("");
    setMobileMenuoption("");
    setExpanded1(!expanded1);
  };

  return (
    <>
      {matches ? (
        <div className="DiscardBot alpha">
          <h1>
            ELEGANCE <span>IN SIMPLICITY</span>
          </h1>
          {menuOption !== "" ? (
            <p>
              Jackpot takes less than 5 minutes to set up
              <br />
              and only involves 5 public channels.
            </p>
          ) : (
            <p>
              Our Discord Bot takes less than 5 minutes to set up
              <br />
              and only involves 5 public channels.
            </p>
          )}
          <div>
            <Card sx={{ maxWidth: 345, maxHeight: 400 }}>
              <div>
                <b
                  style={{ color: toggleView ? "gray" : "white" }}
                  onClick={handlePublicView}
                >
                  PUBLIC VIEW
                </b>
                <Switch onClick={handleToggleClick} checked={toggleView} />
                <b
                  style={{ color: toggleView ? "white" : "gray" }}
                  onClick={handleAdminView}
                >
                  ADMIN VIEW
                </b>
              </div>
              <div>
                {toggleView ? (
                  <>
                    <CardActions disableSpacing>
                      <Typography>
                        {expanded1 ? <ExpandMoreIcon /> : <ExpandLessIcon />}
                        JACKPOT ADMIN
                        <ExpandMore
                          expand={expanded1}
                          onClick={handleExpandClick1}
                          aria-expanded={expanded1}
                          aria-label="show more"
                        ></ExpandMore>
                      </Typography>
                    </CardActions>
                    <Collapse in={expanded1} timeout="auto" unmountOnExit>
                      <CardContent>
                        {jackpotAdminMenus.map((el) => (
                          <Typography
                            key={el.text1}
                            onClick={() => setMenuoption(el.text + el.text1)}
                            className={
                              menuOption === el.text + el.text1
                                ? "selected"
                                : ""
                            }
                          >
                            {el.text}
                            <span>{el.text1}</span>
                          </Typography>
                        ))}
                      </CardContent>
                    </Collapse>
                    <CardActions disableSpacing>
                      <Typography
                        style={{ color: "rgba(143, 146, 150, 0.26)" }}
                      >
                        {expanded ? <ExpandMoreIcon /> : <ExpandLessIcon />}
                        JACKPOT
                      </Typography>
                    </CardActions>
                  </>
                ) : (
                  <>
                    <CardActions disableSpacing>
                      <Typography>
                        {expanded ? <ExpandMoreIcon /> : <ExpandLessIcon />}
                        JACKPOT
                        <ExpandMore
                          expand={expanded}
                          onClick={handleExpandClick}
                          aria-expanded={expanded}
                          aria-label="show more"
                        ></ExpandMore>
                      </Typography>
                    </CardActions>
                    <Collapse in={expanded} timeout="auto" unmountOnExit>
                      <CardContent>
                        {jackpotMenus.map((el) => (
                          <Typography
                            key={el.text1}
                            onClick={() => setMenuoption(el.text + el.text1)}
                            className={
                              menuOption === el.text + el.text1
                                ? "selected"
                                : ""
                            }
                          >
                            {el.text}
                            <span>{el.text1}</span>
                          </Typography>
                        ))}
                      </CardContent>
                    </Collapse>
                  </>
                )}
              </div>
            </Card>
          </div>
          <div>
            {toggleView
              ? handleAdminViewValues(menuOption)
              : handlePublickViewValues(menuOption)}
          </div>
        </div>
      ) : (
        <div className="DiscardBot alpha">
          <h1>
            ELEGANCE <span>IN SIMPLICITY</span>
          </h1>
          {mobileMenuOption !== "" ? (
            <p>
              Jackpot takes less than 5 minutes to set up
              <br /> &nbsp; and only involves 5 public channels.
            </p>
          ) : (
            <p>
              Our Discord Bot takes less than 5 minutes to set up
              <br />
              &nbsp;and only involves 5 public channels.
            </p>
          )}
          <div className="DiscardBotToggle">
            <Card sx={{ maxWidth: 345, maxHeight: 400 }}>
              <div>
                <b
                  style={{ color: toggleView ? "gray" : "white" }}
                  onClick={handlePublicView}
                >
                  PUBLIC VIEW
                </b>
                <Switch onClick={handleToggleClick} checked={toggleView} />
                <b
                  style={{ color: toggleView ? "white" : "gray" }}
                  onClick={handleAdminView}
                >
                  ADMIN VIEW
                </b>
              </div>
              <div>
                {toggleView ? (
                  <>
                    <CardActions disableSpacing>
                      <Typography onClick={handleExpandClick1}>
                        {expanded1 ? <ExpandMoreIcon /> : <ExpandLessIcon />}
                        JACKPOT ADMIN
                      </Typography>
                    </CardActions>
                    <Collapse in={expanded1} timeout="auto" unmountOnExit>
                      <CardContent>
                        {jackpotAdminMenus.map((el, index) => (
                          <Accordion
                            expanded={accordianExpanded1 === index}
                            onChange={handleAdminChange(index)}
                          >
                            <AccordionSummary
                              expandIcon={
                                accordianExpanded1 === index ? "" : ""
                              }
                              aria-controls="panel1a-content"
                              id="panel1a-header"
                              key={index}
                            >
                              <Typography
                                onClick={() =>
                                  setMobileMenuoption(el.text + el.text1)
                                }
                                className={
                                  accordianExpanded1 &&
                                  mobileMenuOption !== "" &&
                                  mobileMenuOption === el.text + el.text1
                                    ? "selected"
                                    : ""
                                }
                              >
                                {el.text}
                                <span>{el.text1}</span>
                              </Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                              <Typography>
                                {handleMobileAdminViewValues(mobileMenuOption)}
                              </Typography>
                            </AccordionDetails>
                          </Accordion>
                        ))}
                      </CardContent>
                    </Collapse>
                    <CardActions disableSpacing className="disableDiv">
                      <Typography style={{ opacity: ".3" }}>
                        {expanded ? <ExpandMoreIcon /> : <ExpandLessIcon />}
                        JACKPOT
                      </Typography>
                    </CardActions>
                  </>
                ) : (
                  <>
                    <CardActions disableSpacing>
                      <Typography onClick={handleExpandClick}>
                        {expanded ? <ExpandMoreIcon /> : <ExpandLessIcon />}
                        JACKPOT
                      </Typography>
                    </CardActions>
                    <Collapse in={expanded} timeout="auto" unmountOnExit>
                      <CardContent>
                        {jackpotMenus.map((el, index) => (
                          <Accordion
                            expanded={accordianExpanded === index}
                            onChange={handleJackpotChange(index)}
                          >
                            <AccordionSummary
                              expandIcon={accordianExpanded === index ? "" : ""}
                              aria-controls="panel1a-content"
                              id="panel1a-header"
                              key={index}
                              className={
                                menuOption === el.text + el.text1
                                  ? "selected"
                                  : ""
                              }
                            >
                              <Typography
                                onClick={() =>
                                  setMobileMenuoption(el.text + el.text1)
                                }
                                className={
                                  accordianExpanded &&
                                  mobileMenuOption !== "" &&
                                  mobileMenuOption === el.text + el.text1
                                    ? "selected"
                                    : ""
                                }
                              >
                                {el.text}
                                <span>{el.text1}</span>
                              </Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                              <Typography>
                                {handleMobilePublickViewValues(
                                  mobileMenuOption
                                )}
                              </Typography>
                            </AccordionDetails>
                          </Accordion>
                        ))}
                      </CardContent>
                    </Collapse>
                  </>
                )}
              </div>
            </Card>
          </div>
        </div>
      )}
    </>
  );
}
