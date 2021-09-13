import { createContext, useState } from "react";

export const LoaderContext = createContext();

const LoaderContextProvider = props => {
  const [isLoaderOn, setLoader] = useState(false);

  return <LoaderContext.Provider value={{ isLoaderOn, setLoader }}>{props.children}</LoaderContext.Provider>;
};

export default LoaderContextProvider;
