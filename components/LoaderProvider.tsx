import React, { FC, ReactNode, useState } from "react";

interface ILoaderContext {
  isLoading: (actionId: string, ignoreInitial?: boolean) => boolean;
  addActionId: (actionId: string) => void;
  removeActionId: (actionId: string) => void;
}

export const LoaderContext = React.createContext<ILoaderContext | Object>({});

interface LoaderProviderProps {
  children: ReactNode;
}

const LoaderProvider: FC<LoaderProviderProps> = ({ children }) => {
  interface ILoader {
    [key: string]: boolean;
  }
  const [loader, setLoader] = useState<ILoader>({});

  const isLoading = (actionId: string, ignoreInitial?: boolean): boolean => {
    return ignoreInitial
      ? loader[actionId] === true
      : loader[actionId] === undefined || loader[actionId];
  };

  const addActionId = (actionId: string) => {
    setLoader({ ...loader, [actionId]: true });
  };

  const removeActionId = (actionId: string) => {
    setLoader({ ...loader, [actionId]: false });
  };

  return (
    <LoaderContext.Provider value={{ isLoading, addActionId, removeActionId }}>
      {children}
    </LoaderContext.Provider>
  );
};

export default LoaderProvider;
