export const handlePublickViewValues = (values) => {
  switch (values) {
    case "# get-started":
      return (
        <>
          <h1>
            <span>#</span>get-started
          </h1>
          <p>
            The <span>#get-started</span> channel is where community members
            <br />
            opt into Jackpot and review high-level information about
            <br />
            the platform.
          </p>
          <p>
            As a community member, opting in takes less than a<br />
            minute and is free, forever. To opt in, all you need to do
            <br />
            is securely link your Twitter account and optionally
            <br />
            specify your ETH wallet address if you’d like to be
            <br />
            considered in the Jackpot Raffle. We’ll never ask you to
            <br />
            sign a transaction with your wallet.
          </p>
        </>
      );
    case "# leaderboard":
      return (
        <>
          <h1>
            <span>#</span>leaderboard
          </h1>
          <p>
            The <span>#leaderboard</span> channel is where anyone in the
            <br />
            community can see those who have earned the most XP
            <br />
            all-time and since the last Jackpot Raffle.
          </p>
          <p>
            Community members can also earn badges that may or
            <br />
            may not unlock other benefits within your community.
          </p>
        </>
      );
    case "# raids":
      return (
        <>
          <h1>
            <span>#</span>raids
          </h1>
          <p>
            The <span>#raids</span> channel is where opted-in community
            <br />
            members can earn XP by engaging with raid tweets.
          </p>
          <p>
            Community admins have their own channel where they
            <br />
            can select Tweets they’d like the community to raid.
          </p>
        </>
      );
    case "# quests":
      return (
        <>
          <h1>
            <span>#</span>quests
          </h1>
          <p>
            The <span>#quests</span> channel is where opted-in community
            <br />
            members can earn XP by completing quests that have
            <br />
            been activated by admins.
          </p>
          <p>
            Quests are actions that require manual verification,
            <br />
            like creating project-inspired memes or hosting Twitter
            <br />
            Spaces. Quests are the lifeblood of Jackpot, so we
            <br />
            encourage community leaders to think long and hard
            <br />
            about the types of actions that align with their brand.
          </p>
          <p>
            To get credit for completing a quest, community
            <br />
            members must submit proof of completion (usually a<br />
            screenshot or URL).
          </p>
        </>
      );
    case "# notifs":
      return (
        <>
          <h1>
            <span>#</span>notifs
          </h1>
          <p>
            The <span>#notifs</span> channel is where opted-in community
            <br />
            members receive notifications whenever they earn XP.
          </p>
          <p>
            This is also where community members are notified
            <br />
            when their quest submission has been approved or
            <br />
            denied by admins.
          </p>
        </>
      );
    default:
      return (
        <>
          <h1>
            <span>{`//`}</span>INTEGRATION OVERVIEW
          </h1>
          <p>
            When you add the Jackpot bot to your Discord server,
            <br />
            your community will see 5 public channels.
          </p>
          <p>
            We’ve removed every ounce of fluff from the bot, leaving
            <br />
            only the essentials. Hover your cursor over each of the
            <br />
            channels to the left to explore the structure of our bot.
          </p>
        </>
      );
  }
};

