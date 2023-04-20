import { HTTP } from "../http-common";
import { cancelTokenHTTP } from "../cancelTokenApi";

export function signUpApiCall(data, callback, errorcallback) {
  HTTP.post("users/register/", data)
    .then((response) => {
      if (callback) {
        callback(response);
      }
    })
    .catch((error) => {
      if (["Request aborted", "canceled"].includes(error.message)) {
        return;
      }
      if (errorcallback) {
        errorcallback(error);
      }
    });
}

export function forgotPasswordEmailVerificationApiCall(
  data,
  callback,
  errorcallback
) {
  HTTP.post("users/api/reset-password/", data)
    .then((response) => {
      if (callback) {
        callback(response);
      }
    })
    .catch((error) => {
      if (["Request aborted", "canceled"].includes(error.message)) {
        return;
      }
      if (errorcallback) {
        errorcallback(error);
      }
    });
}

export function forgotPassworddTokenVerificationApiCall(
  verificationToken,
  data,
  callback,
  errorcallback
) {
  HTTP.post(
    `users/api/reset-password/validate_token/?token=${verificationToken}`,
    data
  )
    .then((response) => {
      if (callback) {
        callback(response);
      }
    })
    .catch((error) => {
      if (["Request aborted", "canceled"].includes(error.message)) {
        return;
      }
      if (errorcallback) {
        errorcallback(error);
      }
    });
}

export function resetPasswordApiCall(
  verificationToken,
  data,
  callback,
  errorcallback
) {
  HTTP.post(
    `users/api/reset-password/confirm/?token=${verificationToken}`,
    data
  )
    .then((response) => {
      if (callback) {
        callback(response);
      }
    })
    .catch((error) => {
      if (["Request aborted", "canceled"].includes(error.message)) {
        return;
      }
      if (errorcallback) {
        errorcallback(error);
      }
    });
}

export function communityProfileApiCall(data, config, callback, errorcallback) {
  HTTP.post("users/community_data/", data, config)
    .then((response) => {
      if (callback) {
        callback(response);
      }
    })
    .catch((error) => {
      if (["Request aborted", "canceled"].includes(error.message)) {
        return;
      }
      if (errorcallback) {
        errorcallback(error);
      }
    });
}

export const customAbortController = (callback) => {
  const controller = new AbortController();
  const config = {
    signal: controller.signal,
  };

  callback(config);

  return () => {
    controller.abort();
  };
};

export function leaderboardApiCall(
  toggleCommunity,
  duration,
  page,
  community,
  search,
  badges,
  callback,
  errorcallback
) {
  const baseUrl =
    // search.length > 0 || community.length > 0 || badges.length > 0
    //   ?
    cancelTokenHTTP;
  // : HTTP;
  baseUrl
    .get(
      `leaderboard/leaderboard?community=${community}&duration=${duration}&page=${page}&search=${search}&type=${toggleCommunity}&badges=${badges}`
    )
    .then((response) => {
      if (callback) {
        callback(response);
      }
    })
    .catch((error) => {
      if (["Request aborted", "canceled"].includes(error.message)) {
        return;
      }
      if (errorcallback) {
        errorcallback(error);
      }
    });
}

export function alphaLeaderboardApiCall(
  toggleCommunity,
  duration,
  page,
  community,
  search,
  badges,
  callback,
  errorcallback
) {
  const baseUrl =
    // search.length > 0 || community.length > 0 || badges.length > 0
    //   ?
    cancelTokenHTTP;
  // : HTTP;
  baseUrl
    .get(
      `leaderboard/leaderboard?community=${community}&duration=${duration}&page=${page}&search=${search}&type=${toggleCommunity}&badges=${badges}`
    )
    .then((response) => {
      if (callback) {
        callback(response);
      }
    })
    .catch((error) => {
      if (["Request aborted", "canceled"].includes(error.message)) {
        return;
      }
      if (errorcallback) {
        errorcallback(error);
      }
    });
}

export function referralCodeApiCall(data, callback, errorcallback) {
  HTTP.get(`users/verifycode/?code=${data}`)
    .then((response) => {
      if (callback) {
        callback(response);
      }
    })
    .catch((error) => {
      if (["Request aborted", "canceled"].includes(error.message)) {
        return;
      }
      if (errorcallback) {
        errorcallback(error);
      }
    });
}

