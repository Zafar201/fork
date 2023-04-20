import React, { useState, useRef, useEffect, useContext } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  Card,
  InputLabel,
  TextField,
  LinearProgress,
  IconButton,
  MenuItem,
  Divider,
} from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";

import TabsComponent from "../../Components/TabsComponent";
import WarningDiv from "../../Components/WarningDiv";
import BackArrow from "../../assets/images/back-w.svg";
import ModalComponent from "../../Components/Modal";
// import Cropper from "react-easy-crop";
// import getCroppedImg from "./cropImage";
import {
  formValidations,
  dynamicContent,
  removeDecimal,
  isPassword,
} from "../../Action";
import MyAccountSelectBox from "../../Components/MyAccountSelectBox";
import Avatar from "../../assets/images/avatar.png";
import ShowPass from "../../assets/images/passHide.svg";
import HidePass from "../../assets/images/passShow.svg";
import "./myaccount.css";
import {
  accountInformationGetApiCall,
  accountSetupAPiCall,
  selectedChoosePlanAPiCall,
  accountDeleteApiCall,
  cancelDeleteAccountApiCall,
} from "../../ApiCalls";
import AuthContext from "../../Components/Store/Auth-context";
import LoadingOverlay from "../../Components/LoadingOverlay";
import LoadingSpinner from "../../Components/Loading/LoadingSpinner";