export const handleAdminViewValues = (values) => {
  switch (values) {
    case "# add-quest":
      return (
        <>
          <h1>
            <span>#</span>add-quest
          </h1>
          <p>
            The <span>#add-quest</span> channel is where community admins
            <br />
            add, edit, and delete quests.
          </p>
          <p>
            When you first add Jackpot to your server, there are a<br />
            number of default quests to get you started, however,
            <br />
            you are also free to add your own.
          </p>
        </>
      );
    case "# quest-approval":
      return (
        <>
          <h1>
            <span>#</span>quest-approval
          </h1>
          <p>
            The <span>#quest-approval</span> channel is where community
            <br />
            admins approve or deny quest submissions at their
            <br />
            discretion.
          </p>
          <p>
            When disapproving a submission, the admin must
            <br />
            provide a reason so that community members know
            <br />
            what they need to correct before trying again.
          </p>
        </>
      );
    case "# launch-raid":
      return (
        <>
          <h1>
            <span>#</span>launch-raid
          </h1>
          <p>
            The <span>#launch-raid</span> channel is where community admins
            <br />
            choose tweets for their community to raid.
          </p>
          <p>
            When launching a raid, admins can choose specific
            <br />
            actions to incentivize (retweet, reply and/or like).
          </p>
        </>
      );
    case "# get-started":
      return (
        <>
          <h1>
            <span>#</span>get-started
          </h1>
          <p>
            The <span>#get-started</span> channel is where community members
            <br />
            opt into Jackpot and review high-level information about
            <br />
            the platform.
          </p>
          <p>
            As a community member, opting in takes less than a<br />
            minute and is free, forever. To opt in, all you need to do
            <br />
            is securely link your Twitter account and optionally
            <br />
            specify your ETH wallet address if you’d like to be
            <br />
            considered in the Jackpot Raffle. We’ll never ask you to
            <br />
            sign a transaction with your wallet.
          </p>
        </>
      );
    case "# leaderboard":
      return (
        <>
          <h1>
            <span>#</span>leaderboard
          </h1>
          <p>
            The <span>#leaderboard</span> channel is where anyone in the
            <br />
            community can see those who have earned the most XP
            <br />
            all-time and since the last Jackpot Raffle.
          </p>
          <p>
            Community members can also earn badges that may or
            <br />
            may not unlock other benefits within your community.
          </p>
        </>
      );
    case "# raids":
      return (
        <>
          <h1>
            <span>#</span>raids
          </h1>
          <p>
            The <span>#raids channel</span> is where opted-in community
            <br />
            members can earn XP by engaging with raid tweets.
          </p>
          <p>
            Community admins have their own channel where they
            <br />
            can select Tweets they’d like the community to raid.
          </p>
        </>
      );
    case "# quests":
      return (
        <>
          <h1>
            <span>#</span>quests
          </h1>
          <p>
            The <span>#quests</span> channel is where opted-in community
            <br />
            members can earn XP by completing quests that have
            <br />
            been activated by admins.
          </p>
          <p>
            Quests are actions that require manual verification,
            <br />
            like creating project-inspired memes or hosting Twitter
            <br />
            Spaces. Quests are the lifeblood of Jackpot, so we
            <br />
            encourage community leaders to think long and hard
            <br />
            about the types of actions that align with their brand.
          </p>
          <p>
            To get credit for completing a quest, community
            <br />
            members must submit proof of completion (usually a<br />
            screenshot or URL).
          </p>
        </>
      );
    case "# notifs":
      return (
        <>
          <h1>
            <span>#</span>notifs
          </h1>
          <p>
            The <span>#notifs</span> channel is where opted-in community
            <br />
            members receive notifications whenever they earn XP.
          </p>
          <p>
            This is also where community members are notified
            <br />
            when their quest submission has been approved or
            <br />
            denied by admins.
          </p>
        </>
      );
    default:
      return (
        <>
          <h1>
            <span>{`//`}</span>INTEGRATION OVERVIEW
          </h1>
          <p>
            When you add the Jackpot bot to your Discord server,
            <br />
            admins will see 3 private channels.
          </p>
          <p>
            We’ve removed every ounce of fluff from the bot, leaving
            <br />
            only the essentials. Hover your cursor over each of the
            <br />
            channels to the left to explore the structure of our bot.
          </p>
        </>
      );
  }
};

export const handleMobilePublickViewValues = (values) => {
  switch (values) {
    case "# get-started":
      return (
        <>
          <p>
            The <span>#get-started</span> channel is where community members
            <br /> opt into Jackpot and review high-level information about
            <br /> the platform.
          </p>
          <p>
            As a community member, opting in takes less than a<br /> minute and
            is free, forever. To opt in, all you need to do
            <br /> is securely link your Twitter account and optionally
            <br /> specify your ETH wallet address if you’d like to be
            <br /> considered in the Jackpot Raffle. We’ll never ask you to
            <br /> sign a transaction with your wallet.
          </p>
        </>
      );
    case "# leaderboard":
      return (
        <>
          <p>
            The <span>#leaderboard</span> channel is where anyone in the
            <br /> community can see those who have earned the most XP
            <br /> all-time and since the last Jackpot Raffle.
          </p>
          <p>
            Community members can also earn badges that may or
            <br /> may not unlock other benefits within your community.
          </p>
        </>
      );
    case "# raids":
      return (
        <>
          <p>
            The <span>#raids</span> channel is where opted-in community
            <br /> members can earn XP by engaging with raid tweets.
          </p>
          <p>
            Community admins have their own channel where they
            <br /> can select Tweets they’d like the community to raid.
          </p>
        </>
      );
    case "# quests":
      return (
        <>
          <p>
            The <span>#quests</span> channel is where opted-in community
            <br /> members can earn XP by completing quests that have
            <br /> been activated by admins.
          </p>
          <p>
            Quests are actions that require manual verification,
            <br /> like creating project-inspired memes or hosting Twitter
            <br /> Spaces. Quests are the lifeblood of Jackpot, so we
            <br /> encourage community leaders to think long and hard
            <br />
            about the types of actions that align with their brand.
          </p>
          <p>
            To get credit for completing a quest, community
            <br /> members must submit proof of completion (usually a<br />
            screenshot or URL).
          </p>
        </>
      );
    case "# notifs":
      return (
        <>
          <p>
            The <span>#notifs</span> channel is where opted-in community
            <br /> members receive notifications whenever they earn XP.
          </p>
          <p>
            This is also where community members are notified <br /> when their
            quest submission has been approved or
            <br /> denied by admins.
          </p>
        </>
      );
    default:
      break;
    // return (
    //   <>
    //     <p>
    //       When you add the Jackpot bot to your Discord server,
    //       <br />
    //       your community will see 5 public channels.
    //     </p>
    //     <p>
    //       We’ve removed every ounce of fluff from the bot, leaving
    //       <br />
    //       only the essentials. Hover your cursor over each of the
    //       <br />
    //       channels to the left to explore the structure of our bot.
    //     </p>
    //   </>
    // );
  }
};

