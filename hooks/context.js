import React, { createContext, useContext, useRe } from "react";
import useTimer from "./timer";

// Context Initial
export const Context = createContext(null);

function ContextProvider({ children }) {
  const [timer, startTimer, resetTimer] = useTimer();
  return (
    <Context.Provider value={{ timer, startTimer, resetTimer }}>
      {children}
    </Context.Provider>
  );
}

export default ContextProvider;
