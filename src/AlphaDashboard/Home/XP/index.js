import React from "react";
import XPCard from "../../../Components/XP Card";

const card1 = {
  heading: "Discord",
  para: (
    <span>
      Earn tickets automatically by being active
      <br /> in Discord. These metrics are designed so
      <br /> that bots won’t get very far.
    </span>
  ),
  ul: [
    "Sending messages (Diminishing Returns)",
    "Reacting to messages (Diminishing Returns)",
    "Other people replying to your messages",
    "Other people reacting to your messages",
    "Being among the first to interact with a new member",
    "Inviting new (human) people to the server",
    "Visiting the server daily",
    "Catch a crystal",
  ],
};

const card2 = {
  heading: "Twitter",
  para: (
    <span>
      Earn tickets by engaging with Raid Tweets.
      <br />
      Projects can choose which Tweets they’d
      <br />
      like their community to Raid.
    </span>
  ),
  ul: [
    "Retweeting a Raid Tweet",
    "Replying to a Raid Tweet",
    "Liking a Raid Tweet",
  ],
};

const card3 = {
  heading: "Quests",
  para: (
    <span>
      Earn tickets by completing Quests. Projects
      <br />
      can decide which Quests to activate in their
      <br /> server.
    </span>
  ),
  ul: [
    "Creating project-inspired memes",
    "Hosting community-led Twitter spaces",
    "Giving another member a shoutout on Twitter",
    "Creating project-inspired artwork",
    "Attending events",
    "Hosting in-person meetups",
    "Anything else your community leaders can think of",
  ],
};

export default function AlphaXP() {
  return (
    <>
      <div className="titleContent alpha">
        <div className="title"></div>
        <h1>
          A <span>WIn-WIN</span> FOR <span> Projects</span> AND THEIR{" "}
          <span>COMMUNITIES</span>.
        </h1>
      </div>
      <div className="xp">
        <div className="XpContent">
          <h1>
            HOW TO EARN <span>TICKETS</span>
          </h1>
          <p>
            Tickets are automatically issued through our Discord bot whenever
            you do
            <br />
            &nbsp;something that benefits your community.
          </p>
        </div>
        <div className="XpBox alpha">
          <XPCard
            heading={card1.heading}
            paragraph={card1.para}
            listitem={card1.ul}
          />
          <XPCard
            heading={card2.heading}
            paragraph={card2.para}
            listitem={card2.ul}
          />
          <XPCard
            heading={card3.heading}
            paragraph={card3.para}
            listitem={card3.ul}
          />
        </div>
      </div>
    </>
  );
}