export const handleMobileAdminViewValues = (values) => {
  switch (values) {
    case "# add-quest":
      return (
        <>
          <p>
            The <span>#add-quest</span> channel is where community admins
            <br /> add, edit, and delete quest.
          </p>
          <p>
            When you first add Jackpot to your server, there are a<br /> number
            of default quest to get you started, however,
            <br /> you are also free to add your own.
          </p>
        </>
      );
    case "# quest-approval":
      return (
        <>
          <p>
            The <span>#quest-approval</span> channel is where community
            <br /> admins approve or deny quest submissions at their
            <br /> discretion.
          </p>
          <p>
            When disapproving a submission, the admin must
            <br /> provide a reason so that community members know
            <br /> what they need to correct before trying again.
          </p>
        </>
      );
    case "# launch-raid":
      return (
        <>
          <p>
            The <span>#launch-raid</span> channel is where community admins
            <br /> choose tweets for their community to raid.
          </p>
          <p>
            When launching a raid, admins can choose specific
            <br /> actions to incentivize (retweet, reply and/or like).
          </p>
        </>
      );
    case "# get-started":
      return (
        <>
          <p>
            The <span>#get-started</span> channel is where community members
            <br />
            opt into Jackpot and review high-level information about
            <br />
            the platform.
          </p>
          <p>
            As a community member, opting in takes less than a<br />
            minute and is free, forever. To opt in, all you need to do
            <br />
            is securely link your Twitter account and optionally
            <br />
            specify your ETH wallet address if you’d like to be
            <br />
            considered in the Jackpot Raffle. We’ll never ask you to
            <br />
            sign a transaction with your wallet.
          </p>
        </>
      );
    case "# leaderboard":
      return (
        <>
          <p>
            The <span>#leaderboard</span> channel is where anyone in the
            <br />
            community can see those who have earned the most XP
            <br />
            all-time and since the last Jackpot Raffle.
          </p>
          <p>
            Community members can also earn badges that may or
            <br />
            may not unlock other benefits within your community.
          </p>
        </>
      );
    case "# raids":
      return (
        <>
          <p>
            The <span>#raids channel</span> is where opted-in community
            <br />
            members can earn XP by engaging with raid tweets.
          </p>
          <p>
            Community admins have their own channel where they
            <br />
            can select Tweets they’d like the community to raid.
          </p>
        </>
      );
    case "# quests":
      return (
        <>
          <p>
            The <span>#quests</span> channel is where opted-in community
            <br />
            members can earn XP by completing quests that have
            <br />
            been activated by admins.
          </p>
          <p>
            Quests are actions that require manual verification,
            <br />
            like creating project-inspired memes or hosting Twitter
            <br />
            Spaces. Quests are the lifeblood of Jackpot, so we
            <br />
            encourage community leaders to think long and hard
            <br />
            about the types of actions that align with their brand.
          </p>
          <p>
            To get credit for completing a quest, community
            <br />
            members must submit proof of completion (usually a<br />
            screenshot or URL).
          </p>
        </>
      );
    case "# notifs":
      return (
        <>
          <p>
            The <span>#notifs</span> channel is where opted-in community
            <br />
            members receive notifications whenever they earn XP.
          </p>
          <p>
            This is also where community members are notified
            <br />
            when their quest submission has been approved or
            <br />
            denied by admins.
          </p>
        </>
      );
    default:
      break;
    // return (
    //   <>
    //     <p>
    //       When you add the Jackpot bot to your Discord server,
    //       <br />
    //       admins will see 3 private channels.
    //     </p>
    //     <p>
    //       We’ve removed every ounce of fluff from the bot, leaving
    //       <br />
    //       only the essentials. Hover your cursor over each of the
    //       <br />
    //       channels to the left to explore the structure of our bot.
    //     </p>
    //   </>
    // );
  }
};
