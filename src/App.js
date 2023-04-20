import React, { useCallback, useEffect, useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";

import Footer from "./Components/Footer";
import Header from "./Components/Header";
import PrivateRouter from "./PrivateRouter";
import { pathList, is_alpha_path } from "./Components/Store/Auth-context";

function App() {
  const { pathname, search } = useLocation();
  const [displayObject, setDisplayObject] = useState({
    header: false,
    footer: false,
  });

  const handleDisplayHeaderAndFooter = useCallback(() => {
    const header = pathList
      .filter(
        (each) =>
          each.header ||
          // (!each.header_allowed_tabs ||
          (each.header_allowed_tabs &&
            each.header_allowed_tabs.includes(search))
      )
      .map((each) => each.path + (each.header_allowed_tabs ? search : ""))
      .includes(pathname + search);

    const footer = pathList
      .filter(
        (each) =>
          each.footer ||
          // (!each.footer_allowed_tabs ||
          (each.footer_allowed_tabs &&
            each.footer_allowed_tabs.includes(search))
      )
      .map((each) => each.path + (each.footer_allowed_tabs ? search : ""))
      .includes(pathname + search);

    setDisplayObject({ header, footer });
  }, [pathname, search]);

  useEffect(() => {
    handleDisplayHeaderAndFooter();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname, search]);

  return (
    <>
      {displayObject.header && <Header />}
      <Routes>
        {pathList
          .filter((each) =>
            is_alpha_path
              ? each.is_alpha_path || !each.hasOwnProperty("is_alpha_path")
              : each.is_alpha_path === false ||
                !each.hasOwnProperty("is_alpha_path")
          )
          .map((each) => (
            <Route
              key={each.path}
              path={each.path}
              element={
                each.allowed_user_types ? (
                  <PrivateRouter routeObject={each} />
                ) : (
                  each.element
                )
              }
            />
          ))}
      </Routes>
      {displayObject.footer && <Footer />}
    </>
  );
}

export default App;
