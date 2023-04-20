import { HTTP } from "./http-common";
// import store from "./store";
// import { clearProfile } from "./ducks/profile";
// import { syncIntercomScript } from './ducks/intercom';

const login = (email, password) => {
  const data = JSON.stringify({ email: email, password: password });

  return HTTP.post("/api-token-auth", data, {
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
  })
    .then((response) => {
      localStorage.setItem("access_token", response.data["token"]);
      HTTP.defaults.headers.common["Authorization"] =
        "JWT " + localStorage.getItem("access_token");

      return { err: null, success: true };
    })
    .catch((err) => {
      return { err: err, success: false };
    });
};

const logout = () => {
  localStorage.removeItem("access_token");
  delete HTTP.defaults.headers.common["Authorization"];
  //   store.dispatch({ type: "HIDE_MENU" });

  //   store.dispatch(clearProfile());
  // store.dispatch(syncIntercomScript());
};

const checkAuth = () => {
  if (localStorage.getItem("access_token")) {
    return true;
  } else {
    return false;
  }
};

const requireAuth = (to, from, next) => {
  if (!checkAuth()) {
    // auth failed..
    let path = "/login";

    next({
      path: path,
    });
  } else {
    next();
  }
};

const goHome = (to, from, next) => {
  if (checkAuth()) {
    let path = "/";

    next({
      path: path,
    });
  } else {
    next();
  }
};

if (localStorage.getItem("access_token")) {
  HTTP.defaults.headers.common["Authorization"] =
    "JWT " + localStorage.getItem("access_token");
}

export { checkAuth, login, logout, requireAuth, goHome };