export function requestDemoApiCall(data, callback, errorcallback) {
  HTTP.post("pricing/request-demo/", data)
    .then((response) => {
      if (callback) {
        callback(response);
      }
    })
    .catch((error) => {
      if (["Request aborted", "canceled"].includes(error.message)) {
        return;
      }
      if (errorcallback) {
        errorcallback(error);
      }
    });
}

export const fetchCalendarEvents = (callback, errorcallback, config) => {
  HTTP.get("pricing/CalendarEvents/", config)
    .then((response) => {
      if (callback) {
        callback(response);
      }
    })
    .catch((error) => {
      if (["Request aborted", "canceled"].includes(error.message)) {
        return;
      }
      if (["Request aborted", "canceled"].includes(error.message)) {
        return;
      }
      if (errorcallback) {
        errorcallback(error);
      }
    });
};

export function choosePlanCommitmentLengthGetAPiCall(
  callback,
  errorcallback,
  config
) {
  HTTP.get("pricing/pricing/", config)
    .then((response) => {
      if (callback) {
        callback(response);
      }
    })
    .catch((error) => {
      if (["Request aborted", "canceled"].includes(error.message)) {
        return;
      }
      if (errorcallback) {
        errorcallback(error);
      }
    });
}

export function choosePlanGetApiCall(duration, callback, errorcallback) {
  HTTP.get(`pricing/pricing-details/?description=${duration}`)
    .then((response) => {
      if (callback) {
        callback(response);
      }
    })
    .catch((error) => {
      if (["Request aborted", "canceled"].includes(error.message)) {
        return;
      }
      if (errorcallback) {
        errorcallback(error);
      }
    });
}

export function choosePlanEditApiCall(
  data,
  //  config,
  callback,
  errorcallback
) {
  HTTP.put(
    "users/userprofile/",
    data
    //  config
  )
    .then((response) => {
      if (callback) {
        callback(response);
      }
    })
    .catch((error) => {
      if (["Request aborted", "canceled"].includes(error.message)) {
        return;
      }
      if (errorcallback) {
        errorcallback(error);
      }
    });
}

export function faqGetApiCall(callback, errorcallback) {
  HTTP.get("users/faq/")
    .then((response) => {
      if (callback) {
        callback(response);
      }
    })
    .catch((error) => {
      if (["Request aborted", "canceled"].includes(error.message)) {
        return;
      }
      if (errorcallback) {
        errorcallback(error);
      }
    });
}

export function leaderBoardTopRankersGetApiCall(
  callback,
  errorcallback,
  config
) {
  HTTP.get("/leaderboard/leaderboardrankapi", config)
    .then((response) => {
      if (callback) {
        callback(response);
      }
    })
    .catch((error) => {
      if (["Request aborted", "canceled"].includes(error.message)) {
        return;
      }
      if (errorcallback) {
        errorcallback(error);
      }
    });
}

export function paymentMethodGetApiCall(callback, errorcallback) {
  HTTP.get("pricing/payment_method/")
    .then((response) => {
      if (callback) {
        callback(response);
      }
    })
    .catch((error) => {
      if (["Request aborted", "canceled"].includes(error.message)) {
        return;
      }
      if (errorcallback) {
        errorcallback(error);
      }
    });
}

export function paymentMethodPostApiCall(data, callback, errorcallback) {
  HTTP.post("pricing/pay/", data)
    .then((response) => {
      if (callback) {
        callback(response);
      }
    })
    .catch((error) => {
      if (["Request aborted", "canceled"].includes(error.message)) {
        return;
      }
      if (errorcallback) {
        errorcallback(error);
      }
    });
}

export function leaderboardBadgesGetApiCall(id, callback, errorcallback) {
  HTTP.get(`/leaderboard/retrievebadges/?client_badge_id=${id}`)
    .then((response) => {
      if (callback) {
        callback(response);
      }
    })
    .catch((error) => {
      if (["Request aborted", "canceled"].includes(error.message)) {
        return;
      }
      if (errorcallback) {
        errorcallback(error);
      }
    });
}

export function accountSetupAPiCall(id, data, callback, errorcallback) {
  HTTP.patch(`users/register/${id}/`, data)
    .then((response) => {
      if (callback) {
        callback(response);
      }
    })
    .catch((error) => {
      if (["Request aborted", "canceled"].includes(error.message)) {
        return;
      }
      if (errorcallback) {
        errorcallback(error);
      }
    });
}