function MyAccount() {
  const { userData, triggerUseEffect, updateToken, navigateServerErrorPage } =
    useContext(AuthContext);
  // const [image, setImage] = useState(null);
  // const [croppedArea, setCroppedArea] = useState(null);
  // const [crop, setCrop] = useState({ x: 0, y: 0 });
  // const [zoom, setZoom] = useState(1);
  // const [croppedImage, setCroppedImage] = useState(null);

  // const fileRef = useRef();

  // const showCroppedImage = useCallback(async () => {
  //   try {
  //     const croppedImage = await getCroppedImg(image, croppedArea);
  //     console.log("donee", { croppedImage });
  //     setCroppedImage(croppedImage);
  //     setImage(null);
  //   } catch (e) {
  //     console.error(e);
  //   }
  // }, [croppedArea]);

  // const triggerFileSelectPopup = () => fileRef.current.click();

  // const onCropComplete = (croppedAreaPercentage, croppedAreaPixels) => {
  //   setCroppedArea(croppedAreaPixels);
  // };

  // const onSelectFile = (event) => {
  //   if (event.target.files && event.target.files.length > 0) {
  //     const reader = new FileReader();
  //     reader.readAsDataURL(event.target.files[0]);
  //     reader.addEventListener("load", () => {
  //       setImage(reader.result);
  //     });
  //   }
  // }

  const [tabValue, setTabValue] = useState(0);
  const [passwordView, setPasswordView] = useState(false);
  const [selectScreen, setSelectScreen] = useState("");
  const [userDetails, setUserDetails] = useState({});
  const [editedData, setEditedData] = useState({});
  const [addBillingAddress, setAddBillingAddress] = useState(false);
  const [keyPress, setKeyPress] = useState(false);
  const [accountDeletingModal, setAccountDeletingModal] = useState(false);
  const [showAddNewCardModal, setShowAddNewCardModal] = useState(false);
  const [viewEmailFields, setViewEmailFields] = useState(false);
  const [viewPasswordFields, setViewPasswordFields] = useState(false);
  const [slectedPlanDatas, setSelectedPlanDatas] = useState({});
  const [accountDelete, setAccountDelete] = useState();
  const [searchParams, setSearchParams] = useSearchParams();
  const [saveLoading, setSaveLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isFieldDisabled, setIsFieldDisabled] = useState({
    name: true,
    password: true,
    email: true,
    communityName: true,
    twitterUrl: true,
  });
  const [accountInputValues, setAccountInputValues] = useState({
    name: "",
    password: "",
    email: "",
    new_email: "",
    confirm_email: "",
    new_password: "",
    confirm_password: "",
    communityName: "Crypt",
    twitterUrl:
      "https://twitter.com/elonmusk?ref_src=twsrc%5Egoogle%7Ctwcamp%5Eserp%7Ctwgr%5Eauthor",
  });
  const [newCardInputValues, setNewCardInputValues] = useState({
    card_number: "",
    expiry_date: "",
    cvc: "",
    cardholder_name: "",
  });
  const [fieldErrors, setFieldErrors] = useState({
    name: "",
    password: "",
    email: "",
    confirm_email: "",
    confirm_password: "",
    card_number: "",
    expiry_date: "",
    communityName: "",
    twitterUrl: "",
  });
  const [addressInputvalues, setAddressInputValues] = useState({
    line1: "",
    line2: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
  });

  const navigate = useNavigate();
  const inputRef = useRef({});
  const matches = useMediaQuery("(min-width:768px)");
  const searchParamsPage = searchParams.get("tab");

  const userToken = localStorage.getItem("userAccess");
  const header = {
    headers: {
      Authorization: `Bearer ${userToken}`,
      "Content-Type": "multipart/form-data",
    },
  };
  const controller = new AbortController();
  const config = {
    signal: controller.signal,
  };

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleInputChange = (e) => {
    setFieldErrors({
      name: "",
      password: "",
      email: "",
      confirm_email: "",
      confirm_password: "",
      card_number: "",
      expiry_date: "",
      communityName: "",
      twitterUrl: "",
    });
    setAccountInputValues((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleNewCardInputChange = (e) => {
    setNewCardInputValues((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const newCardFormvalidation = () => {
    formValidations(
      newCardInputValues,
      ["card_number", "expiry_date", "cvc", "cardholder_name"],
      inputRef
    );
  };

  const loaderSetup = (value) => {
    if (matches) {
      setLoading(value);
    }
  };

  useEffect(() => {
    // if (matches) {
    setLoading(true);
    // }
    accountInformationGetApiCall(
      userData.id,
      (res) => {
        setUserDetails(res.data);
        setLoading(false);
      },
      (err) => {
        navigateServerErrorPage(err?.response?.status);
        setLoading(false);
      },
      config
    );
    return () => {
      controller.abort();
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editedData]);

  const handleNewCardAddition = (e) => {
    e.preventDefault();
    const { card_number, expiry_date, cvc, cardholder_name } =
      newCardInputValues;
    if (card_number && expiry_date && cvc && cardholder_name) {
      setAddBillingAddress(true);
      // setNewCardInputValues({
      //   card_number: "",
      //   expiry_date: "",
      //   cvc: "",
      //   cardholder_name: "",
      // });
    } else {
      newCardFormvalidation();
    }
  };

  // const handleFieldDisable = (e) => {
  //   e.preventDefault();
  //   const { name } = e.target;
  //   if (name.includes("name") && accountInputValues["name"] === "") {
  //     inputRef.current.name.focus();
  //   } else if (
  //     name.includes("communityName") &&
  //     accountInputValues["communityName"] === ""
  //   ) {
  //     inputRef.current.communityName.focus();
  //   } else {
  //     setIsFieldDisabled((prevState) => ({
  //       ...prevState,
  //       [name]: !prevState[name],
  //     }));
  //   }
  // };

  const handleSaveUserName = (e) => {
    e.preventDefault();
    if (isFieldDisabled.name) {
      setIsFieldDisabled((prevState) => ({
        ...prevState,
        name: !prevState["name"],
      }));
    } else {
      const data = {
        id: userData.id,
        username: accountInputValues.name.trim(),
      };
      if (accountInputValues["name"] === "") {
        inputRef.current.name.focus();
      } else if (accountInputValues["communityName"] === "") {
        inputRef.current.communityName.focus();
      } else {
        setLoading(true);
        accountSetupAPiCall(
          userData.id,
          data,
          (res) => {
            setEditedData(res.data);
            setIsFieldDisabled((prevState) => ({
              ...prevState,
              name: !prevState["name"],
            }));
          },
          (err) => {
            navigateServerErrorPage(err?.response?.status);
            inputRef.current.name.focus();
            setFieldErrors((prevState) => ({
              ...prevState,
              name: err.response.data?.username,
            }));
            setLoading(false);
          }
        );
      }
    }
  };

  const displayConfirmFields = (e) => {
    setAccountInputValues((prevState) => ({
      ...prevState,
      new_email: "",
      confirm_email: "",
      new_password: "",
      confirm_password: "",
    }));
    if (!keyPress) {
      e.preventDefault();
      const { name } = e.target;
      setIsFieldDisabled((prevState) => ({
        ...prevState,
        [name]: false,
      }));
    }
    setKeyPress(false);
  };

  const hideConfirmFields = (e) => {
    const { name } = e.target;

    setIsFieldDisabled((prevState) => ({
      ...prevState,
      [name]: true,
    }));
  };

  const isEmail = (email) =>
    /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email);

  const validateFields = (value1, value2) => value1 === value2;

  const focusEmailFields = (value1, value2) => {
    if (!isEmail(value1)) {
      inputRef.current.new_email.focus();
    } else if (value1 !== value2 || !isEmail(value2)) {
      inputRef.current.confirm_email.focus();
    }
  };

  const handleSaveEmail = (e) => {
    e.preventDefault();
    const { new_email, confirm_email } = accountInputValues;

    const emailError = validateFields(new_email, confirm_email)
      ? ""
      : "Emails do not match.";

    if (emailError || !isEmail(new_email) || !isEmail(confirm_email)) {
      focusEmailFields(new_email, confirm_email);
      setFieldErrors((prevState) => ({
        ...prevState,
        confirm_email: emailError,
      }));
    } else {
      loaderSetup(true);
      setSaveLoading(true);
      const data = {
        id: userData.id,
        email: accountInputValues.confirm_email.trim(),
      };
      accountSetupAPiCall(
        userData.id,
        data,
        (res) => {
          hideConfirmFields(e);
          setEditedData(res.data);
          setSaveLoading(false);
          setAccountInputValues({
            ...accountInputValues,
            email: new_email,
            new_email: "",
            confirm_email: "",
          });
        },
        (err) => {
          navigateServerErrorPage(err?.response?.status);
          setFieldErrors((prevState) => ({
            ...prevState,
            confirm_email: err.response.data?.email,
          }));
          loaderSetup(false);
          setSaveLoading(false);
        }
      );
    }
  };

  useEffect(() => {
    if (searchParamsPage === "billing-subscribtion") {
      matches ? setTabValue(1) : setSelectScreen("Billing & Subscription");
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParamsPage]);

  const handleFixIssue = () => {
    if (matches) {
      setTabValue(1);
    } else if (!matches) {
      navigate("/my-account?tab=billing-subscribtion", { replace: true });
      setSelectScreen("Billing & Subscription");
    }
  };

  useEffect(() => {
    if (tabValue === 0) {
      navigate("/my-account?tab=account-setting", { replace: true });
    } else if (tabValue === 1) {
      navigate("/my-account?tab=billing-subscribtion", { replace: true });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tabValue]);

  useEffect(() => {
    const { new_email, confirm_email } = accountInputValues;
    if (new_email === confirm_email)
      setFieldErrors((prevState) => ({
        ...prevState,
        confirm_email: "",
      }));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accountInputValues.new_email, accountInputValues.confirm_email]);

  // const handleTwitterUrl = (e) => {
  //   e.preventDefault();
  //   const { name } = e.target;
  //   const { twitterUrl } = accountInputValues;
  //   setIsFieldDisabled((prevState) => ({
  //     ...prevState,
  //     [name]: !prevState[name],
  //   }));
  //   const regex = new RegExp(
  //     "(https://twitter.com/(?![a-zA-Z0-9_]+/)([a-zA-Z0-9_]+))"
  //   );
  //   if (twitterUrl.match(regex)) {
  //     setFieldErrors((prevState) => ({
  //       ...prevState,
  //       twitterUrl: "",
  //     }));
  //   } else {
  //     inputRef.current.twitterUrl.focus();
  //     setFieldErrors((prevState) => ({
  //       ...prevState,
  //       twitterUrl: "Must be a Twitter URL.",
  //     }));
  //     setIsFieldDisabled((prevState) => ({
  //       ...prevState,
  //       [name]: false,
  //     }));
  //   }
  // };

  useEffect(() => {
    const { twitterUrl } = accountInputValues;
    const regex = new RegExp(
      "(https://twitter.com/(?![a-zA-Z0-9_]+/)([a-zA-Z0-9_]+))"
    );
    if (twitterUrl.match(regex)) {
      setFieldErrors((prevState) => ({
        ...prevState,
        twitterUrl: "",
      }));
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accountInputValues.twitterUrl]);

  const focusPasswordFields = (value1, value2) => {
    if (value1 === "" || value1.length <= 7 || !isPassword(value1)) {
      inputRef.current.new_password.focus();
    } else if (value1 !== value2 || value2 === "") {
      inputRef.current.confirm_password.focus();
    }
  };

  const handleSavePassword = (e) => {
    e.preventDefault();
    const { new_password, confirm_password } = accountInputValues;

    const passwordError = validateFields(new_password, confirm_password)
      ? ""
      : "Passwords do not match.";

    if (passwordError || new_password === "" || confirm_password === "") {
      focusPasswordFields(new_password, confirm_password);
      setFieldErrors((prevState) => ({
        ...prevState,
        confirm_password: passwordError,
      }));
    } else if (accountInputValues.new_password.length <= 7) {
      focusPasswordFields(new_password, confirm_password);
      setFieldErrors((prevState) => ({
        ...prevState,
        confirm_password: "Enter minimum 8 character.",
      }));
    } else if (!isPassword(accountInputValues.new_password)) {
      focusPasswordFields(new_password, confirm_password);
      setFieldErrors((prevState) => ({
        ...prevState,
        confirm_password:
          "Enter alpha numeric value and one special character.",
      }));
    } else {
      loaderSetup(true);
      setSaveLoading(true);
      const data = {
        id: userData.id,
        password: accountInputValues.confirm_password,
      };
      accountSetupAPiCall(
        userData.id,
        data,
        (res) => {
          hideConfirmFields(e);
          setEditedData(res.data);
          setSaveLoading(false);
          setAccountInputValues({
            ...accountInputValues,
            password: confirm_password,
            new_password: "",
            confirm_password: "",
          });
        },
        (err) => {
          navigateServerErrorPage(err?.response?.status);
          setFieldErrors((prevState) => ({
            ...prevState,
            confirm_password: err.response.data.password,
          }));
          loaderSetup(false);
          setSaveLoading(false);
        }
      );
    }
  };

  useEffect(() => {
    const { new_password, confirm_password } = accountInputValues;
    if (new_password === confirm_password)
      setFieldErrors((prevState) => ({
        ...prevState,
        confirm_password: "",
      }));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accountInputValues.new_password, accountInputValues.confirm_password]);

  const handleAddressInputValueChange = (e) => {
    setAddressInputValues({
      ...addressInputvalues,
      [e.target.name]: e.target.value,
    });
  };

  const billingAddressFormValidation = () => {
    formValidations(
      addressInputvalues,
      ["line1", "city", "state", "zipcode", "country"],
      inputRef
    );
  };

  const handleBillingAddressSubmit = (e) => {
    e.preventDefault();
    const { line1, city, state, zipcode, country } = addressInputvalues;
    if (line1 && city && state && zipcode && country) {
      setShowAddNewCardModal(false);
      // setAddressInputValues({
      //   line1: "",
      //   line2: "",
      //   city: "",
      //   state: "",
      //   zipcode: "",
      //   country: "",
      // });
      setAddBillingAddress(false);
    } else {
      billingAddressFormValidation();
    }
  };

  const handleNavigateChangePlan = () => {
    navigate("/change-plan");
  };

  const handlePreviousPage = () => {
    if (viewEmailFields) {
      setIsFieldDisabled((prevState) => ({
        ...prevState,
        email: true,
      }));
    } else if (viewPasswordFields) {
      setIsFieldDisabled((prevState) => ({
        ...prevState,
        password: true,
      }));
    }
  };

  useEffect(() => {
    if (triggerUseEffect === null) {
      setLoading(true);
    }
    selectedChoosePlanAPiCall(
      header,
      (res) => {
        setSelectedPlanDatas(res.data);
        setLoading(false);
      },
      (err) => {
        navigateServerErrorPage(err?.response?.status);
        setLoading(false);
        if (err.response.status === 401) updateToken();
      }
    );
    return () => {
      controller.abort();
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accountDelete, triggerUseEffect]);

  const handleDeleteAccount = () => {
    setLoading(true);
    accountDeleteApiCall(
      header,
      (res) => {
        setAccountDelete(res);
      },
      (err) => {
        navigateServerErrorPage(err?.response?.status);
      }
    );
  };

  const cancelAccountDeletion = () => {
    setLoading(true);
    const data = { user: userData.id };
    cancelDeleteAccountApiCall(
      data,
      (res) => {
        setAccountDelete(res);
      },
      (err) => {
        navigateServerErrorPage(err?.response?.status);
      }
    );
  };

  const accountSuspended =
    slectedPlanDatas?.plan_expity_notificaion?.nav_message?.includes(
      "Account Suspended"
    );

  const cryptoPayment = () => {
    if (accountSuspended) {
      navigate("/change-plan");
    } else {
      navigate("/change-payment-method");
      localStorage.setItem("payment", true);
    }
  };

  const replaceDesktopWarning = (content) => {
    return content
      .replace("Billing Alert : ", "")
      .replace(
        "unless you manually pay with crypto or add a card to your account",
        ""
      );
  };

  const handleAccountDeletion = () => {
    setAccountDeletingModal(true);
  };

  const handleConfirmDeletion = () => {
    handleDeleteAccount();
    setAccountDeletingModal(false);
  };

  useEffect(() => {
    if (!isFieldDisabled.email) {
      setViewEmailFields(true);
    } else if (!isFieldDisabled.password) {
      setViewPasswordFields(true);
    } else if (viewEmailFields) {
      setViewEmailFields(false);
    } else if (viewPasswordFields) {
      setViewPasswordFields(false);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFieldDisabled.email, isFieldDisabled.password]);

  const inputViews =
    (!matches && !isFieldDisabled["email"]) ||
    (!matches && !isFieldDisabled["password"]);

  const accountSettings = (
    <Card>
      {matches ? (
        <form>
          {isFieldDisabled["email"] ? (
            <div className="emailId">
              <InputLabel>Email Address:</InputLabel>
              <TextField
                name="email"
                type="email"
                onChange={handleInputChange}
                value={userDetails.email}
                inputRef={(ref) => (inputRef.current.email = ref)}
                disabled={true}
              />
              {fieldErrors["email"] && <span>{fieldErrors["email"]}</span>}
              <button
                color="inherit"
                className="editBtn"
                name="email"
                onClick={displayConfirmFields}
                type="button"
                onKeyDown={() => setKeyPress(true)}
              >
                Change
              </button>
            </div>
          ) : (
            <div
              className={
                fieldErrors["confirm_email"]
                  ? "confrimEmail invalid"
                  : "confrimEmail"
              }
            >
              <InputLabel>Email Address:</InputLabel>
              <TextField
                name="new_email"
                type="email"
                onChange={handleInputChange}
                placeholder="New Email"
                value={accountInputValues.new_email}
                inputRef={(ref) => (inputRef.current.new_email = ref)}
              />
              <div>
                <TextField
                  name="confirm_email"
                  type="email"
                  onChange={handleInputChange}
                  placeholder="Confirm Email"
                  value={accountInputValues.confirm_email}
                  inputRef={(ref) => (inputRef.current.confirm_email = ref)}
                />
                {fieldErrors["confirm_email"] && (
                  <span className="myAccError">
                    {fieldErrors["confirm_email"]}
                  </span>
                )}
              </div>
              <button
                color="inherit"
                className="saveBtn"
                name="email"
                onClick={handleSaveEmail}
                disabled={saveLoading}
              >
                Save
              </button>
            </div>
          )}
          {isFieldDisabled["password"] ? (
            <div className="passwordEnter">
              <InputLabel>Password:</InputLabel>
              <TextField
                name="password"
                type="password"
                onChange={handleInputChange}
                value={userDetails?.password?.slice(0, 10)}
                inputRef={(ref) => (inputRef.current.password = ref)}
                disabled={true}
              />
              <button
                color="inherit"
                className="editBtn"
                name="password"
                onClick={displayConfirmFields}
                type="button"
              >
                Change
              </button>
            </div>
          ) : (
            <div
              className={
                fieldErrors["confirm_password"]
                  ? "confrimPass invalid"
                  : "confrimPass"
              }
            >
              <InputLabel>Password:</InputLabel>
              <TextField
                name="new_password"
                type={passwordView ? "text" : "password"}
                onChange={handleInputChange}
                placeholder="New Password"
                value={accountInputValues.new_password}
                inputRef={(ref) => (inputRef.current.new_password = ref)}
              />
              <div>
                <TextField
                  name="confirm_password"
                  type={passwordView ? "text" : "password"}
                  onChange={handleInputChange}
                  placeholder="Confirm Password"
                  value={accountInputValues.confirm_password}
                  inputRef={(ref) => (inputRef.current.confirm_password = ref)}
                  InputProps={{
                    endAdornment: (
                      <IconButton
                        onClick={() => setPasswordView(!passwordView)}
                      >
                        {passwordView ? (
                          <img src={HidePass} alt="hidePass" />
                        ) : (
                          <img src={ShowPass} alt="showPass" />
                        )}
                      </IconButton>
                    ),
                  }}
                />
                {fieldErrors["confirm_password"] && (
                  <span className="myAccError">
                    {fieldErrors["confirm_password"]}
                  </span>
                )}
              </div>
              <button
                color="inherit"
                className="saveBtn"
                name="password"
                onClick={handleSavePassword}
                disabled={saveLoading}
              >
                Save
              </button>
            </div>
          )}
        </form>
      ) : (
        <form>
          {!viewEmailFields && !viewPasswordFields && (
            <div className="nameField">
              <InputLabel>Name / Pseudonym:</InputLabel>
              <TextField
                name="name"
                type="text"
                onChange={handleInputChange}
                value={
                  isFieldDisabled.name
                    ? userDetails.username
                    : accountInputValues.name
                }
                inputRef={(ref) => (inputRef.current.name = ref)}
                disabled={isFieldDisabled["name"]}
              />
              {fieldErrors["name"] && (
                <span className="myAccError">{fieldErrors["name"]}</span>
              )}
              <button
                color="inherit"
                className="editBtn"
                name="name"
                onClick={handleSaveUserName}
                disabled={loading}
              >
                {isFieldDisabled.name ? "Edit" : "Save"}
              </button>
            </div>
          )}
          {isFieldDisabled["email"] ? (
            <>
              {!viewPasswordFields && (
                <div className="emailId">
                  <InputLabel>Email Address:</InputLabel>
                  <TextField
                    name="email"
                    type="email"
                    onChange={handleInputChange}
                    value={userDetails.email}
                    inputRef={(ref) => (inputRef.current.email = ref)}
                    disabled={true}
                  />
                  {fieldErrors["email"] && (
                    <span className="myAccError">{fieldErrors["email"]}</span>
                  )}
                  <button
                    color="inherit"
                    className="editBtn"
                    name="email"
                    onClick={displayConfirmFields}
                    type="button"
                  >
                    Change
                  </button>
                </div>
              )}
            </>
          ) : (
            <>
              {viewEmailFields && (
                <div
                  className={
                    fieldErrors["confirm_email"]
                      ? "confrimEmail invalid"
                      : "confrimEmail"
                  }
                >
                  <InputLabel>Change Email Address:</InputLabel>
                  <TextField
                    name="new_email"
                    type="email"
                    onChange={handleInputChange}
                    placeholder="New Email"
                    value={accountInputValues.new_email}
                    inputRef={(ref) => (inputRef.current.new_email = ref)}
                  />
                  <div>
                    <TextField
                      name="confirm_email"
                      type="email"
                      onChange={handleInputChange}
                      placeholder="Confirm Email"
                      value={accountInputValues.confirm_email}
                      inputRef={(ref) => (inputRef.current.confirm_email = ref)}
                    />
                    {fieldErrors["confirm_email"] && (
                      <span className="myAccError">
                        {fieldErrors["confirm_email"]}
                      </span>
                    )}
                  </div>
                  <button
                    color="inherit"
                    className="saveBtn"
                    name="email"
                    onClick={handleSaveEmail}
                    disabled={saveLoading}
                  >
                    {saveLoading ? <LoadingSpinner /> : "Save"}
                  </button>
                </div>
              )}
            </>
          )}
          {isFieldDisabled["password"] ? (
            <>
              {!viewEmailFields && (
                <div className="passwordEnter">
                  <InputLabel>Password:</InputLabel>
                  <TextField
                    name="password"
                    type="password"
                    onChange={handleInputChange}
                    value={userDetails?.password?.slice(0, 10)}
                    inputRef={(ref) => (inputRef.current.password = ref)}
                    disabled={true}
                  />
                  <button
                    color="inherit"
                    className="editBtn"
                    name="password"
                    onClick={displayConfirmFields}
                    type="button"
                  >
                    Change
                  </button>
                </div>
              )}
            </>
          ) : (
            <>
              {viewPasswordFields && (
                <div
                  className={
                    fieldErrors["confirm_password"]
                      ? "confrimPass invalid"
                      : "confrimPass"
                  }
                >
                  <InputLabel>Change Password:</InputLabel>
                  <TextField
                    name="new_password"
                    type={passwordView ? "text" : "password"}
                    onChange={handleInputChange}
                    placeholder="New Password"
                    value={accountInputValues.new_password}
                    inputRef={(ref) => (inputRef.current.new_password = ref)}
                  />
                  <div>
                    <TextField
                      name="confirm_password"
                      type={passwordView ? "text" : "password"}
                      onChange={handleInputChange}
                      placeholder="Confirm Password"
                      value={accountInputValues.confirm_password}
                      inputRef={(ref) =>
                        (inputRef.current.confirm_password = ref)
                      }
                      InputProps={{
                        endAdornment: (
                          <IconButton
                            onClick={() => setPasswordView(!passwordView)}
                          >
                            {passwordView ? (
                              <img src={HidePass} alt="hidePass" />
                            ) : (
                              <img src={ShowPass} alt="showPass" />
                            )}
                          </IconButton>
                        ),
                      }}
                    />
                    {fieldErrors["confirm_password"] && (
                      <span className="myAccError">
                        {fieldErrors["confirm_password"]}
                      </span>
                    )}
                  </div>
                  <button
                    color="inherit"
                    className="saveBtn"
                    name="password"
                    onClick={handleSavePassword}
                    disabled={saveLoading}
                  >
                    {saveLoading ? <LoadingSpinner /> : "Save"}
                  </button>
                </div>
              )}
            </>
          )}
        </form>
      )}
    </Card>
  );

  // const communityProfile = (
  //   <Card sx={{ width: "500px", textAlign: "center" }}>
  //     <form>
  //       <div>
  //         <InputLabel>Community Profile Picture:</InputLabel>
  //         <img
  //           style={{ width: "60px", height: "60px" }}
  //           src={
  //             croppedImage
  //               ? croppedImage
  //               : "https://www.w3schools.com/howto/img_avatar.png"
  //           }
  //           alt=""
  //         />
  //         <input
  //           type="file"
  //           accept="image/*"
  //           ref={fileRef}
  //           onChange={onSelectFile}
  //           style={{ display: "none" }}
  //         />
  //         {image ? (
  //           <>
  //             <div className="cropper">
  //               <Cropper
  //                 image={image}
  //                 crop={crop}
  //                 zoom={zoom}
  //                 aspect={1}
  //                 onCropChange={setCrop}
  //                 onZoomChange={setZoom}
  //                 onCropComplete={onCropComplete}
  //                 objectFit="horizontal-cover"
  //               />
  //             </div>

  //             <div className="slider">
  //               <Slider
  //                 min={1}
  //                 max={3}
  //                 step={0.1}
  //                 value={zoom}
  //                 onChange={(e, zoom) => setZoom(zoom)}
  //               />
  //             </div>
  //             <Button onClick={showCroppedImage}>choose</Button>
  //             <Button onClick={() => setImage(null)}>Close</Button>
  //           </>
  //         ) : null}
  //       </div>

  //       <div className="container-buttons">
  //         <input
  //           type="file"
  //           accept="image/*"
  //           ref={fileRef}
  //           onChange={onSelectFile}
  //           style={{ display: "none" }}
  //         />
  //         <Button
  //           variant="contained"
  //           color="primary"
  //           onClick={triggerFileSelectPopup}
  //           style={{ marginRight: "10px" }}
  //         >
  //           upload
  //         </Button>
  //       </div>
  //       <div>
  //         <InputLabel>Community Name:</InputLabel>
  //         <TextField
  //           name="communityName"
  //           type="text"
  //           onChange={handleInputChange}
  //           value={accountInputValues.communityName}
  //           inputRef={(ref) => (inputRef.current.communityName = ref)}
  //           disabled={isFieldDisabled["communityName"]}
  //         />
  //         {fieldErrors["communityName"] && (
  //           <span>{fieldErrors["communityName"]}</span>
  //         )}
  //         <button
  //           color="inherit"
  //           className="whiteBtn"
  //           name="communityName"
  //           onClick={handleFieldDisable}
  //         >
  //           {isFieldDisabled.communityName ? "Edit" : "Save"}
  //         </button>
  //       </div>

  //       <div>
  //         <InputLabel>Community Twitter URL:</InputLabel>
  //         <TextField
  //           name="twitterUrl"
  //           type="text"
  //           onChange={handleInputChange}
  //           value={accountInputValues.twitterUrl}
  //           inputRef={(ref) => (inputRef.current.twitterUrl = ref)}
  //           disabled={isFieldDisabled["twitterUrl"]}
  //         />
  //         {fieldErrors["twitterUrl"] && (
  //           <span>{fieldErrors["twitterUrl"]}</span>
  //         )}
  //         <button
  //           color="inherit"
  //           className="whiteBtn"
  //           name="twitterUrl"
  //           onClick={handleTwitterUrl}
  //         >
  //           {isFieldDisabled.twitterUrl ? "Edit" : "Save"}
  //         </button>
  //       </div>

  //       <br />

  //       <br />
  //     </form>
  //   </Card>
  // );
  const showDeleteButton =
    slectedPlanDatas?.plan_expity_notificaion?.warning_message1?.includes(
      "Deletion"
    );

  const showRenewalMessage =
    slectedPlanDatas?.plan_expity_notificaion?.warning_message1?.includes(
      "Renewal"
    );

  const billingAndSubscription = (
    <Card>
      {slectedPlanDatas?.plan_expity_notificaion?.warning_message1 &&
        slectedPlanDatas?.plan_expity_notificaion?.warning_message3 && (
          <WarningDiv
            header={
              !accountSuspended
                ? slectedPlanDatas?.plan_expity_notificaion?.warning_message1
                : slectedPlanDatas?.plan_expity_notificaion?.nav_message
            }
            description={
              <>
                {!accountSuspended ? (
                  <p>
                    {
                      slectedPlanDatas?.plan_expity_notificaion
                        ?.warning_message3
                    }
                  </p>
                ) : (
                  <p>
                    {
                      slectedPlanDatas?.plan_expity_notificaion
                        ?.warning_message3
                    }
                    <br />
                    <br />
                    {
                      slectedPlanDatas?.plan_expity_notificaion
                        ?.warning_message1
                    }
                  </p>
                )}
              </>
            }
            cancelAccountDeletion={cancelAccountDeletion}
          />
        )}
      {!accountSuspended &&
        slectedPlanDatas?.price_plan_details &&
        slectedPlanDatas?.price_plan_details && (
          <div className="subscribtion">
            <h3>Subscription Plan</h3>
            <div className="planSelected">
              <h4>{slectedPlanDatas?.price_plan_details?.pricing?.name}</h4>
              <h5>{`$ ${removeDecimal(
                slectedPlanDatas?.price_plan_details?.price
              )} / mo`}</h5>
              <span>{`${slectedPlanDatas?.price_plan_details?.description} Commitment`}</span>
              <p>
                {dynamicContent(
                  slectedPlanDatas?.plan_expity_notificaion?.no_of_seats
                )}
              </p>
              <span>Remaining Seats</span>
              <LinearProgress
                variant="determinate"
                value={
                  slectedPlanDatas?.plan_expity_notificaion
                    ?.total_seats_occupied
                }
              />
              <div>
                <span>
                  {
                    slectedPlanDatas?.plan_expity_notificaion
                      ?.total_seats_occupied
                  }
                </span>
                of {slectedPlanDatas?.price_plan_details?.pricing?.no_of_seats}{" "}
                Seats used
              </div>
              <div>
                <button
                  className="changeBtn"
                  onClick={handleNavigateChangePlan}
                >
                  Change Plan
                </button>
                <span>
                  {slectedPlanDatas?.plan_expity_notificaion?.renewal_date}
                </span>
              </div>
            </div>
          </div>
        )}
      <div className="Makpayment">
        <h3>Make Payment In Crypto</h3>
        <div>
          <button className="changeBtn" onClick={cryptoPayment}>
            Pay With Crypto
          </button>
        </div>
        {(showRenewalMessage || accountSuspended) && (
          <span>
            Important: To pay with crypto, you must
            <br /> complete payment before your renewal date
            <br /> or else your account will be suspended. We
            <br /> strongly suggest adding a card on file as a<br /> backup.
          </span>
        )}
      </div>
      <div className="AddCard">
        <h3>Pay With Card</h3>
        {newCardInputValues.card_number.length > 0 &&
        addressInputvalues.line1.length > 0 ? (
          ""
        ) : (
          <button className="chanheBtn" onClick={cryptoPayment}>
            Pay With Card
          </button>
        )}
      </div>
      {!showDeleteButton && (
        <div className="DelAccount">
          <h3>Delete Account</h3>
          <p>Click the button below to delete your account.</p>
          <button className="changeBtn" onClick={handleAccountDeletion}>
            Delete Account
          </button>
        </div>
      )}
      <ModalComponent
        modalOpen={accountDeletingModal}
        handleClose={() => setAccountDeletingModal(false)}
        className="DelAccountPop"
        modalValue={
          <WarningDiv
            warningIcon={true}
            header="Are you sure you'd like to delete your account?"
            description={
              <>
                <p>
                  Your community will be removed from the leaderboard at
                  <br />
                  the start of the next raffle. Your community members will
                  <br />
                  be ineligible to receive XP from your Discord.
                </p>
                <button
                  onClick={() => setAccountDeletingModal(false)}
                  className="MyacCancelBtn"
                >
                  Cancel
                </button>
                <button onClick={handleConfirmDeletion} className="MyacDelBtn">
                  Confirm Deletion
                </button>
              </>
            }
          />
        }
      />
    </Card>
  );

  const addBillingAddressFields = (
    <div className="forms">
      <Card>
        <div>
          <h3>
            <KeyboardBackspaceIcon
              onClick={() => setAddBillingAddress(false)}
            />
            Add billing address
          </h3>
          <Divider />
          <h4>Billing</h4>
          <form onSubmit={handleBillingAddressSubmit}>
            <div>
              <InputLabel>Street Address</InputLabel>
              <TextField
                name="line1"
                placeholder="Line 1"
                value={addressInputvalues.line1}
                onChange={handleAddressInputValueChange}
                inputRef={(ref) => (inputRef.current.line1 = ref)}
              />
              <TextField
                name="line2"
                placeholder="Line 2 (optional)"
                value={addressInputvalues.line2}
                onChange={handleAddressInputValueChange}
              />
              <div style={{ display: "flex" }}>
                <div>
                  <InputLabel>City</InputLabel>
                  <TextField
                    name="city"
                    placeholder="City"
                    value={addressInputvalues.city}
                    onChange={handleAddressInputValueChange}
                    inputRef={(ref) => (inputRef.current.city = ref)}
                  />
                </div>
                <div>
                  <InputLabel>State</InputLabel>
                  <TextField
                    name="state"
                    placeholder="State"
                    value={addressInputvalues.state}
                    onChange={handleAddressInputValueChange}
                    inputRef={(ref) => (inputRef.current.state = ref)}
                  />
                </div>
              </div>
              <div style={{ display: "flex" }}>
                <div>
                  <InputLabel>Zip Code</InputLabel>
                  <TextField
                    name="zipcode"
                    placeholder="Zip Code"
                    value={addressInputvalues.zipcode}
                    onChange={handleAddressInputValueChange}
                    inputRef={(ref) => (inputRef.current.zipcode = ref)}
                  />
                </div>
                <div>
                  <TextField
                    select
                    name="country"
                    placeholder="Country"
                    label="Country"
                    value={addressInputvalues.country}
                    onChange={handleAddressInputValueChange}
                    inputRef={(ref) => (inputRef.current.country = ref)}
                  >
                    <MenuItem value={"United States"}>United States</MenuItem>
                    <MenuItem value={"India"}>India</MenuItem>
                    <MenuItem value={"Canada"}>Canada</MenuItem>
                  </TextField>
                </div>
              </div>
              <button type="submit" color="inherit" className="yellowBtn">
                Save
              </button>
            </div>
          </form>
        </div>
      </Card>
    </div>
  );

  return (
    <>
      {loading && <LoadingOverlay />}
      {!inputViews ? (
        <>
          {slectedPlanDatas?.plan_expity_notificaion?.nav_message &&
            !accountSuspended && (
              <div className="warning">
                <div>
                  <span>
                    {matches
                      ? `${slectedPlanDatas?.plan_expity_notificaion?.nav_message}`
                      : `${replaceDesktopWarning(
                          slectedPlanDatas?.plan_expity_notificaion?.nav_message
                        )}`}
                  </span>
                  {!showDeleteButton && (
                    <button
                      color="inherit"
                      className="whiteBtn"
                      onClick={handleFixIssue}
                    >
                      {matches ? "Fix Issue" : "Fix Billing Issue"}
                    </button>
                  )}
                </div>
              </div>
            )}
          <div className="myaccount">
            <div>
              <div className="my-account-row">
                <div>
                  <img src={Avatar} alt="" />
                </div>
                <div>
                  <h1>
                    My Account <span>{`//`}</span>
                  </h1>
                </div>
                <div>
                  <h2>Doodles</h2>
                </div>
              </div>
              {matches ? (
                <TabsComponent
                  tabPanels={[accountSettings, billingAndSubscription]}
                  value={tabValue}
                  onChange={handleTabChange}
                  className="myaccountTabs"
                />
              ) : (
                <div className="mobdropdwn">
                  <MyAccountSelectBox
                    screen={[accountSettings, billingAndSubscription]}
                    tabValue={selectScreen}
                    setTabValue={setSelectScreen}
                  />
                </div>
              )}
            </div>
            <ModalComponent
              modalHeader={addBillingAddress ? "" : "Add New Card"}
              modalOpen={showAddNewCardModal}
              handleClose={() => setShowAddNewCardModal(false)}
              className={"signBox"}
              modalValue={
                addBillingAddress ? (
                  addBillingAddressFields
                ) : (
                  <div className="addCardPop">
                    <div>
                      <InputLabel>Card Number</InputLabel>
                      <TextField
                        name="card_number"
                        type="text"
                        placeholder="0000 0000 0000 0000"
                        onChange={handleNewCardInputChange}
                        value={newCardInputValues.card_number}
                        inputRef={(ref) => (inputRef.current.card_number = ref)}
                      />
                      {fieldErrors["card_number"] && (
                        <span>{fieldErrors["card_number"]}</span>
                      )}
                    </div>
                    <div>
                      <InputLabel>Expiry Date</InputLabel>
                      <TextField
                        name="expiry_date"
                        type="text"
                        placeholder="MM / YY"
                        onChange={handleNewCardInputChange}
                        value={newCardInputValues.expiry_date}
                        inputRef={(ref) => (inputRef.current.expiry_date = ref)}
                      />
                      {fieldErrors["expiry_date"] && (
                        <span>{fieldErrors["expiry_date"]}</span>
                      )}
                    </div>
                    <div>
                      <InputLabel>CVC / cvc</InputLabel>
                      <TextField
                        name="cvc"
                        type="text"
                        placeholder="MM / YY"
                        onChange={handleNewCardInputChange}
                        value={newCardInputValues.cvc}
                        inputRef={(ref) => (inputRef.current.cvc = ref)}
                      />
                      {fieldErrors["cvc"] && <span>{fieldErrors["cvc"]}</span>}
                    </div>
                    <div>
                      <InputLabel>Cardholder Name</InputLabel>
                      <TextField
                        name="cardholder_name"
                        type="text"
                        placeholder="Enter cardholder's full name"
                        onChange={handleNewCardInputChange}
                        value={newCardInputValues.cardholder_name}
                        inputRef={(ref) =>
                          (inputRef.current.cardholder_name = ref)
                        }
                      />
                      {fieldErrors["cardholder_name"] && (
                        <span>{fieldErrors["cardholder_name"]}</span>
                      )}
                    </div>
                    <button
                      color="inherit"
                      className="whiteBtn"
                      onClick={handleNewCardAddition}
                    >
                      Next
                    </button>
                  </div>
                )
              }
            />
          </div>
        </>
      ) : (
        <div className="myaccount">
          <div className="backArrow" onClick={handlePreviousPage}>
            <span>
              <img src={BackArrow} alt="backArrow" /> Back
            </span>
          </div>
          <div>{accountSettings}</div>
        </div>
      )}
    </>
  );
}
export default MyAccount;
