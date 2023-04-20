import React, { useState } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";

import MoreArrow from "../../../assets/images/more-arrow.svg";

// const faqData = [
//   {
//     id: 1,
//     question: "What blockchains does Jackpot support?",
//     answer: (
//       <p>
//         Jackpot is blockchain agnostic, meaning we work with projects on any
//         chain. That said, users must have an ETH wallet to be eligible to
//         receive winnings from the Jackpot Raffle.
//       </p>
//     ),
//   },
//   {
//     id: 2,
//     question: "How do you prevent bots from earning XP?",
//     answer: (
//       <p>
//         To prevent bots from climbing the leaderboard, we heavily weight actions
//         that are hard to game/automate. For example, it is much harder to get
//         someone else to respond to your message in Discord than it is to simply
//         send a message in the first place. Bots also can’t complete Quests,
//         which is where community members can really rack up XP.
//       </p>
//     ),
//   },
//   {
//     id: 3,
//     question: "How is the Jackpot Raffle funded?",
//     answer: (
//       <p>
//         We fund the Jackpot Raffle with a substantial portion of our revenue.
//         Communities pay a monthly subscription fee to use our software, and we
//         convert much of that into USDC to raffle away to people who earn XP. The
//         more communities using Jackpot, the larger the raffle will be. Our goal
//         is to eventually give away $100K+ each month to people on the
//         leaderboard.
//       </p>
//     ),
//   },
//   {
//     id: 4,
//     question: "Who is the team behind Jackpot?",
//     answer: (
//       <>
//         <p>
//           Andrew studied Psychology at Duke University and is a 3 time founder,
//           including a full-service marketing agency and two other ventures that
//           originally focused solely on loyalty and retention. Andrew entered the
//           NFT scene during the fall of 2021 and is now working on Jackpot
//           full-time.
//         </p>
//         <p>
//           While studying Public Policy at Duke, Jack became fascinated with DAOs
//           and their influence on group decision making. Jack won a blockchain
//           hackathon in 2021, and soon after, founded a venture DAO for builders
//           transitioning into web3. He is now working on Jackpot full-time.
//         </p>
//         <p>
//           Kyle is a serial entrepreneur who co-founded several businesses with
//           Andrew and has personally sold multiple 6-figure marketing and
//           advertising packages to a number of enterprise clients. Kyle is now
//           working on Jackpot full-time.
//         </p>
//       </>
//     ),
//   },
// ];

const faqData = [
  {
    id: 1,
    question: "Who is the team behind Jackpot?",
    answer: (
      <p>
        Jackpot was co-founded by Andrew (@cryptobreaky), Jack (@Landao_Cal) and
        Kyle
        <br /> (@crypto_cowboy3).
        <br />
        <br /> Andrew studied Psychology at Duke and is a 3x founder
        specializing in marketing and
        <br />
        advertising.
        <br />
        <br />
        Jack studied Public Policy at Duke, where he was roommates with Andrew.
        Jack and Andrew
        <br />
        won the 2021 Duke Blockchain Hackathon together and later started a
        collegiate venture DAO.
        <br />
        <br /> Kyle is a lifelong entrepreneur and a repeat co-founder with
        Andrew. Kyle brings additional
        <br /> experience in enterprise ad sales.
      </p>
    ),
  },
  {
    id: 2,
    question: "Why should my community use Jackpot?",
    answer: (
      <p>
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
      </p>
    ),
  },
  {
    id: 3,
    question: "How do I start earning tickets?",
    answer: (
      <p>
        Anyone can start earning tickets by visiting a server that uses Jackpot
        and then opting in via
        <br /> the #get-started channel. You can earn tickets from multiple
        servers at once.
        <br />
        <br /> Please note that during Alpha, Jackpot will be the only community
        using Jackpot so our server
        <br />
        will temporarily be the only place to begin earning tickets.
      </p>
    ),
  },
  {
    id: 4,
    question: "How does the Jackpot Giveaway work?",
    answer: (
      <>
        <p>
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
        </p>
      </>
    ),
  },
  {
    id: 5,
    question: "Why should I participate in Alpha?",
    answer: (
      <p>
        During Alpha, Jackpot will be the only community using Jackpot. This is
        to ensure that our
        <br /> team is able to react quickly to feedback and continue to iterate
        on our solution. There will be
        <br />
        several Jackpot Giveaways during Alpha that are exclusively available to
        Alpha participants.
        <br />
        <br />
        Upon the conclusion of Alpha, the top 33% of participants will receive
        an airdrop.
      </p>
    ),
  },
];

function FAQ() {
  const [expanded, setExpanded] = useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <div className="FAQ">
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
export default React.memo(FAQ);