export function accountInformationGetApiCall(id, callback, errorcallback) {
  HTTP.get(`users/register/${id}/`)
    .then((response) => {
      if (callback) {
        callback(response);
      }
    })
    .catch((error) => {
      if (["Request aborted", "canceled"].includes(error.message)) {
        return;
      }
      if (errorcallback) {
        errorcallback(error);
      }
    });
}

export function communityDataListApiCall(callback, errorcallback, config) {
  HTTP.get("users/CommunitiesData/", config)
    .then((response) => {
      if (callback) {
        callback(response);
      }
    })
    .catch((error) => {
      if (["Request aborted", "canceled"].includes(error.message)) {
        return;
      }
      if (errorcallback) {
        errorcallback(error);
      }
    });
}

export function leaderboardBadgesListApiCall(callback, errorcallback, config) {
  HTTP.get("leaderboard/badges/", config)
    .then((response) => {
      if (callback) {
        callback(response);
      }
    })
    .catch((error) => {
      if (["Request aborted", "canceled"].includes(error.message)) {
        return;
      }
      if (errorcallback) {
        errorcallback(error);
      }
    });
}

export function calendarPostApiCall(config, data, id, callback, errorcallback) {
  if (id) {
    HTTP.put(`pricing/calendar/${id}/`, data, config)
      .then((response) => {
        if (callback) {
          callback(response);
        }
      })
      .catch((error) => {
        if (["Request aborted", "canceled"].includes(error.message)) {
          return;
        }
        if (errorcallback) {
          errorcallback(error);
        }
      });
  } else {
    HTTP.post(`pricing/calendar/`, data, config)
      .then((response) => {
        if (callback) {
          callback(response);
        }
      })
      .catch((error) => {
        if (["Request aborted", "canceled"].includes(error.message)) {
          return;
        }
        if (errorcallback) {
          errorcallback(error);
        }
      });
  }
}

export function calendarSheduleListApiCall(config, callback, errorcallback) {
  HTTP.get("pricing/calendar/", config)
    .then((response) => {
      if (callback) {
        callback(response);
      }
    })
    .catch((error) => {
      if (["Request aborted", "canceled"].includes(error.message)) {
        return;
      }
      if (errorcallback) {
        errorcallback(error);
      }
    });
}

export function calendargetApiCall(date, config, callback, errorcallback) {
  HTTP.get(`pricing/calendar/?date=${date}`, config)
    .then((response) => {
      if (callback) {
        callback(response);
      }
    })
    .catch((error) => {
      if (["Request aborted", "canceled"].includes(error.message)) {
        return;
      }
      if (errorcallback) {
        errorcallback(error);
      }
    });
}

export function winnersCreateApiCall(
  calendar,
  winners,
  config,
  callback,
  errorcallback
) {
  HTTP.post(`/leaderboard/winners/`, { calendar, winners }, config)
    .then((response) => {
      if (callback) {
        callback(response);
      }
    })
    .catch((error) => {
      if (["Request aborted", "canceled"].includes(error.message)) {
        return;
      }
      if (errorcallback) {
        errorcallback(error);
      }
    });
}

export function winnersListApiCall(date, config, callback, errorcallback) {
  HTTP.get(`leaderboard/winners/?calendar__id=${date} `, config)
    .then((response) => {
      if (callback) {
        callback(response);
      }
    })
    .catch((error) => {
      if (["Request aborted", "canceled"].includes(error.message)) {
        return;
      }
      if (errorcallback) {
        errorcallback(error);
      }
    });
}

export function selectedChoosePlanAPiCall(config, callback, errorcallback) {
  HTTP.get(`users/userprofile/`, config)
    .then((response) => {
      if (callback) {
        callback(response);
      }
    })
    .catch((error) => {
      if (["Request aborted", "canceled"].includes(error.message)) {
        return;
      }
      if (errorcallback) {
        errorcallback(error);
      }
    });
}

export function accountDeleteApiCall(config, callback, errorcallback) {
  HTTP.delete(`users/userprofile/`, config)
    .then((response) => {
      if (callback) {
        callback(response);
      }
    })
    .catch((error) => {
      if (["Request aborted", "canceled"].includes(error.message)) {
        return;
      }
      if (errorcallback) {
        errorcallback(error);
      }
    });
}

