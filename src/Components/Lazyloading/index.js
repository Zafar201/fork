import React from "react";
import LoadingOverlay from "../LoadingOverlay";

export default function LazyLoading(Component) {
  const lazyComponents = (
    <React.Suspense fallback={<LoadingOverlay />}>
      <Component />
    </React.Suspense>
  );

  return lazyComponents;
}
