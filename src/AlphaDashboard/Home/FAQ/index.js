import React, { useState } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";

import MoreArrow from "../../../assets/images/more-arrow.svg";

const faqData = [
  {
    id: 1,
    question: "Who is the team behind Jackpot?",
    answer: (
      <><span>
        Jackpot was co-founded by Andrew (@cryptobreaky), Jack (@Landao_Cal) and
        Kyle
        <br /> (@crypto_cowboy3).
        </span>
        <span> Andrew studied Psychology at Duke and is a 3x founder
        specializing in marketing and
        <br />
        advertising.
        </span>
        <span>
        Jack studied Public Policy at Duke, where he was roommates with Andrew.
        Jack and Andrew
        <br />
        won the 2021 Duke Blockchain Hackathon together and later started a
        collegiate venture DAO.
        </span>
        <span> Kyle is a lifelong entrepreneur and a repeat co-founder with
        Andrew. Kyle brings additional
        <br /> experience in enterprise ad sales.
      </span></>
    ),
  },
  {
    id: 2,
    question: "Why should my community use Jackpot?",
    answer: (
      <span>
        Jackpot adds an incentive layer that rewards your members whenever they
        do things that
        <br /> help your community. In general, Jackpot helps:
        <br />
        <br />
        <ul>
          <li>Increase visibility/reach on Twitter</li>
          <li>Foster more fruitful conversations in Discord</li>
          <li>Increase participation in events or spaces</li>
          <li>Kickstart community-led content creation</li>
          <li>Give the community something to work towards</li>
        </ul>
      </span>
    ),
  },
  {
    id: 3,
    question: "How do I start earning tickets?",
    answer: (
      <><span>
        Anyone can start earning tickets by visiting a server that uses Jackpot
        and then opting in via
        <br /> the #get-started channel. You can earn tickets from multiple
        servers at once.
        </span>
        <span> Please note that during Alpha, Jackpot will be the only community
        using Jackpot so our server
        <br />
        will temporarily be the only place to begin earning tickets.
      </span></>
    ),
  },
  {
    id: 4,
    question: "How does the Jackpot Giveaway work?",
    answer: (
      <>
        <span>
          The Jackpot Giveaway is an on-chain sweepstakes that uses Chainlink
          VRF to randomly
          <br /> choose a few winners who each receive a portion of our revenue
          in $USDC. Your odds of
          <br />
          winning the Jackpot Giveaway depend on the amount of tickets you’ve
          earned relative to
          <br />
          others participating in the sweepstakes. If you have the most tickets,
          it does not guarantee
          <br /> you’ll win the Jackpot Giveaway; it simply means that you will
          have the greatest chance of
          <br />
          winning. Winnings from the Jackpot Giveaway are transferred
          automatically to your ETH
          <br />
          wallet.
        </span>
      </>
    ),
  },
  {
    id: 5,
    question: "Why should I participate in Alpha?",
    answer: (
      <>
      <span>
        During Alpha, Jackpot will be the only community using Jackpot. This is
        to ensure that our
        <br /> team is able to react quickly to feedback and continue to iterate
        on our solution. There will be
        <br />
        several Jackpot Giveaways during Alpha that are exclusively available to
        Alpha participants.
        </span>
        <span>
        Upon the conclusion of Alpha, the top 33% of participants will receive
        an airdrop.
      </span>
      </>
    ),
  },
];

export default function AlphaFAQ() {
  const [expanded, setExpanded] = useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <div className="FAQ alpha">
      <div className="FaqAccodn">
        <h1>
          <span>FAQs</span>
          <a href="https://docs.getjackpot.xyz/whitepaper/faq">
            View More <img src={MoreArrow} alt="moreArrow" />
          </a>
        </h1>
        {faqData.map((el) => (
          <Accordion
            expanded={expanded === el.id}
            onChange={handleChange(el.id)}
          >
            <AccordionSummary
              expandIcon={expanded === el.id ? "-" : "+"}
              aria-controls="panel1a-content"
              id="panel1a-header"
              key={el.id}
            >
              <Typography>{el.question}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>{el.answer}</Typography>
            </AccordionDetails>
          </Accordion>
        ))}
      </div>
    </div>
  );
}
