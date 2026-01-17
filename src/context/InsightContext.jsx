import { createContext, useState } from "react";

export const InsightContext = createContext();

export function InsightContextProvider({ children }) {
  const [insights, setInsights] = useState([]);
  return (
    <InsightContext.Provider value={{ insights, setInsights }}>
      {children}
    </InsightContext.Provider>
  );
}