export function ungrageMissionApiCall(config, callback, errorcallback) {
  HTTP.get(`leaderboard/mission`, config)
    .then((response) => {
      if (callback) {
        callback(response);
      }
    })
    .catch((error) => {
      if (["Request aborted", "canceled"].includes(error.message)) {
        return;
      }
      if (errorcallback) {
        errorcallback(error);
      }
    });
}

export function cancelDeleteAccountApiCall(data, callback, errorcallback) {
  HTTP.patch(`users/userprofile/`, data)
    .then((response) => {
      if (callback) {
        callback(response);
      }
    })
    .catch((error) => {
      if (["Request aborted", "canceled"].includes(error.message)) {
        return;
      }
      if (errorcallback) {
        errorcallback(error);
      }
    });
}

export function removeFromScheduleApi(id, config, callback, errorcallback) {
  HTTP.delete(`pricing/calendar/${id}/`, config)
    .then((response) => {
      if (callback) {
        callback(response);
      }
    })
    .catch((error) => {
      if (["Request aborted", "canceled"].includes(error.message)) {
        return;
      }
      if (errorcallback) {
        errorcallback(error);
      }
    });
}

export function alphaSettingAddWinners(data, config, callback, errorcallback) {
  HTTP.post(`/leaderboard/alpha/`, data, config)
    .then((response) => {
      if (callback) {
        callback(response);
      }
    })
    .catch((error) => {
      if (errorcallback) {
        errorcallback(error);
      }
    });
}

export function alphaSettingGetWinners(callback, errorcallback) {
  HTTP.get(`/leaderboard/alpha/`)
    .then((response) => {
      if (callback) {
        callback(response);
      }
    })
    .catch((error) => {
      if (errorcallback) {
        errorcallback(error);
      }
    });
}

export function ungardeMissionAccessApiCall(
  id,
  feedback,
  config,
  callback,
  errorcallback
) {
  // const url = `leaderboard/mission?id=${id}` + (feedback ? `&feedback=${feedback}` : '');
  const url = `leaderboard/mission?id=${id}${
    feedback ? `&feedback=${feedback}` : ""
  }`;
  HTTP.put(url, null, config)
    .then((response) => {
      if (callback) {
        callback(response);
      }
    })
    .catch((error) => {
      if (errorcallback) {
        errorcallback(error);
      }
    });
}

export function ungrageMissionApiCallById(config, id, callback, errorcallback) {
  HTTP.get(`leaderboard/mission/${id}/`, config)
    .then((response) => {
      if (callback) {
        callback(response);
      }
    })
    .catch((error) => {
      if (["Request aborted", "canceled"].includes(error.message)) {
        return;
      }
      if (errorcallback) {
        errorcallback(error);
      }
    });
}

export function getSelectedPlanDetailApiCall(data, callback, errorcallback) {
  HTTP.get(`/users/plandetails/?id=${data}`)
    .then((response) => {
      if (callback) {
        callback(response);
      }
    })
    .catch((error) => {
      if (["Request aborted", "canceled"].includes(error.message)) {
        return;
      }
      if (errorcallback) {
        errorcallback(error);
      }
    });
}

export function getPreviousWinnerListApiCall(data, callback, errorcallback) {
  HTTP.get(`leaderboard/previouswinners?calendar__id=${data}`)
    .then((response) => {
      if (callback) {
        callback(response);
      }
    })
    .catch((error) => {
      if (["Request aborted", "canceled"].includes(error.message)) {
        return;
      }
      if (errorcallback) {
        errorcallback(error);
      }
    });
}

export function EditwinnersListApiCall(
  id,
  winnerDetail,
  config,
  callback,
  errorcallback
) {
  HTTP.patch(`/leaderboard/winners/${id}/`, winnerDetail, config)
    .then((response) => {
      if (callback) {
        callback(response);
      }
    })
    .catch((error) => {
      if (["Request aborted", "canceled"].includes(error.message)) {
        return;
      }
      if (errorcallback) {
        errorcallback(error);
      }
    });
}

export function removeAlphaEventApiCall(id, config, callback, errorcallback) {
  HTTP.delete(`/leaderboard/alpha/${id}/`, config)
    .then((response) => {
      if (callback) {
        callback(response);
      }
    })
    .catch((error) => {
      if (["Request aborted", "canceled"].includes(error.message)) {
        return;
      }
      if (errorcallback) {
        errorcallback(error);
      }
    });
}
