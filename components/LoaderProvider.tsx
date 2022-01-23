import React, { useState } from "react";

export const LoaderContext = React.createContext();

function LoaderProvider({ children }) {
  const [loader, setLoader] = useState({});

  const isLoading = (actionId) => {
    console.log(loader[actionId] === undefined || loader[actionId]);
    return loader[actionId] === undefined || loader[actionId];
  };

  const addActionId = (actionId) => {
    setLoader({ ...loader, [actionId]: true });
  };

  const removeActionId = (actionId) => {
    setLoader({ ...loader, [actionId]: false });
  };

  return (
    <LoaderContext.Provider value={{ isLoading, addActionId, removeActionId }}>
      {children}
    </LoaderContext.Provider>
  );
}

export default LoaderProvider;
