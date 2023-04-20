import Uparrow from "../src/assets/images/up.png";
import Downarrow from "../src/assets/images/down.png";

export const symbolSplit = (key, symbol = "#") => key.split(symbol);

export const addingArrow = (status) => {
  switch (status) {
    case "1":
      return <img src={Uparrow} alt="uparrow" />;
    case "-1":
      return <img src={Downarrow} alt="downarrow" />;
    default:
      return "";
  }
};

export const addingLeaderBoardArrow = (status) => {
  switch (status) {
    case true:
      return <img src={Uparrow} alt="uparrow" />;
    case false:
      return <img src={Downarrow} alt="downarrow" />;
    default:
      return "";
  }
};

export const removeDecimal = (value) => {
  if (value) {
    return Math.floor(value);
  }
};

export const idSplit = (value) => {
  if (value) {
    const newValue = value.split("#").map((item) => item);
    return (
      <>
        {newValue[0]}
        <span>{`#${newValue[1]}`}</span>
      </>
    );
  }
};

export const dynamicContent = (content) => {
  if (content) {
    const numberMatch = content.match(/\d+/);
    const splitValues = content.split(`${numberMatch} Seats`);
    let number;
    if (numberMatch) {
      number = numberMatch[0];
    }
    return (
      <p>
        {splitValues[0]}
        <span>{`${number} seats`}</span>
        {splitValues[1]}
      </p>
    );
  }
};

export const hasLowerCase = (str) => {
  return /[a-z]/.test(str);
};

export const hasUpperCase = (str) => {
  return /[A-Z]/.test(str);
};
export const errorMsg = (e, errorMsg) => {
  const field = document.getElementById(e.target.id);
  const message = field.validity;
  if (message.valueMissing === true || message.typeMismatch === true) {
    field.setCustomValidity(errorMsg);
  } else {
    field.setCustomValidity("");
  }
};

export const isEmail = (email) =>
  /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email);

export const isPassword = (regEx) =>
  /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/.test(regEx);

export const capitalizeFirstLetter = (value) => {
  return value.charAt(0).toUpperCase() + value.slice(1);
};

export const formValidations = (value, name, ref, apiCallError) => {
  if (name.includes("email") && !isEmail(value["email"])) {
    ref.current["email"].focus();
  } else if (name.includes("user_name") && value["user_name"] === "") {
    ref.current["user_name"].focus();
  } else if (
    (name.includes("password") && value["password"] === "") ||
    value["password"]?.length <= 7 ||
    (value["password"] && !isPassword(value["password"]))
  ) {
    ref.current["password"].focus();
  } else if (name.includes("oldPassword") && value["oldPassword"] === "") {
    ref.current["oldPassword"].focus();
  } else if (name.includes("newPassword") && value["newPassword"] === "") {
    ref.current["newPassword"].focus();
  } else if (
    (name.includes("confirmPassword") && value["confirmPassword"] === "") ||
    value["confirmPassword"] !== value["newPassword"]
  ) {
    ref.current["confirmPassword"].focus();
  } else if (name.includes("card_number") && value["card_number"] === "") {
    ref.current["card_number"].focus();
  } else if (name.includes("expiry_date") && value["expiry_date"] === "") {
    ref.current["expiry_date"].focus();
  } else if (name.includes("cvc") && value["cvc"] === "") {
    ref.current["cvc"].focus();
  } else if (
    name.includes("cardholder_name") &&
    value["cardholder_name"] === ""
  ) {
    ref.current["cardholder_name"].focus();
  } else if (name.includes("line1") && value["line1"] === "") {
    ref.current["line1"].focus();
  } else if (name.includes("city") && value["city"] === "") {
    ref.current["city"].focus();
  } else if (name.includes("state") && value["state"] === "") {
    ref.current["state"].focus();
  } else if (name.includes("zipcode") && value["zipcode"] === "") {
    ref.current["zipcode"].focus();
  } else if (name.includes("time") && value["time"] === "") {
    ref.current["time"].focus();
  } else if (
    (name.includes("total_amount") && value["total_amount"] === "") ||
    value["total_amount"] <= 0 ||
    isNaN(value["total_amount"])
  ) {
    ref.current["total_amount"].focus();
  } else if (
    (name.includes("no_of_winners") && value["no_of_winners"] === "") ||
    value["no_of_winners"] <= 0 ||
    isNaN(value["no_of_winners"])
  ) {
    ref.current["no_of_winners"].focus();
  } else if (
    (name.includes("grand_prize") && value["grand_prize"] === "") ||
    value["grand_prize"] <= 0 ||
    isNaN(value["grand_prize"])
  ) {
    ref.current["grand_prize"].focus();
  } else if (
    (name.includes("runner_up_price") && value["runner_up_price"] === "") ||
    value["runner_up_price"] <= 0 ||
    isNaN(value["no_of_winners"])
  ) {
    ref.current["runner_up_price"].focus();
  } else if (name.includes("name") && value["name"] === "") {
    ref.current["name"].focus();
  } else if (name.includes("communityName") && value["communityName"] === "") {
    ref.current["communityName"].focus();
  } else if (name.includes("referralCode") && apiCallError) {
    ref.current["referralCode"].focus();
  } else if (name.includes("start_time") && value["start_time"] === "") {
    ref.current["start_time"].focus();
  } else if (
    (name.includes("next_give_away") && value["next_give_away"] === "") ||
    value["next_give_away"] <= 0 ||
    isNaN(value["next_give_away"])
  ) {
    ref.current["next_give_away"].focus();
  } else if (
    (name.includes("next_give_away_amount") &&
      value["next_give_away_amount"] === "") ||
    value["next_give_away_amount"] <= 0 ||
    isNaN(value["next_give_away_amount"])
  ) {
    ref.current["next_give_away_amount"].focus();
  }
};
