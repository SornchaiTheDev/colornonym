import React, { createContext, useContext, useRe } from "react";

const Context = createContext(null);
function ContextProvider({ children }) {
  return <Context.Provider value={null}>{children}</Context.Provider>;
}

export default ContextProvider;
