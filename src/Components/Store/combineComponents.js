import React from "react";

const combineComponents = (components) =>
  components.reduce(
    (AccumulatedComponents, CurrentComponent) => {
      return ({ children }) => (
        <AccumulatedComponents>
          <CurrentComponent>{children}</CurrentComponent>
        </AccumulatedComponents>
      );
    },
    ({ children }) => children
  );

export default combineComponents;
