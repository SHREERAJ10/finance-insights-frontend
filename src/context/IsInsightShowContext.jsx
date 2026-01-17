import { createContext, useState } from "react";

export const IsInsightShownContext = createContext();

export const IsInsightShownContextProvider = ({ children }) => {
    const [isInsightShown, setIsInsightShown] = useState(false);
  return (
    <IsInsightShownContext.Provider value={{ isInsightShown, setIsInsightShown }}>
      {children}
    </IsInsightShownContext.Provider>
  );
};
